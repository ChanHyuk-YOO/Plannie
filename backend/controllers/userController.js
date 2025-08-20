// controllers/userController.js
const User = require('../models/user');

exports.checkUserEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            res.status(200).json({ message: '사용자가 존재합니다.', user });
        } else {
            res.status(404).json({ message: '사용자가 존재하지 않습니다.' });
        }
    } catch (error) {
        console.error('사용자 확인 중 오류:', error);
        res.status(500).json({ message: '사용자 확인 중 오류가 발생했습니다.' });
    }
};
