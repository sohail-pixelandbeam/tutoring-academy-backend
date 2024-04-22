const { verifyToken } = require('../controllers/auth');
const { generate_meeting_link } = require('../controllers/meeting');
const { express, parser } = require('../modules');

const MEETING_ROUTES = express.Router();

MEETING_ROUTES.get('/teamsMeetingLinkFunction/:userId', verifyToken, generate_meeting_link)


module.exports = {
    MEETING_ROUTES
}

