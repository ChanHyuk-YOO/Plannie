const jwt = require('jsonwebtoken');

// JWT 토큰 생성 함수
function generateToken(user) {
    return jwt.sign(
        { email: user.email, nickname: user.nickname },           // 사용자 고유 정보 포함
        process.env.JWT_SECRET,          // 비밀 키로 서명
        { expiresIn: '1y' }              // 토큰 만료 기간 설정, 평생 지속 가능 - 1y로 1년간 토큰 유지
    );
}

// JWT 토큰 검증 미들웨어
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "인증 토큰이 필요합니다." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;              // 인증된 사용자 정보를 요청 객체에 저장
        next();
    } catch (error) {
        res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
}

module.exports = { generateToken, verifyToken };
