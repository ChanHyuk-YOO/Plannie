const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: String,  // 사용자 식별자
  conversationHistory: [
    {
      role: String,
      content: String
    }
  ]
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
