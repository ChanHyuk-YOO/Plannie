// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwtHelper'); // jwtHelper에서 토큰 생성 함수 가져오기
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관련 API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 사용자 목록 조회
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 사용자 목록에 대한 응답 메시지
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: respond with a resource
 */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공 (JWT 토큰 반환)
 *       401:
 *         description: 인증 실패
 *       404:
 *         description: 사용자 없음
 *       500:
 *         description: 서버 오류
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: '해당 이메일의 사용자를 찾을 수 없습니다.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // JWT 토큰 생성
    const token = generateToken(user);
    res.setHeader('Authorization', `Bearer ${token}`);
    res.json({ message: '로그인 성공', token });
  } catch (error) {
    res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.', error: error.message });
  }
});
// 인증된 사용자의 닉네임을 가져오는 라우트
router.get('/profile', authenticateToken, (req, res) => {
  try {
    res.status(200).json({ nickname: req.user.nickname });
  } catch (error) {
    console.error('사용자 닉네임 조회 에러:', error);
    res.status(500).json({ message: '사용자 정보를 가져오는 중 오류가 발생했습니다.' });
  }
});

// 이메일로 사용자 존재 여부 확인 라우트
router.get('/check/:email', userController.checkUserEmail);

module.exports = router;
