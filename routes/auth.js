const { login, signup, get_user_detail, get_setup_detail, forget_password, verifyToken, get_token } = require("../controllers/auth");
const {
    express,
    parser,
} = require('../modules');
const AUTH_ROUTERS = express.Router();


AUTH_ROUTERS.post('/auth/login', parser, login);
AUTH_ROUTERS.post('/auth/signup', parser, signup);
AUTH_ROUTERS.get('/token/:id/:email', get_token);
AUTH_ROUTERS.get('/user/:SID', get_user_detail);
AUTH_ROUTERS.get('/setup/:role/:userId', get_setup_detail)
AUTH_ROUTERS.put('/user/forgetpassword/:email', parser, forget_password)


module.exports = AUTH_ROUTERS