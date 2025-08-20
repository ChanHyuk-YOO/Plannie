// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // MariaDB User 모델 가져오기

// 토큰 인증 미들웨어
const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다. 인증이 필요합니다.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // .env 파일에 JWT_SECRET 값 설정 필요
        const user = await User.findOne({ where: { email: decoded.email } });
        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        req.user = user; // 사용자 정보를 요청 객체에 추가
        next();
    } catch (error) {
        console.error('토큰 인증 에러:', error);
        res.status(403).json({ message: '잘못된 토큰입니다.' });
    }
};

module.exports = authenticateToken;
