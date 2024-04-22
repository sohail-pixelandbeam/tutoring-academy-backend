const { app } = require('@azure/functions');
const { Connection, Request } = require('tedious');
require('dotenv').config();

const config = {
    "server": process.env.SQL_SERVER,
    "authentication": {
        "type": "default",
        "options": {
            "userName": process.env.SQL_USERNAME,
            "password": process.env.SQL_PASSWORD
        }
    },
    "options": {
        "port": 1433,
        "database": "Tutoringacademy",
        "trustServerCertificate": true
    }

};

app.timer('newtriggerexpre', {
    schedule: '0 */2 * * * *',
    handler: (myTimer, context) => {
        const config = {
            "server": process.env.SQL_SERVER,
            "authentication": {
                "type": "default",
                "options": {
                    "userName": process.env.SQL_USERNAME,
                    "password": process.env.SQL_PASSWORD
                }
            },
            "options": {
                "port": 1433,
                "database": "Tutoringacademy",
                "trustServerCertificate": true
            }
        }

        const connection = new Connection(config);

        // Connect to SQL Server
        connection.on('connect', async function (err) {
            if (err) {
                context.log.error(err);
                return;
            }

            try {
                // Calculate the date 7 days ago
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                // Execute update query for records older than 7 days
                const request = new Request(`
                UPDATE TutorAds
                SET Status = 'expired', Published_At = NULL
                WHERE Published_At < DATEADD(DAY, -7, GETDATE())
                `, function (err, rowCount) {
                    if (err) {
                        context.log.error(err);
                        return;
                    }

                    context.log(`${rowCount} rows were updated`);
                });

                request.addParameter('sevenDaysAgo', TYPES.DateTime, sevenDaysAgo);

                connection.execSql(request);
            } catch (err) {
                context.log.error(err);
            }
        });
    }
});


/**
 * 
 * @returns Promise Object - return tutorAds array
 */
function getTutorAds() {
    return new Promise((resolve, reject) => {
        try {
            const connection = new Connection(config);
            // const query = 'Select * from TutorAds'
            const query = `
            UPDATE TutorAds
            SET Status = 'expired', Published_At = NULL
            WHERE Published_At < DATEADD(DAY, -7, GETDATE())`;

            connection.on('connect', err => {
                if (err) {
                    console.log(err);
                    reject(err);
                }

                const request = new Request(query, err => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log("Update successful");
                        resolve(); // Assuming resolve() is defined somewhere in your code
                    }
                });

                connection.execSql(request);
            });
            connection.connect();
        }
        catch (err) {
            context.log(err)
        }
    });
}
