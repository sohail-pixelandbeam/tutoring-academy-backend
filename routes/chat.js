const { fetch_chats, fetch_chat_messages, post_message, create_chat, set_status, get_recomendation } = require("../controllers/chat");
const {
    express,
    parser,
} = require('../modules');
const CHAT_ROUTES = express.Router();

CHAT_ROUTES.get('/chats/:role/:userId', fetch_chats);
CHAT_ROUTES.get('/messages/:chatId', fetch_chat_messages);
CHAT_ROUTES.post('/message', parser, post_message);
CHAT_ROUTES.post('/chat', parser, create_chat);
CHAT_ROUTES.post('/chat/online/:AcademyId/:role', parser, set_status);
CHAT_ROUTES.get('/chat/recomendation/:id', get_recomendation);



module.exports = CHAT_ROUTES