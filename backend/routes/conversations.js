const express = require('express');
const Conversation = require('../models/Conversation'); // Conversation 모델 가져오기
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Conversations
 *   description: 대화 관리 API
 */

/**
 * @swagger
 * /conversations:
 *   post:
 *     summary: 새로운 대화를 저장하거나 기존 대화에 메시지를 추가합니다.
 *     tags: [Conversations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 사용자 ID
 *               role:
 *                 type: string
 *                 description: "메시지 역할 (예: user 또는 assistant)"
 *               content:
 *                 type: string
 *                 description: 메시지 내용
 */

router.post('/conversations', async (req, res) => {
    const { userId, role, content } = req.body;

    try {
        let conversation = await Conversation.findOne({ userId });

        if (!conversation) {
            conversation = new Conversation({
                userId,
                conversationHistory: [{ role, content }]
            });
        } else {
            conversation.conversationHistory.push({ role, content });
        }

        await conversation.save();
        res.status(201).json({ message: 'Conversation saved', conversation });
    } catch (error) {
        console.error('Error saving conversation:', error);
        res.status(500).json({ message: 'Error saving conversation' });
    }
});

/**
 * @swagger
 * /conversations/{userId}:
 *   get:
 *     summary: 사용자 ID로 대화를 조회합니다.
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 대화 조회를 위한 사용자 ID
 *     responses:
 *       200:
 *         description: 대화 조회 성공
 *       404:
 *         description: 대화가 없습니다.
 *       500:
 *         description: 대화 조회 중 오류가 발생했습니다.
 */
router.get('/conversations/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const conversation = await Conversation.findOne({ userId });

        if (!conversation) {
            return res.status(404).json({ message: 'No conversation found for this user' });
        }

        res.status(200).json({ conversation });
    } catch (error) {
        console.error('Error retrieving conversation:', error);
        res.status(500).json({ message: 'Error retrieving conversation' });
    }
});

/**
 * @swagger
 * /conversations/{userId}:
 *   delete:
 *     summary: 사용자 ID로 대화를 삭제합니다.
 *     tags: [Conversations]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 삭제할 대화의 사용자 ID
 *     responses:
 *       200:
 *         description: 대화 삭제 성공
 *       404:
 *         description: 삭제할 대화가 없습니다.
 *       500:
 *         description: 대화 삭제 중 오류가 발생했습니다.
 */
router.delete('/conversations/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const conversation = await Conversation.findOneAndDelete({ userId });

        if (!conversation) {
            return res.status(404).json({ message: 'No conversation found to delete' });
        }

        res.status(200).json({ message: 'Conversation deleted' });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ message: 'Error deleting conversation' });
    }
});

module.exports = router;
