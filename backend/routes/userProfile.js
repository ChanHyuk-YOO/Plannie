const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // MariaDB User 모델 가져오기
const MongoUser = require('../models/MongoUser'); // MongoDB User 모델 가져오기
const Chat = require('../models/Chat'); // MongoDB Chat 모델 가져오기
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * 회원 정보 수정 라우터
 */
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        res.set('Cache-Control', 'no-store'); // 캐시 비활성화

        const user = req.user ? req.user.email : null;

        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        const userProfile = await User.findOne({ where: { email: user } });

        if (!userProfile) {
            return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
        }

        res.status(200).json({
            email: userProfile.email,
            nickname: userProfile.nickname,
            name: userProfile.name,
            birth: userProfile.birth,
            profileimg: userProfile.profileimg,
            phone: userProfile.phone,
            gender: userProfile.gender,
            address: userProfile.address,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: '사용자 정보를 가져오는 데 실패했습니다.' });
    }
});


// 사용자 프로필 정보 수정 (PUT /user/update)
router.put('/update', authenticateToken, async (req, res) => {
    const { nickname, password, name, phone, address, birth, gender, profileimg } = req.body;

    try {
        // 사용자 정보 업데이트
        const [updated] = await User.update(
            { nickname, password, name, phone, address, birth, gender, profileimg },
            { where: { email: req.user.email } }
        );

        if (updated) {
            const updatedUser = await User.findOne({ where: { email: req.user.email } });
            res.status(200).json({ message: '사용자 정보가 성공적으로 업데이트되었습니다.', user: updatedUser });
        } else {
            res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: '사용자 정보를 업데이트하는 데 실패했습니다.' });
    }
});

/**
 * 회원 탈퇴 라우터
 */
router.delete('/delete', authenticateToken, async (req, res) => {
    try {
        const email = req.user.email; // 토큰에서 추출한 사용자 email

        // MariaDB 사용자 조회
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: '삭제할 사용자를 찾을 수 없습니다.' });
        }

        // MariaDB 사용자 삭제
        await user.destroy();

        // MongoDB 사용자 삭제
        const mongoDeleteResult = await MongoUser.deleteOne({ _id: email });
        if (mongoDeleteResult.deletedCount === 0) {
            console.warn(`MongoDB에서 해당 사용자를 찾을 수 없었습니다: ${email}`);
        }

        // MongoDB에서 채팅방 삭제
        const chatDeleteResult = await Chat.deleteOne({ "participants.userId": email });
        if (chatDeleteResult.deletedCount === 0) {
            console.warn(`MongoDB에서 해당 사용자의 채팅방을 찾을 수 없었습니다: ${email}`);
        }

        res.json({ message: '회원탈퇴가 완료되었습니다. 관련된 채팅방도 삭제되었습니다.' });
    } catch (error) {
        console.error('회원탈퇴 중 오류:', error);
        res.status(500).json({ error: '회원탈퇴 중 오류가 발생했습니다.' });
    }
});

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: 회원정보 수정
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: 새로운 비밀번호
 *               nickname:
 *                 type: string
 *                 description: 새로운 닉네임
 *               name:
 *                 type: string
 *                 description: 새로운 이름
 *               phone:
 *                 type: string
 *                 description: 새로운 전화번호
 *               address:
 *                 type: string
 *                 description: 새로운 주소
 *               birth:
 *                 type: string
 *                 format: date
 *                 description: 새로운 생년월일
 *               gender:
 *                 type: string
 *                 description: 성별
 *               profileimg:
 *                 type: string
 *                 description: 새로운 프로필 이미지 URL
 *     responses:
 *       200:
 *         description: 회원정보 수정 성공
 *       401:
 *         description: 인증 필요 (JWT 토큰 누락)
 *       404:
 *         description: 사용자 정보 없음
 *       500:
 *         description: 서버 오류
 */

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: 회원탈퇴
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 회원탈퇴 성공
 *       401:
 *         description: 인증 필요 (JWT 토큰 누락)
 *       404:
 *         description: 사용자 정보 없음
 *       500:
 *         description: 서버 오류
 */

module.exports = router;
