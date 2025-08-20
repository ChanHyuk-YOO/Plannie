const express = require('express');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone'); // moment-timezone 가져오기
const User = require('../models/user'); // MariaDB User 모델 가져오기
const MongoUser = require('../models/MongoUser'); // MongoDB User 모델 가져오기
const Chat = require('../models/Chat'); // MongoDB Chat 모델 가져오기
const { v4: uuidv4 } = require('uuid'); // UUID 생성 라이브러리
const router = express.Router();

/**
 * 새로운 채팅방을 생성하여 MongoDB에 저장하는 함수
 * @param {string} userId - 사용자 ID (이메일)
 * @returns {string} 생성된 대화방 ID
 */
async function createChatForUser(userId) {
    const conversationId = uuidv4(); // 고유한 대화방 ID 생성
    const chat = new Chat({
        conversationId,
        participants: [{ userId, nickname: "User" }],
        messages: [] // 초기 메시지 배열 비워두기
    });
    await chat.save();
    return conversationId;
}

router.post('/', async (req, res) => {
    try {
        const { email, password, nickname, name, phone, address, birth, gender, profileimg } = req.body;

        // 필수 항목 확인
        if (!email) return res.status(400).json({ error: '이메일을 입력해주세요.' });
        if (!password) return res.status(400).json({ error: '비밀번호를 입력해주세요.' });
        if (!nickname) return res.status(400).json({ error: '닉네임을 입력해주세요.' });

        // MariaDB에서 이메일 중복 확인
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: '이미 등록된 이메일입니다.' });

        // MongoDB에서 이메일 중복 확인
        const existingMongoUser = await MongoUser.findOne({ email });
        if (existingMongoUser) return res.status(400).json({ error: '이미 등록된 이메일입니다.' });

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 한국 시간대로 변환하여 생일 저장
        const formattedBirth = birth ? moment.tz(birth, "Asia/Seoul").format("YYYY-MM-DD HH:mm:ss") : null;

        // MariaDB에 새 사용자 생성
        const newUser = await User.create({
            email,
            password: hashedPassword,
            nickname,
            name,
            phone,
            address,
            birth: formattedBirth, // 변환된 생일
            gender,
            profileimg
        });

        // MongoDB에 새 사용자 생성 (email을 _id와 email 필드 모두에 저장)
        const newMongoUser = new MongoUser({
            _id: email,
            email: email
        });
        await newMongoUser.save();

        // MongoDB에 사용자와 연결된 채팅방 생성
        const conversationId = await createChatForUser(email);

        res.status(201).json({
            message: '회원가입 성공!',
            user: newUser,
            conversationId // 생성된 채팅방 ID 반환
        });
    } catch (error) {
        console.error('회원가입 에러:', error);
        res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.' });
    }
});
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 회원가입
 *     description: 회원가입 시 사용자의 정보를 MariaDB와 MongoDB에 저장합니다. MongoDB에는 이메일과 채팅방 정보가 저장됩니다.
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
 *                 description: 사용자 이메일 (MongoDB와 MariaDB에 저장)
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호 (암호화되어 MariaDB에만 저장)
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임 (MariaDB에 저장)
 *               name:
 *                 type: string
 *                 description: 사용자 이름 (MariaDB에 저장)
 *               phone:
 *                 type: string
 *                 description: 사용자 전화번호 (MariaDB에 저장)
 *               address:
 *                 type: string
 *                 description: 사용자 주소 (MariaDB에 저장)
 *               birth:
 *                 type: string
 *                 format: date
 *                 description: 사용자 생년월일 (MariaDB에 저장)
 *               gender:
 *                 type: string
 *                 description: 사용자 성별 (MariaDB에 저장)
 *               profileimg:
 *                 type: string
 *                 description: 사용자 프로필 이미지 URL (MariaDB에 저장)
 *             required:
 *               - email
 *               - password
 *               - nickname
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "회원가입 성공!"
 *                 user:
 *                   type: object
 *                   description: MariaDB에 저장된 사용자 정보
 *                 conversationId:
 *                   type: string
 *                   description: 생성된 대화방 ID
 *       400:
 *         description: 잘못된 요청 (이메일 중복, 유효성 실패 등)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "이메일을 입력해주세요."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "회원가입 중 오류가 발생했습니다."
 */

module.exports = router;
