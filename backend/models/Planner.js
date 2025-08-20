const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const moment = require('moment');

const Planner = sequelize.define('Planner', {
    start_day: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('start_day');
            return rawValue ? moment(rawValue).format('YYYY.MM.DD') : null;
        },
        set(value) {
            this.setDataValue('start_day', moment(value, 'YYYY.MM.DD').format('YYYY-MM-DD'));
        }
    },
    end_day: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('end_day');
            return rawValue ? moment(rawValue).format('YYYY.MM.DD') : null;
        },
        set(value) {
            this.setDataValue('end_day', moment(value, 'YYYY.MM.DD').format('YYYY-MM-DD'));
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIME')
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIME + INTERVAL 1 HOUR')
    },
    memo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notification: {
        type: DataTypes.ENUM('안 함', '5분 전', '10분 전', '15분 전', '30분 전', '1시간 전', '2시간 전', '1일 전', '2일 전'),
        allowNull: false,
        defaultValue: '안 함'
    },
    repeat: {
        type: DataTypes.ENUM('안 함', '월', '화', '수', '목', '금', '토', '일'),
        allowNull: false,
        defaultValue: '안 함'
    },
    check_box: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false // createdAt 및 updatedAt 비활성화
});


module.exports = Planner;
