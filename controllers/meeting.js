const sql = require('mssql');
const createNewMeetingAsync  = require('../helperfunctions/graph');

const generate_meeting_link = async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log('UserId', userId);

        teamsMeetingLink = await createNewMeetingAsync(userId);
        const body = JSON.stringify(teamsMeetingLink);
        const meeting = JSON.parse(body);
        console.log("meeting:", meeting, body);
        res.status(200).send(meeting.onlineMeeting.joinUrl)
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: "Error Creating the Meeting Link", reason: err.message })
    }
}

module.exports = {
    generate_meeting_link
}
