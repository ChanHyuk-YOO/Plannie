// models/MongoUser.js
const mongoose = require('mongoose');

// MongoDB User 스키마 정의 (email과 createdAt 필드 포함)
const mongoUserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { _id: false }); // _id 필드를 email로 대체하고 별도로 인덱싱하지 않도록 설정

// MongoDB User 모델 생성
module.exports = mongoose.model('MongoUser', mongoUserSchema);
