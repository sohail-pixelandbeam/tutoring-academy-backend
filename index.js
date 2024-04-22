const { express, path, morgan, socket, cors } = require('./modules');
const { STUDENT_ROUTES } = require('./routes/student');
const { ADMIN_ROUTES } = require('./routes/admin');
const { TUTOR_ROUTES } = require('./routes/tutor');
const AUTH_ROUTERS = require('./routes/auth');
const COMMON_ROUTERS = require('./routes/common')
const HOLIDAY_ROUTES = require('./routes/holiday')
const FILE_ROUTER = require('./routes/file')
const { MEETING_ROUTES } = require('./routes/meeting');
const CHAT_ROUTES = require('./routes/chat')
require('dotenv').config();

var { PeerServer } = require("peer");
var myPeerServer = PeerServer({ port: 8080 });

const app = express();
app.use(cors({ origin: process.env.Remote_Base }))
app.use(morgan('tiny'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get('/', (req, res) => res.send({ message: 'Hello world', base: process.env.Remote_Base}))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/interviews', express.static(path.join(__dirname, '/interviews')));



// app.use(verifyToken)
app.use(TUTOR_ROUTES);
app.use(ADMIN_ROUTES);
app.use(STUDENT_ROUTES);
app.use(AUTH_ROUTERS)
app.use(HOLIDAY_ROUTES)
app.use(FILE_ROUTER)
app.use(CHAT_ROUTES)
app.use('/api/', MEETING_ROUTES);
app.use(COMMON_ROUTERS)

var server = app.listen(process.env.PORT, () =>
    console.log('app is live @', process.env.PORT));


const io = socket(server, {
    cors: {
        origin: process.env.Remote_Base,
        credentials: true,
    },
});
const socketToUserMap = {};
const excalidraw_collaborators = new Map();

io.on('connection', socket => {
    global.chatSocket = socket;

    //collab video streaming
    socket.on('join-room', (room_id, user_id) => {

        socket.join(room_id);
        socket.broadcast.to(room_id).emit("user-connected", user_id);

        socket.on('disconnect', () => {
            socket.broadcast.to(room_id).emit('user-disconnected', user_id);
        })

    });

    //excalidraw/canvas/session
    socket.on('join-session', (sessionId) => {
        socket.join(sessionId);
        console.log('User', socket.id, ' joined session ', sessionId)
    })

    socket.on('authorize-student', (data) => {
        const { sessionId } = data;
        socket.to(sessionId).emit("recieve-authorization", data);
    })

    socket.on('canvas-change', (data) => {
        if (data) {
            const { sessionId = '', elements = [], appState = {}, collaborator = {}, files } = data;
            excalidraw_collaborators.set(collaborator.AcademyId, collaborator);
            sessionId.length && socket.to(sessionId).emit("canvas-change-recieve",
                { elements, appState, collaborators: JSON.stringify([...excalidraw_collaborators]), files });
        }
    });

    socket.on('activeTool', (data) => {
        if (data) {
            const { activeTool = {}, sessionId = '' } = data;
            sessionId?.length && socket.to(sessionId).emit("active-tool-change",
                { activeTool });
        }
    });

    //add in session/canvas chat
    socket.on("session-add-user", (sessionId) => {
        socket.join(sessionId)
        console.log('User', socket.id, ' joined room ', sessionId)
    });
    socket.on("session-send-msg", (data) => {
        const { text, sessionId } = data;
        console.log(`From session Message:${text}, sent from ${sessionId}`);
        socket.to(sessionId).emit("session-msg-recieve", data);
    });

    //message board tab
    socket.on("add-user", (roomId) => {
        socket.join(roomId)
        console.log('User', socket.id, ' joined room ', roomId)
    });

    socket.on("send-msg", (data) => {
        const { to, text, room } = data
        console.log(`Message:${text} sent from room:${room} to ${to}`);
        socket.to(room).emit("msg-recieve", data);
    });

    socket.on('online', (id, role) => {
        socketToUserMap[socket.id] = { userId: id, role };
        io.emit("online", id);
    })

    socket.on('offline', (id) => {
        io.emit("offline", id);
    })

    //disconnect
    socket.on('disconnect', (error) => {
        const { userId = null, role = null } = socketToUserMap?.[socket.id] || {};
        io.emit("offline", userId, role, 'disconn')
        console.log('disonnecting ', userId, role, ' due to', error, socket.id)
    })

});

myPeerServer.on("connection", function ({ id }) {
    console.log(id + " has connected to the PeerServer");
});

myPeerServer.on("disconnect", function ({ id }) {
    console.log(id + " has disconnected from the PeerServer");
});




process.on('unhandledRejection', (reason, promise) => {
    try {
        console.log('Unhandled Rejection at:', reason.stack || reason)

        // Recommended: send the information to sentry.io
        // or whatever crash reporting service you use}
    } catch (err) {
        console.log('Unhandled Rejection at:', reason.stack || reason)
    }
})

