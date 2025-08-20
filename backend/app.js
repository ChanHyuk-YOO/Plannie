require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http');             // 추가: HTTP 서버 생성용
const socketIo = require('socket.io');    // 추가: Socket.IO 모듈

const connectDB = require('./config/mongodb');
const sequelize = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./swagger');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const plannerRouter = require('./routes/planner');
const signupRouter = require('./routes/signup');
const authRouter = require('./routes/auth');
const userProfileRouter = require('./routes/userProfile');
const processRequestRouter = require('./routes/processRequest');
const chatRouter = require('./routes/chat');

// Import middlewares
const authenticateToken = require('./middlewares/authMiddleware');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// 추가: plannerController import (웹소켓 이벤트 핸들링에 사용)
const plannerController = require('./controllers/plannerController');

const app = express();

// Database connections
connectDB(); // Connect to MongoDB
sequelize.sync({ alter: false })
    .then(() => console.log('MySQL/PostgreSQL 연결 성공 및 테이블 동기화 완료'))
    .catch((error) => {
        console.error('MySQL/PostgreSQL 연결 오류:', error);
        process.exit(1); // Exit on database connection failure
    });

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route handlers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/planner', authenticateToken, plannerRouter); // Protected route
app.use('/signup', signupRouter);
app.use('/auth', authRouter);
app.use('/user', authenticateToken, userProfileRouter); // Protected route
app.use('/process-request', processRequestRouter);
app.use('/chat', chatRouter);
// Error handling middlewares
app.use(notFound); // 404 Not Found handler
app.use(errorHandler); // General error handler

// HTTP 서버와 Socket.IO 설정
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: '*' } // 필요한 경우, 허용할 도메인으로 설정
});

// Socket.IO 인스턴스를 Express 앱에 등록 (컨트롤러 등에서 접근하기 위해)
app.set('socketio', io);

// 클라이언트 연결 이벤트 처리
io.on('connection', (socket) => {
    console.log('새 클라이언트 연결됨:', socket.id);

    // 웹소켓을 통해 특정 날짜의 일정을 조회하는 이벤트
    socket.on('getPlannersByDate', async (data) => {
        try {
            // data는 { date: "YYYY.MM.DD" } 형태로 전달된다고 가정
            const planners = await plannerController.getPlannersByDateLogic(data.date);
            socket.emit('plannersData', planners);
        } catch (error) {
            console.error("일정 조회 중 오류 발생:", error);
            socket.emit('error', { message: '일정 조회 실패' });
        }
    });

    socket.on('disconnect', () => {
        console.log('클라이언트 연결 해제:', socket.id);
    });
});

// 서버 실행
server.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});

module.exports = app;
