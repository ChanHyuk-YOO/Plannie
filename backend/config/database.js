// config/database.js
const { Sequelize } = require('sequelize');

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,  // DB 호스트
    port: process.env.DB_PORT,  // DB 포트
    dialect: 'mariadb',
    dialectOptions: {
        timezone: '+09:00'  // 한국 시간 (KST)
    },
    logging: console.log,       // SQL 로그 출력
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,        // 최대 연결 시간
        idle: 10000            // 연결 유지 시간
    },
    define: {
        freezeTableName: true, // 테이블 이름 복수화 방지
        timestamps: true       // createdAt, updatedAt 자동 추가
    }
});

module.exports = sequelize;
