require('dotenv').config();
const OpenAI = require('openai');
const moment = require('moment');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generatePlan(userInput) {
    try {
        // OpenAI API 호출 - 사용자 입력을 메시지에 포함
        const response = await openai.chat.completions.create({
            model: "ft:gpt-4o-mini-2024-07-18:personal:chanhyukbot:BBbVXd3Z",
            temperature: 0.5, // 낮은 온도로 더 일관된 응답 유도
            messages: [{ role: "user", content: userInput }],
            max_tokens: 300
        });

        const responseText = response.choices[0].message.content;
        console.log("OpenAI 응답:", responseText);

        // 여러 JSON 객체가 연속으로 반환되었을 때 각 객체를 분리하고 개별 파싱
        const commandArray = responseText
            .split('\n') // 개행으로 구분된 각 JSON 객체를 분리
            .map(item => {
                try {
                    return JSON.parse(item);
                } catch (error) {
                    console.error("JSON 파싱 오류:", error);
                    return null;
                }
            })
            .filter(item => item !== null); // 유효한 JSON 객체만 필터링

        // 각 명령에 대해 isCalendarCommand 설정 및 날짜 변환
        commandArray.forEach(command => {
            command.isCalendarCommand = ["생성", "조회", "수정", "삭제"].includes(command.action);

            // 날짜 변환: "오늘"과 "내일" 처리
            if (command.date === "오늘") {
                command.date = moment().format("YYYY-MM-DD");
            } else if (command.date === "내일") {
                command.date = moment().add(1, 'days').format("YYYY-MM-DD");
            }
        });

        console.log("파싱된 명령어들:", commandArray);
        return commandArray;
    } catch (error) {
        console.error("OpenAI 요청 오류:", error);
        return { isCalendarCommand: false, error: "요청 오류" };
    }
}

module.exports = { generatePlan };
