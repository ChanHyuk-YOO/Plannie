const Planner = require('../models/Planner');
const moment = require('moment');
const { Op } = require("sequelize");
moment.locale('ko'); // 로케일 설정

// 유효한 ENUM 값 설정
const validNotifications = ["안 함", "5분 전", "10분 전", "15분 전", "30분 전", "1시간 전", "2시간 전", "1일 전", "2일 전"];
const validRepeats = ["안 함", "월", "화", "수", "목", "금", "토", "일"];

exports.createPlanner = async (req, res) => {
    const { start_day, end_day, title, start_time, end_time, memo } = req.body;
    const user = req.user; // 인증 미들웨어에서 가져온 사용자 정보 사용

    try {
        const newPlanner = await Planner.create({
            start_day,
            end_day,
            title,
            start_time,
            end_time,
            memo,
            userEmail: user.email,
        });
        // 소켓 인스턴스 가져오기 (app에 등록해 둔 socket.io)
        const io = req.app.get('socketio');
        io.emit('newSchedule', newPlanner); // 모든 클라이언트에 새 일정 전달

        res.status(201).json({ message: "일정이 성공적으로 생성되었습니다.", data: newPlanner });
    } catch (error) {
        console.error("일정 생성 오류:", error);
        res.status(500).json({ message: "일정 생성 중 오류가 발생했습니다.", error: error.message });
    }
};


// 특정 날짜의 일정 조회 로직 함수 (웹소켓 등에서 재사용 가능)
// userEmail은 클라이언트가 인증된 경우 전달받아 사용합니다.
exports.getPlannersByDateLogic = async (date, userEmail) => {
    const parsedDate = moment(date, 'YYYY.MM.DD', true);
    if (!parsedDate.isValid()) {
        throw new Error('올바른 날짜 형식이 아닙니다. YYYY.MM.DD 형식으로 입력하세요.');
    }
    const planners = await Planner.findAll({
        where: {
            start_day: parsedDate.format('YYYY-MM-DD'),
            userEmail
        },
        order: [['start_time', 'ASC']]
    });
    return planners;
};

// Express 라우터에서 사용하는 특정 날짜의 일정 조회 컨트롤러
exports.getPlannersByDate = async (req, res) => {
    const { date } = req.query;
    const userEmail = req.user.email;

    try {
        const planners = await exports.getPlannersByDateLogic(date, userEmail);
        res.status(200).json(planners.length > 0 ? planners : { message: '해당 날짜에 일정이 없습니다.' });
    } catch (error) {
        console.error("일정 조회 중 오류 발생:", error.message, error.stack);
        res.status(400).json({ error: error.message });
    }
};

// 특정 ID의 일정을 조회하는 컨트롤러
exports.getPlannerById = async (req, res) => {
    const { id } = req.params;

    try {
        const planner = await Planner.findOne({ where: { id, userEmail: req.user.email } });
        if (planner) {
            res.status(200).json(planner);
        } else {
            res.status(404).json({ message: "일정을 찾을 수 없습니다." });
        }
    } catch (error) {
        console.error("일정 ID 조회 오류 발생:", error);
        res.status(500).json({ message: "일정 조회 중 오류가 발생했습니다." });
    }
};

// 일정 수정 컨트롤러
exports.updatePlannerById = async (req, res) => {
    const { id } = req.params;
    const {
        start_day,
        end_day,
        title,
        start_time,
        end_time,
        memo,
        notification,
        repeat,
        check_box,
        url
    } = req.body;

    try {
        const planner = await Planner.findOne({ where: { id, userEmail: req.user.email } });
        if (!planner) {
            return res.status(404).json({ message: "일정을 찾을 수 없습니다." });
        }

        // 날짜 형식 검사
        const parsedStartDay = start_day ? moment(start_day, 'YYYY.MM.DD', true) : null;
        const parsedEndDay = end_day ? moment(end_day, 'YYYY.MM.DD', true) : null;
        if (parsedStartDay && !parsedStartDay.isValid()) {
            return res.status(400).json({ error: '올바른 시작 날짜 형식이 아닙니다. YYYY.MM.DD 형식으로 입력하세요.' });
        }
        if (parsedEndDay && !parsedEndDay.isValid()) {
            return res.status(400).json({ error: '올바른 종료 날짜 형식이 아닙니다. YYYY.MM.DD 형식으로 입력하세요.' });
        }

        // ENUM 값 유효성 검사
        const notificationValue = validNotifications.includes(notification) ? notification : "안 함";
        const repeatValue = validRepeats.includes(repeat) ? repeat : "안 함";

        await planner.update({
            start_day: parsedStartDay ? parsedStartDay.format('YYYY-MM-DD') : planner.start_day,
            end_day: parsedEndDay ? parsedEndDay.format('YYYY-MM-DD') : planner.end_day,
            title,
            start_time,
            end_time,
            memo,
            notification: notificationValue,
            repeat: repeatValue,
            check_box,
            url
        });

        res.status(200).json({ message: "일정이 수정되었습니다." });
    } catch (error) {
        console.error("일정 수정 중 오류 발생:", error);
        res.status(500).json({ message: "일정 수정 중 오류가 발생했습니다." });
    }
};
exports.deletePlannerById = async (req, res) => {
    const { id } = req.params;

    try {
        const planner = await Planner.findOne({ where: { id, userEmail: req.user.email } });
        if (!planner) {
            return res.status(404).json({ message: "일정을 찾을 수 없습니다." });
        }

        await planner.destroy();

        // 소켓 인스턴스 가져오기 (app에 등록된 socket.io)
        const io = req.app.get('socketio');
        // 삭제된 일정의 id를 포함하여 이벤트 발송
        io.emit('deleteSchedule', { id });

        res.status(200).json({ message: "일정이 삭제되었습니다." });
    } catch (error) {
        console.error("일정 삭제 중 오류 발생:", error);
        res.status(500).json({ message: "일정 삭제 중 오류가 발생했습니다." });
    }
};

// 특정 년도와 월에 대한 일정 조회 컨트롤러
exports.getPlannersByMonth = async (req, res) => {
    const { year, month } = req.query;
    const userEmail = req.user ? req.user.email : null;
    console.log("User Email:", userEmail);

    try {
        // 년도와 월의 유효성 검사
        if (!year || !month || !moment(`${year}-${month}`, 'YYYY-MM').isValid()) {
            return res.status(400).json({ error: '올바른 년도 및 월 형식이 아닙니다. YYYY와 MM 형식으로 입력하세요.' });
        }

        // 해당 월의 첫날과 마지막 날 계산
        const startOfMonth = moment(`${year}-${month}`, 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(`${year}-${month}`, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');

        // 데이터베이스에서 해당 월에 해당하는 일정 조회
        const planners = await Planner.findAll({
            where: {
                start_day: {
                    [Op.between]: [startOfMonth, endOfMonth],
                },
                userEmail
            },
            order: [['start_day', 'ASC'], ['start_time', 'ASC']]
        });

        res.status(200).json(planners.length > 0 ? planners : { message: '해당 월에 일정이 없습니다.' });
    } catch (error) {
        console.error("월간 일정 조회 중 오류 발생:", error.message, error.stack);
        res.status(500).json({ message: "월간 일정 조회 중 오류가 발생했습니다.", error: error.message });
    }
};
