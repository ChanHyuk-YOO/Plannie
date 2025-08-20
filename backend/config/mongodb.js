const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 환경 변수에서 MongoDB URI를 가져옴 (.env에서 MONGO_URI 사용)
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MongoDB 연결 URL이 설정되지 않았습니다.');
        }

        // MongoDB에 연결
        await mongoose.connect(mongoURI); // useNewUrlParser 및 useUnifiedTopology 제거
        console.log('MongoDB 연결 성공');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // MongoDB 연결 실패 시 애플리케이션 종료
    }
};

module.exports = connectDB;
