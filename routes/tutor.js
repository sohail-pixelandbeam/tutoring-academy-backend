const { verify } = require('jsonwebtoken');
const { verifyToken } = require('../controllers/auth');
const multer = require('multer');
const upload = multer({ dest: 'interviews/' })
const { subjects,
    post_form_one,
    get_countries,
    get_gmt,
    get_state,
    get_experience,
    get_level,
    get_degree,
    get_certificates,
    get_user_data,
    get_response,
    subject_already_exist,
    upload_tutor_rates,
    get_my_data,
    get_rates,
    upload_tutor_bank,
    get_tutor_setup,
    post_tutor_rates_form,
    get_my_edu,
    get_tutor_rates,
    get_bank_details,
    storeEvents,
    fetchStudentsBookings,
    storeCalenderTutorRecord,
    get_tutor_status,
    faculties,
    post_new_subject,
    post_tutor_setup,
    get_tutor_market_data,
    get_tutor_students,
    getSessionsDetails,
    last_pay_day,
    get_tutor_profile_data,
    remove_subject_rates,
    post_tutor_ad,
    get_tutor_ads,
    get_ad,
    put_ad,
    set_agreements_date_null_for_all,
    get_tutor_against_code,
    get_tutor_offered_subjects,
    dynamically_post_edu_info,
    get_all_tutor_sessions_formatted,
    get_feedback_data,
    get_tutor_feedback_questions,
    delete_ad,
    get_faculty_subjects,
    get_student_published_ads,
    ad_to_shortlist,
    get_shortlist_ads,
    delete_ad_from_shortlist,
    get_student_public_profile_data, recordVideoController, getVideo, getSessionDetailById } = require('../controllers/tutor');

const { express, path, fs, parser, cookieParser, mocha, morgan, cors, shortId, jwt } = require('../modules');

const TUTOR_ROUTES = express.Router();

// TUTOR_ROUTES.use(verifyToken);


TUTOR_ROUTES.get('/tutor/tutor-status', verifyToken, get_tutor_status)
TUTOR_ROUTES.get('/tutor/subjects', verifyToken, subjects)
TUTOR_ROUTES.get('/tutor/newsubject/:subject', verifyToken, subject_already_exist)
TUTOR_ROUTES.get('/tutor/faculties', verifyToken, faculties)
TUTOR_ROUTES.get('/tutor/countries', verifyToken, get_countries)
TUTOR_ROUTES.get('/tutor/state', verifyToken, get_state)
TUTOR_ROUTES.get('/tutor/gmt', verifyToken, get_gmt)
TUTOR_ROUTES.get('/tutor/experience', verifyToken, get_experience)
TUTOR_ROUTES.get('/tutor/level', verifyToken, get_level)
TUTOR_ROUTES.get('/tutor/degree', verifyToken, get_degree)
TUTOR_ROUTES.get('/tutor/certificates', verifyToken, get_certificates)
TUTOR_ROUTES.get('/tutor/education', verifyToken, get_user_data)
TUTOR_ROUTES.get('/tutor/response', verifyToken, get_response)
TUTOR_ROUTES.get('/tutor/my-data', verifyToken, get_my_data)
TUTOR_ROUTES.get('/tutor/my-rate', verifyToken, get_rates)
TUTOR_ROUTES.get('/subject/:facultyId', verifyToken, get_faculty_subjects)
TUTOR_ROUTES.get('/tutor/subjects/:id', verifyToken, get_tutor_offered_subjects)
TUTOR_ROUTES.get('/tutor/tutor-rate', verifyToken, get_tutor_rates)
TUTOR_ROUTES.get('/tutor/my-edu', verifyToken, get_my_edu)
TUTOR_ROUTES.get('/tutor/tutor-bank-details', verifyToken, get_bank_details)

TUTOR_ROUTES.get('/tutor/tutor-setup', parser, verifyToken, get_tutor_setup);
TUTOR_ROUTES.get('/tutor/feedbacks/:tutorId', parser, verifyToken, get_feedback_data);
TUTOR_ROUTES.get('/tutor/feedback/questions', verifyToken, get_tutor_feedback_questions)

TUTOR_ROUTES.post('/tutor/payment', parser, verifyToken, upload_tutor_bank);
TUTOR_ROUTES.post('/tutor/rates/:faculty/:subject/:id', parser, verifyToken, upload_tutor_rates);
TUTOR_ROUTES.delete('/subject-rate/:id', parser, verifyToken, remove_subject_rates);

TUTOR_ROUTES.post('/tutor/form-one', parser, verifyToken, post_form_one);
TUTOR_ROUTES.post('/tutor/edu', parser, verifyToken, dynamically_post_edu_info);

TUTOR_ROUTES.post('/tutor/tutor-rates', parser, verifyToken, post_tutor_rates_form);
TUTOR_ROUTES.post('/tutor/new-subject', parser, verifyToken, post_new_subject);
TUTOR_ROUTES.get('/p-payment/last_payday', verifyToken, last_pay_day);

TUTOR_ROUTES.post("/api/store-event", parser, verifyToken, storeEvents);
TUTOR_ROUTES.get("/api/bookings/:tutorId", verifyToken, fetchStudentsBookings)
TUTOR_ROUTES.put("/tutor/update/:id", parser, verifyToken, storeCalenderTutorRecord);
TUTOR_ROUTES.post('/tutor/setup', parser, verifyToken, post_tutor_setup)
TUTOR_ROUTES.post('/tutor/setup/record', upload.single('file'), verifyToken, recordVideoController)
TUTOR_ROUTES.get('/tutor/setup/intro', verifyToken, getVideo)

TUTOR_ROUTES.put('/tutor/agreement-updated', parser, verifyToken, set_agreements_date_null_for_all)
TUTOR_ROUTES.get('/tutor/market-data', verifyToken, get_tutor_market_data)

TUTOR_ROUTES.get('/tutor/get_students/:academyId', verifyToken, get_tutor_students)
TUTOR_ROUTES.get('/tutor/session/:tutorId', verifyToken, getSessionsDetails)
TUTOR_ROUTES.get('/tutor/sessions/formatted/:tutorId', verifyToken, get_all_tutor_sessions_formatted)

TUTOR_ROUTES.get('/profile/:tutorId/:studentId', verifyToken, get_tutor_profile_data)
TUTOR_ROUTES.post('/tutor/market-place', parser, verifyToken, post_tutor_ad)
TUTOR_ROUTES.get('/tutor/market-place/list/:AcademyId', verifyToken, get_tutor_ads)
TUTOR_ROUTES.get('/tutor/ad/:Id', verifyToken, get_ad)
TUTOR_ROUTES.put('/tutor/ad/:Id', parser, verifyToken, put_ad)
TUTOR_ROUTES.delete('/tutor/ad/:Id', parser, verifyToken, delete_ad)
TUTOR_ROUTES.get('/tutor/market-place/classified', verifyToken, get_student_published_ads)
TUTOR_ROUTES.post('/tutor/market-place/shortlist', parser, verifyToken, ad_to_shortlist)
TUTOR_ROUTES.get('/tutor/market-place/shortlist/:tutorId/list', parser, verifyToken, get_shortlist_ads)
TUTOR_ROUTES.delete('/tutor/:tutorId/market-place/shortlist/:Id', verifyToken, delete_ad_from_shortlist)
TUTOR_ROUTES.get('/tutor/rate/:code', verifyToken, get_tutor_against_code)
TUTOR_ROUTES.get('/tutor/:tutorId/profile/:studentId', verifyToken, get_student_public_profile_data)

TUTOR_ROUTES.get('/collab/:sessionId', verifyToken, getSessionDetailById)


module.exports = {
    TUTOR_ROUTES
}