const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// 로그인
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: '로그인이 완료되었습니다.', token });
    } catch (error) {
        res.status(500).json({ message: '로그인 중 오류가 발생했습니다.', error });
    }
});

module.exports = router;
