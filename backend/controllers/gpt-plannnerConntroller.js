const { DataTypes, Op } = require('sequelize');
const sequelize = require('../config/database');
const moment = require('moment');
moment.locale('ko');

const Planner = require('../models/Planner');

const validNotifications = ["안 함", "5분 전", "10분 전", "15분 전", "30분 전", "1시간 전", "2시간 전", "1일 전", "2일 전"];
const validRepeats = ["안 함", "월", "화", "수", "목", "금", "토", "일"];

exports.createPlanner = async (data) => {
    try {
        const { start_day, end_day, title, start_time, end_time, userEmail } = data;

        // 필수 데이터 체크
        if (!title || !start_day || !start_time || !end_time || !userEmail) {
            return { error: "필수 입력값이 누락되었습니다. (제목, 시작일, 시작 시간, 종료 시간, 사용자 이메일)" };
        }

        // 입력 날짜는 "YYYY-MM-DD" 형식으로 전달받았으므로, 모델의 setter가 기대하는 "YYYY.MM.DD" 형식으로 변환
        const formattedStartDay = moment(start_day, 'YYYY-MM-DD').format('YYYY.MM.DD');
        const formattedEndDay = end_day ? moment(end_day, 'YYYY-MM-DD').format('YYYY.MM.DD') : null;

        const newPlanner = await Planner.create({
            start_day: formattedStartDay,
            end_day: formattedEndDay,
            title,
            start_time,
            end_time,
            userEmail
        });

        console.log("생성된 일정 데이터:", newPlanner);
        return {
            action: '생성',
            date: moment(newPlanner.start_day, 'YYYY.MM.DD').format('YYYY-MM-DD'),
            start_time,
            end_time,
            title,
            id: newPlanner.id  // 생성된 일정의 id 포함
        };
    } catch (error) {
        console.error("일정 생성 오류:", error.message);
        return { error: "일정 생성 중 오류가 발생했습니다.", details: error.message };
    }
};

exports.getPlannersByDate = async (req) => {
    const date = req.query?.date || req.date;
    const userEmail = req.user?.email || req.userEmail;
    try {
        // 필수 데이터 체크
        if (!date || !userEmail) {
            return { error: '필수 입력값(날짜, 사용자 이메일)이 누락되었습니다.' };
        }
        const parsedDate = moment(date, 'YYYY-MM-DD', true);
        if (!parsedDate.isValid()) {
            return { error: '올바른 날짜 형식이 아닙니다. YYYY-MM-DD 형식으로 입력하세요.' };
        }
        const planners = await Planner.findAll({
            // DB에는 날짜가 "YYYY.MM.DD" 형식으로 저장됨
            where: {
                start_day: parsedDate.format('YYYY.MM.DD'),
                userEmail
            },
            order: [['start_time', 'ASC']]
        });
        console.log("조회된 일정 데이터:", planners);
        return planners;
    } catch (error) {
        console.error("일정 조회 중 오류 발생:", error.message);
        return { error: "일정 조회 중 오류가 발생했습니다.", details: error.message };
    }
};

exports.getPlannerById = async (req) => {
    const { id } = req.params;
    const userEmail = req.user?.email;
    try {
        // 필수 데이터 체크
        if (!id || !userEmail) {
            return { message: "필수 입력값(일정 ID, 사용자 이메일)이 누락되었습니다." };
        }
        const planner = await Planner.findOne({ where: { id, userEmail } });
        if (planner) {
            return {
                action: '조회',
                date: planner.start_day,
                time: `${planner.start_time} ~ ${planner.end_time}`,
                description: planner.title
            };
        } else {
            return { message: "일정을 찾을 수 없습니다." };
        }
    } catch (error) {
        console.error("일정 ID 조회 오류 발생:", error.message);
        return { message: "일정 조회 중 오류가 발생했습니다.", error: error.message };
    }
};

exports.updatePlannerById = async (req) => {
    const { id } = req.params;
    const { start_day, end_day, title, start_time, end_time, memo, notification, repeat, check_box, url } = req.body;
    try {
        // 필수 데이터 체크: id, 제목, 시작일, 시작 시간, 종료 시간
        if (!id || !title || !start_day || !start_time || !end_time) {
            return { message: "필수 입력값이 누락되었습니다. (일정 ID, 제목, 시작일, 시작 시간, 종료 시간)" };
        }
        const planner = await Planner.findOne({ where: { id, userEmail: req.user.email } });
        if (!planner) {
            return { message: "일정을 찾을 수 없습니다." };
        }
        // 입력 날짜 변환: "YYYY-MM-DD" -> "YYYY.MM.DD"
        const formattedStartDay = moment(start_day, 'YYYY-MM-DD').format('YYYY.MM.DD');
        const formattedEndDay = end_day ? moment(end_day, 'YYYY-MM-DD').format('YYYY.MM.DD') : null;

        const notificationValue = validNotifications.includes(notification) ? notification : "안 함";
        const repeatValue = validRepeats.includes(repeat) ? repeat : "안 함";

        await planner.update({
            start_day: formattedStartDay,
            end_day: formattedEndDay || planner.end_day,
            title,
            start_time,
            end_time,
            memo,
            notification: notificationValue,
            repeat: repeatValue,
            check_box,
            url
        });

        return {
            action: '수정',
            date: planner.start_day,
            time: `${planner.start_time} ~ ${planner.end_time}`,
            description: title
        };
    } catch (error) {
        console.error("일정 수정 중 오류 발생:", error.message);
        return { message: "일정 수정 중 오류가 발생했습니다.", error: error.message };
    }
};

exports.deletePlannerById = async (req) => {
    const { id } = req.params;
    const userEmail = req.user?.email;
    try {
        // 필수 데이터 체크
        if (!id || !userEmail) {
            return { message: "필수 입력값(일정 ID, 사용자 이메일)이 누락되었습니다." };
        }
        const planner = await Planner.findOne({ where: { id, userEmail } });
        if (!planner) {
            return { message: "일정을 찾을 수 없습니다." };
        }
        await planner.destroy();
        return {
            action: '삭제',
            date: planner.start_day,
            description: planner.title
        };
    } catch (error) {
        console.error("일정 삭제 중 오류 발생:", error.message);
        return { message: "일정 삭제 중 오류가 발생했습니다.", error: error.message };
    }
};

exports.getPlannersByMonth = async (req) => {
    const { year, month } = req.query;
    const userEmail = req.user?.email || null;
    try {
        // 필수 데이터 체크
        if (!year || !month || !userEmail) {
            return { error: '필수 입력값(년도, 월, 사용자 이메일)이 누락되었습니다.' };
        }
        if (!moment(`${year}-${month}`, 'YYYY-MM', true).isValid()) {
            return { error: '올바른 년도 및 월 형식이 아닙니다. YYYY와 MM 형식으로 입력하세요.' };
        }
        const startOfMonth = moment(`${year}-${month}`, 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment(`${year}-${month}`, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');

        // DB에 저장된 날짜는 "YYYY.MM.DD" 형식이므로, 비교를 위해 변환
        const startCompare = startOfMonth.replace(/-/g, '.');
        const endCompare = endOfMonth.replace(/-/g, '.');

        const planners = await Planner.findAll({
            where: {
                start_day: { [Op.between]: [startCompare, endCompare] },
                userEmail
            },
            order: [['start_day', 'ASC'], ['start_time', 'ASC']]
        });
        if (planners.length > 0) {
            return planners.map(planner => ({
                action: '조회',
                date: planner.start_day,
                time: `${planner.start_time} ~ ${planner.end_time}`,
                description: planner.title,
                id: planner.id
            }));
        } else {
            return { message: '해당 월에 일정이 없습니다.' };
        }
    } catch (error) {
        console.error("월간 일정 조회 중 오류 발생:", error.message);
        return { message: "월간 일정 조회 중 오류가 발생했습니다.", error: error.message };
    }
};
