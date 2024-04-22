const smsClient = require("./sms");

async function sendingSMS(req, res) {
    try {
        const numbers = req.body.numbers
        const message = req.body.message
        const sendResults = await smsClient.send({
            from: "+18667769103",
            to: ['+15166088464'],
            // ["+15163308032", '+15166088464', '+923343165003'],
            message
        }, {
            enableDeliveryReport: true,
            tag: "profile status"
        });

        res.status(200).send(sendResults)
    }
    catch (err) {
        res.status(400).send({
            message: "Error sending Message",
            reason: err.message
        })
    }
}

module.exports = {
    sendingSMS: sendingSMS
}