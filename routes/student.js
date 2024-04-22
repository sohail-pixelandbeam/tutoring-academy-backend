const { verifyToken } = require('../controllers/auth');
const { upload_setup_info, get_student_setup, get_student_grade, get_tutor_subject, upload_student_short_list, get_student_short_list,
    get_student_short_list_data,
    get_student_market_data,
    post_student_bookings,
    get_student_tutor_bookings,
    get_my_data,
    get_student_bank_details,
    post_student_bank_details,
    post_student_feedback,
    get_student_feedback,
    payment_report,
    get_feedback_questions,
    get_feedback_of_questions,
    post_feedback_questions,
    update_shortlist, get_student_bookings, getBookedSlot, get_tutor_bookings, get_student_or_tutor_bookings, post_student_agreement, set_code_applied, get_published_ads, get_all_students_sessions_formatted, ad_to_shortlist, get_shortlist_ads, delete_ad_from_shortlist, post_student_ad, get_student_ads, put_ad, get_ad,
    get_tutor_by_subject_faculty } = require('../controllers/student');
const { express, parser } = require('../modules');

const STUDENT_ROUTES = express.Router();

STUDENT_ROUTES.get('/student/setup', verifyToken, get_student_setup)
STUDENT_ROUTES.get('/student/grade', verifyToken, get_student_grade)
STUDENT_ROUTES.get('/student/tutor-subject', verifyToken, get_tutor_subject)
STUDENT_ROUTES.post('/student/short-list', parser, verifyToken, upload_student_short_list)
STUDENT_ROUTES.get('/student/my-data', verifyToken, get_my_data)
STUDENT_ROUTES.get('/student/short-list/:student', verifyToken, get_student_short_list)
STUDENT_ROUTES.put('/student/short-list/:AcademyId/:Student/:Subject', parser, verifyToken, update_shortlist)

STUDENT_ROUTES.get('/student/short-list-data', verifyToken, get_student_short_list_data)
STUDENT_ROUTES.get('/student/market-data', verifyToken, get_student_market_data)
STUDENT_ROUTES.post('/student/ad', parser, verifyToken, post_student_ad)
STUDENT_ROUTES.get('/student/ad/:id/list', verifyToken, get_student_ads)
STUDENT_ROUTES.put('/student/ad/:id', parser, verifyToken, put_ad)
STUDENT_ROUTES.get('/student/ad/:id', verifyToken, get_ad)

STUDENT_ROUTES.post('/student/setup', parser, verifyToken, upload_setup_info)
STUDENT_ROUTES.put('/student/setup/agreement/:userId', parser, verifyToken, post_student_agreement)

//bookings
STUDENT_ROUTES.post('/student/booking', parser, verifyToken, post_student_bookings)
STUDENT_ROUTES.get('/student/tutor/bookings/:tutorId', verifyToken, get_tutor_bookings)
STUDENT_ROUTES.get('/student/sessions/formatted/:studentId', verifyToken, get_all_students_sessions_formatted)
STUDENT_ROUTES.get('/student/booking/:studentId/:tutorId', parser, verifyToken, get_student_or_tutor_bookings)

STUDENT_ROUTES.get('/student/booking/:studentId', verifyToken, get_student_bookings)

STUDENT_ROUTES.get('/student/bank/:AcademyId', verifyToken, get_student_bank_details)
STUDENT_ROUTES.post('/student/bank', parser, verifyToken, post_student_bank_details)
STUDENT_ROUTES.post('/student/feedback', parser, verifyToken, post_student_feedback)
STUDENT_ROUTES.get('/student/feedback/:ShortlistId', get_student_feedback)
STUDENT_ROUTES.get('/student/booked-slot', verifyToken, getBookedSlot)

STUDENT_ROUTES.get('/student/payment-report/:studentId', verifyToken, payment_report)
STUDENT_ROUTES.get('/questions/list/:isStudentLoggedIn', verifyToken, get_feedback_questions)
STUDENT_ROUTES.get('/questions/:StudentId/:TutorId/:SessionId/:isstudentgiver', verifyToken, get_feedback_of_questions)
STUDENT_ROUTES.post('/questions', parser, verifyToken, post_feedback_questions);
STUDENT_ROUTES.put('/code-applied/:studentId/:tutorId', parser, verifyToken, set_code_applied)
STUDENT_ROUTES.get('/student/ads', verifyToken, get_published_ads)
STUDENT_ROUTES.post('/student/ads/shortlist', parser, verifyToken, ad_to_shortlist)
STUDENT_ROUTES.get('/student/ads/shortlist/list/:studentId', verifyToken, get_shortlist_ads)
STUDENT_ROUTES.delete('/student/ads/shortlist/:adId/:studentId', verifyToken, parser, verifyToken, delete_ad_from_shortlist)


//faculty+subjs
STUDENT_ROUTES.get('/student/:studentId/subject/:subjectName/faculty/:facultyId', verifyToken, get_tutor_by_subject_faculty)

module.exports = {
    STUDENT_ROUTES
} 