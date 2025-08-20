// controllers/conversationController.js
const Conversation = require('../models/Conversation');

async function getConversationHistory(userId) {
    try {
        let conversation = await Conversation.findOne({ userId });
        if (!conversation) {
            // 해당 사용자의 대화 기록이 없으면 새로 생성
            conversation = new Conversation({ userId, conversationHistory: [] });
            await conversation.save();
        }
        return conversation.conversationHistory;
    } catch (error) {
        console.error("getConversationHistory 오류:", error);
        throw error;
    }
}

async function saveConversationHistory(userId, messages) {
    try {
        await Conversation.updateOne(
            { userId },
            { conversationHistory: messages },
            { upsert: true }
        );
    } catch (error) {
        console.error("saveConversationHistory 오류:", error);
        throw error;
    }
}

module.exports = { getConversationHistory, saveConversationHistory };
