// chat.js
const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const OpenAI = require('openai');
const router = express.Router();
const plannerController = require('../controllers/gpt-plannnerConntroller.js'); // DB 작업 관련 controller

moment.locale('ko');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * GPT 응답에서 "###COMMAND###" 이후의 JSON 데이터를 추출하는 함수
 */
const extractCommandData = (gptReply) => {
    const delimiter = "###COMMAND###";
    const index = gptReply.indexOf(delimiter);
    if (index === -1) {
        throw new Error("GPT 응답에 '###COMMAND###' 구분자가 없습니다.");
    }
    const jsonPart = gptReply.substring(index + delimiter.length).trim();
    try {
        return JSON.parse(jsonPart);
    } catch (error) {
        throw new Error("GPT 응답의 JSON 부분 파싱 실패: " + error.message);
    }
};

/**
 * 채팅 메시지 전송 엔드포인트
 */
router.post('/send-message2', async (req, res) => {
    const { senderId, message } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!message || !senderId || !token) {
        return res.status(400).json({ error: "Message, senderId, and token are required." });
    }

    try {
        // 토큰 검증 및 사용자 이메일 추출
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // 시스템 프롬프트와 사용자 메시지를 포함하여 GPT 모델에 전달할 메시지 배열 구성
        const messagesForModel = [
            {
                role: "system",
                content:
                    "당신의 응답은 반드시 두 부분으로 구성되어야 합니다. 첫 번째 부분은 사용자가 보게 될 자연어 응답이며, 두 번째 부분은 일정 관리 커맨드로, JSON 형식이어야 합니다. 이 두 부분은 반드시 '###COMMAND###'라는 구분자로 나눠서 출력하세요."
            },
            {
                role: "user",
                content: message
            }
        ];

        // 파인튜닝된 GPT 모델 호출
        const response = await openai.chat.completions.create({
            model: "ft:gpt-4o-mini-2024-07-18:personal:chanhyukbot:BBbVXd3Z",
            messages: messagesForModel,
            max_tokens: 300,
            temperature: 0.5,
        });

        const gptReply = response.choices[0]?.message?.content?.trim();
        if (!gptReply) {
            return res.status(500).json({ error: "GPT 응답이 없습니다." });
        }

        // 자연어 응답과 command 부분 분리
        const delimiter = "###COMMAND###";
        const delimiterIndex = gptReply.indexOf(delimiter);
        if (delimiterIndex === -1) {
            return res.status(500).json({ error: "GPT 응답에 '###COMMAND###' 구분자가 없습니다." });
        }
        const naturalResponse = gptReply.substring(0, delimiterIndex).trim();
        let commandData;
        try {
            commandData = JSON.parse(gptReply.substring(delimiterIndex + delimiter.length).trim());
        } catch (error) {
            return res.status(500).json({ error: "GPT 응답의 JSON 부분을 파싱할 수 없습니다.", details: error.message });
        }

        // start_date/end_date가 반환되면 date/end_time로 재할당
        if (commandData.start_date && !commandData.date) {
            commandData.date = commandData.start_date;
        }
        if (commandData.end_date && !commandData.end_time) {
            commandData.end_time = commandData.end_date;
        }

        // 사용자 이메일 추가
        commandData.userEmail = decodedToken.email;

        // 각 action별로 필수 입력값 체크 후 DB 작업 호출
        let dbResult;
        switch (commandData.action) {
            case "생성":
                if (!commandData.date || !commandData.title || !commandData.start_time || !commandData.end_time) {
                    return res.status(400).json({ error: "생성 작업에 필요한 필수 입력값이 누락되었습니다.", commandData });
                }
                dbResult = await plannerController.createPlanner({
                    start_day: commandData.date,
                    end_day: commandData.date,
                    title: commandData.title,
                    start_time: commandData.start_time,
                    end_time: commandData.end_time,
                    userEmail: commandData.userEmail
                });
                break;
            case "조회":
                if (!commandData.date) {
                    return res.status(400).json({ error: "조회 작업에 필요한 날짜 값이 누락되었습니다.", commandData });
                }
                dbResult = await plannerController.getPlannersByDate({
                    query: { date: commandData.date },
                    user: { email: commandData.userEmail }
                });
                break;
            case "수정":
                if (!commandData.id || !commandData.date || !commandData.title || !commandData.start_time || !commandData.end_time) {
                    return res.status(400).json({ error: "수정 작업에 필요한 필수 입력값이 누락되었습니다.", commandData });
                }
                dbResult = await plannerController.updatePlannerById({
                    params: { id: commandData.id },
                    body: {
                        start_day: commandData.date,
                        end_day: commandData.date,
                        title: commandData.title,
                        start_time: commandData.start_time,
                        end_time: commandData.end_time,
                        memo: commandData.memo,
                        notification: commandData.notification,
                        repeat: commandData.repeat,
                        check_box: commandData.check_box,
                        url: commandData.url
                    },
                    user: { email: commandData.userEmail }
                });
                break;
            case "삭제":
                // 삭제 작업: id가 없으면 해당 날짜와 제목으로 검색하여 보완
                if (!commandData.id) {
                    const planners = await plannerController.getPlannersByDate({
                        query: { date: commandData.date },
                        user: { email: commandData.userEmail }
                    });
                    const targetPlanner = planners.find(planner => planner.title === commandData.title);
                    if (!targetPlanner) {
                        return res.status(400).json({ error: "삭제할 일정을 찾을 수 없습니다.", commandData });
                    }
                    commandData.id = targetPlanner.id;
                }
                dbResult = await plannerController.deletePlannerById({
                    params: { id: commandData.id },
                    user: { email: commandData.userEmail }
                });
                break;
            case "월간 조회":
                if (!commandData.date) {
                    return res.status(400).json({ error: "월간 조회에 필요한 날짜 값이 누락되었습니다.", commandData });
                }
                const [year, month] = commandData.date.split('-');
                dbResult = await plannerController.getPlannersByMonth({
                    query: { year, month },
                    user: { email: commandData.userEmail }
                });
                break;
            default:
                return res.status(400).json({ error: "알 수 없는 요청 유형입니다.", commandData });
        }

        // 조회 작업의 경우, DB 결과 목록을 자연어 목록으로 포맷팅
        let finalResponse;
        if (commandData.action === "조회" && Array.isArray(dbResult)) {
            const formattedPlanners = dbResult.map((planner, index) =>
                `${index + 1}. ${planner.start_time} ~ ${planner.end_time}: ${planner.title}`
            ).join('\n');
            finalResponse = `${naturalResponse}\n${formattedPlanners}`;
        } else {
            finalResponse = naturalResponse;
        }

        return res.status(200).json({
            parsedCommand: commandData,
            dbResult,
            finalResponse
        });
    } catch (error) {
        console.error("서버 오류:", error);
        return res.status(500).json({ error: "서버 오류가 발생했습니다.", details: error.message });
    }
});


/**
 * @swagger
 * /chat/send-message2:
 *   post:
 *     summary: 채팅 메시지 전송 및 일정 관리
 *     description: 사용자의 채팅 메시지를 받아, 파인튜닝된 GPT 모델이 생성한 자연어 응답과 '###COMMAND###' 구분자 이후의 JSON 커맨드를 이용해
 *                  데이터베이스에 일정 관련 작업(생성, 조회, 수정, 삭제, 월간 조회)을 수행합니다.
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               conversationId:
 *                 type: string
 *                 description: "대화방 고유 ID"
 *               senderId:
 *                 type: string
 *                 description: "사용자 ID"
 *               message:
 *                 type: string
 *                 description: "메시지 내용"
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "대화에 참여한 사용자 목록"
 *     responses:
 *       200:
 *         description: 메시지 처리 성공, GPT 응답과 DB 작업 결과 반환
 *       500:
 *         description: 서버 오류
 */
module.exports = router;
