// routes/planner.js
const express = require('express');
const router = express.Router();
const plannerController = require('../controllers/plannerController');
const authenticateToken = require('../middlewares/authMiddleware');

router.use(authenticateToken); // 모든 플래너 라우트에 인증 미들웨어 적용

/**
 * @swagger
 * tags:
 *   name: Planner
 *   description: 일정 관리 API
 */

router.get('/monthly', plannerController.getPlannersByMonth);

/**
 * @swagger
 * /planner/date:
 *   get:
 *     summary: 특정 날짜의 모든 일정 조회
 *     description: 지정된 날짜의 모든 일정을 조회합니다.
 *     tags: [Planner]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         required: true
 *         description: 조회할 날짜 (YYYY.MM.DD 형식)
 *         example: "2024.11.04"
 *     responses:
 *       200:
 *         description: 성공적으로 조회된 일정 목록
 *       400:
 *         description: 날짜 형식이 유효하지 않을 경우
 *       500:
 *         description: 서버 오류
 */
router.get('/date', plannerController.getPlannersByDate);

/**
 * @swagger
 * /planner/{id}:
 *   get:
 *     summary: 특정 ID의 일정 조회
 *     description: 특정 일정 ID로 일정을 조회합니다.
 *     tags: [Planner]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 조회할 일정의 ID
 *     responses:
 *       200:
 *         description: 성공적으로 조회된 일정
 *       404:
 *         description: 일정을 찾을 수 없을 때
 *       500:
 *         description: 서버 오류
 */
router.get('/:id', plannerController.getPlannerById);

/**
 * @swagger
 * /planner/add:
 *   post:
 *     summary: 새로운 일정 생성
 *     description: 새로운 일정을 추가합니다.
 *     tags: [Planner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 일정 제목
 *               start_day:
 *                 type: string
 *                 description: 시작 날짜 (YYYY.MM.DD 형식)
 *               end_day:
 *                 type: string
 *                 description: 종료 날짜 (YYYY.MM.DD 형식)
 *               start_time:
 *                 type: string
 *                 description: 시작 시간 (HH:MM:SS 형식)
 *               end_time:
 *                 type: string
 *                 description: 종료 시간 (HH:MM:SS 형식)
 *               memo:
 *                 type: string
 *                 description: 메모
 *               notification:
 *                 type: string
 *                 enum: ["안 함", "5분 전", "10분 전", "15분 전", "30분 전", "1시간 전", "2시간 전", "1일 전", "2일 전"]
 *                 description: 알림 여부
 *               repeat:
 *                 type: string
 *                 enum: ["안 함", "월", "화", "수", "목", "금", "토", "일"]
 *                 description: 반복 여부
 *               check_box:
 *                 type: boolean
 *                 description: 체크박스
 *               url:
 *                 type: string
 *                 description: URL 링크
 *     responses:
 *       201:
 *         description: 일정이 성공적으로 생성됨
 *       400:
 *         description: 유효하지 않은 날짜 형식일 경우
 *       500:
 *         description: 서버 오류
 */
router.post('/add', plannerController.createPlanner);

/**
 * @swagger
 * /planner/{id}:
 *   put:
 *     summary: 특정 ID의 일정 수정
 *     description: 특정 일정 ID로 일정을 수정합니다.
 *     tags: [Planner]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 수정할 일정의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 일정 제목
 *               start_day:
 *                 type: string
 *                 description: 시작 날짜 (YYYY.MM.DD 형식)
 *               end_day:
 *                 type: string
 *                 description: 종료 날짜 (YYYY.MM.DD 형식)
 *               start_time:
 *                 type: string
 *                 description: 시작 시간 (HH:MM:SS 형식)
 *               end_time:
 *                 type: string
 *                 description: 종료 시간 (HH:MM:SS 형식)
 *               memo:
 *                 type: string
 *                 description: 메모
 *               notification:
 *                 type: string
 *                 enum: ["안 함", "5분 전", "10분 전", "15분 전", "30분 전", "1시간 전", "2시간 전", "1일 전", "2일 전"]
 *                 description: 알림 여부
 *               repeat:
 *                 type: string
 *                 enum: ["안 함", "월", "화", "수", "목", "금", "토", "일"]
 *                 description: 반복 여부
 *               check_box:
 *                 type: boolean
 *                 description: 체크박스
 *               url:
 *                 type: string
 *                 description: URL 링크
 *     responses:
 *       200:
 *         description: 일정이 성공적으로 수정됨
 *       404:
 *         description: 수정할 일정을 찾지 못함
 *       500:
 *         description: 서버 오류
 */
router.put('/:id', plannerController.updatePlannerById);

/**
 * @swagger
 * /planner/{id}:
 *   delete:
 *     summary: 특정 ID의 일정 삭제
 *     description: 특정 일정 ID로 일정을 삭제합니다.
 *     tags: [Planner]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 삭제할 일정의 ID
 *     responses:
 *       200:
 *         description: 일정이 성공적으로 삭제됨
 *       404:
 *         description: 삭제할 일정을 찾지 못함
 *       500:
 *         description: 서버 오류
 */
router.delete('/:id', plannerController.deletePlannerById);



module.exports = router;
