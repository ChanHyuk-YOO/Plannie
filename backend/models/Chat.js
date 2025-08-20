const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    userId: String,
    nickname: String,
    _id: mongoose.Schema.Types.ObjectId,
});

const messageSchema = new mongoose.Schema({
    senderId: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
    conversationId: String,
    participants: [participantSchema], // Allow storing an array of participant objects
    messages: [messageSchema],
});

module.exports = mongoose.model('Chat', chatSchema);
