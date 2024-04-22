const { marom_db } = require('../db');
const { insert, find, findByAnyIdColumn, update } = require('../helperfunctions/crud_queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function generateToken(user) {
    const payload = {
        userId: user.id,
        email: user.email,
    };
    const options = {
        expiresIn: '8h'
    };
    const secretKey = process.env.SECRET_KEY
    return jwt.sign(payload, secretKey, options);
}

const verifyToken = async (req, res, next) => {
    if (req.originalUrl === '/auth/signup' || req.originalUrl === '/auth/login'
        || req?.route?.path === '/user/:SID'
    ) next()
    // const publicKey = process.env.CLERK_SECRET_KEY
    // const cookies = new Cookies(req, res);
    // const sessToken = cookies.get("__session");
    const token = req.headers.authorization.replace('Bearer ', "");
    const publicKey = process.env.SECRET_KEY;
    // if (sessToken === undefined && (token === undefined || token === 'undefined' || token === 'null')) {
    //     return res.status(401).json({ message: "not signed in" });
    // }

    if (!token || token === 'undefined' || token === 'null')
        return res.status(401).json({ reason: "token not attached!", message: "The security token has expired , please login again to continue protecting your account." });

    try {
        // const clientToken = cookies.get('__session');
        // // const clients12 = await clerkClient.users.getUserList()
        // const client1 = await clerkClient.users.getUser('user_2bdaClu9RVpqo3tQUXG06g7yhv7')
        // console.log(client1, 'djendejkde')

        // const client = await clerkClient.users.getUserListtoken);
        // const sessionId = client.lastActiveSessionId;

        // const session = await sessions.verifySession(sessionId, token);
        // console.log(session, 'sessuan')
        if (token) {
            jwt.verify(token, publicKey, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ reason: err.message, message: "The security token expired after 20 minutes of ideling, please login again." });
                }
                req.user = decoded;
                next();
            })
        }
    } catch (error) {
        res.status(401).json({
            message: 'The security token expired after 20 minutes of ideling, please login again.',
            reason: error.message
        });
        return;
    }
};

const signup = async (req, res) => {
    // const { password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);

    marom_db(async (config) => {
        try {
            const sql = require('mssql');
            const poolConnection = await sql.connect(config);
            console.log(req.body)

            if (poolConnection) {
                const result = await poolConnection.request().query(
                    insert('Users1', req.body)
                );
                res.status(200).send(result.recordset);
            }
        } catch (err) {
            console.log(err);
            if (err.message.includes('UNIQUE KEY constraint')) {
                res.status(400).send({ message: "Email already exist" });
            }
            else res.status(400).send({ message: "Failed to Register User" });
        }
    })
};

const login = async (req, res) => {
    marom_db(async (config) => {
        try {
            const sql = require('mssql');
            const poolConnection = await sql.connect(config);
            if (poolConnection) {
                const result = await poolConnection.request().query(
                    find('Users', { email: req.body.email })
                );

                if (result.recordset.length === 0) {
                    throw new Error('Authentication Failed!');
                }

                const passwordMatch = await bcrypt.compare(req.body.password, result.recordset[0].password);
                if (!passwordMatch) {
                    throw new Error('Authentication Failed!');
                }

                const token = jwt.sign(req.body, process.env.JWTSECRETKEY, {
                    expiresIn: '1h',
                });

                res.status(200).send({ ...result.recordset, token });
            }
        } catch (err) {
            console.log(err.message);
            res.status(400).send({ message: err.message });
        }
    })
};

const get_user_detail = async (req, res) => {
    marom_db(async (config) => {
        try {
            const sql = require('mssql');
            const poolConnection = await sql.connect(config);

            if (poolConnection) {
                const { recordset } = await poolConnection.request().query(
                    findByAnyIdColumn('Users1', req.params)
                );

                res.status(200).send(recordset[0]);
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message });
        }
    })
}

const get_token = async (req, res) => {
    try {
        const token = generateToken(req.params);
        res.status(200).send(token);
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

const get_setup_detail = async (req, res) => {
    marom_db(async (config) => {
        try {
            const { role, userId } = req.params
            const sql = require('mssql');
            const poolConnection = await sql.connect(config);

            if (poolConnection) {
                let result;
                if (role === 'tutor') {
                    result = await poolConnection.request().query(
                        find('TutorSetup', { userId }, 'AND', { userId: 'varchar(max)' })
                    );
                }
                else {
                    result = await poolConnection.request().query(
                        find('StudentSetup', { userId }, 'AND', { userId: 'varchar(max)' })
                    )
                }
                res.status(200).send(result.recordset[0]);
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message });
        }
    })
}

const forget_password = async (req, res) => {
    const { email } = req.params;
    marom_db(async (config) => {
        try {
            const sql = require('mssql');
            const poolConnection = await sql.connect(config);

            if (poolConnection) {
                const result = await poolConnection.request().query(
                    findByAnyIdColumn('Users', req.params)
                );
                if (!result.recordset.length) throw new Error(`user with email = ${email} not found`);
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const updateData = await poolConnection.request().query(
                    update('Users', { password: hashedPassword }, { email })
                );

                res.status(200).send(updateData.recordset[0]);
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({ message: err.message });
        }
    })
}

const token_auth = (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    console.log(data)
}

module.exports = {
    login,
    verifyToken,
    token_auth,
    get_user_detail,
    get_token,
    forget_password,
    signup,
    get_setup_detail
};
