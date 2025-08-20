// controllers/processRequest.js
const { generatePlan } = require('../openai'); // OpenAI API 호출

async function analyzeUserMessage(message) {
    try {
        const parsedCommand = await generatePlan(message); // OpenAI로부터 명령어 분석 결과 받기
        return parsedCommand;
    } catch (error) {
        console.error("명령어 분석 오류:", error);
        return null;
    }
}

module.exports = { analyzeUserMessage };
