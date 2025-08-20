// routes/index.js
var express = require('express');
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Main
 *   description: 플래니 앱의 메인 페이지
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: 메인 페이지 조회
 *     tags: [Main]
 *     responses:
 *       200:
 *         description: 메인 페이지에 대한 응답 메시지
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello, this is the main page of your plannie.
 */
router.get('/', function(req, res, next) {
  res.send('Hello, this is the main page of your plannie.');
});

module.exports = router;
