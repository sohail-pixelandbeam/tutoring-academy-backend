const { sendingSMS } = require('../config/sendingMessages');
const { get_tutor_data, set_tutor_status, get_student_data, set_student_status, get_tutor_new_subject, accept_new_subject, decline_new_subject, get_Constants, postTerms } = require('../controllers/admin');
const { verifyToken } = require('../controllers/auth');
const { express, parser} = require('../modules');


const ADMIN_ROUTES = express.Router();

ADMIN_ROUTES.get('/admin/tutor-data', verifyToken, get_tutor_data)
ADMIN_ROUTES.get('/admin/student-data', verifyToken, get_student_data)
ADMIN_ROUTES.get('/admin/tutor-new-subject', verifyToken, get_tutor_new_subject)
ADMIN_ROUTES.get('/admin/get-constants/:id', verifyToken, get_Constants);

ADMIN_ROUTES.post('/admin/set-tutor-status', parser, verifyToken, set_tutor_status);
ADMIN_ROUTES.post('/admin/set-student-status', parser, verifyToken, set_student_status);
ADMIN_ROUTES.post('/admin/post-new-subject', parser, verifyToken, accept_new_subject);
ADMIN_ROUTES.post('/admin/delete-new-subject', parser, verifyToken, decline_new_subject);
ADMIN_ROUTES.post('/admin/store-terms', parser, verifyToken, postTerms);
ADMIN_ROUTES.post('/send-message', parser, verifyToken, sendingSMS);


module.exports = {
    ADMIN_ROUTES
}