-- 데이터베이스가 없으면 생성
CREATE DATABASE IF NOT EXISTS plannie;
USE plannie;

-- User 테이블 생성
CREATE TABLE IF NOT EXISTS User (
                                    email VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    birth DATE NOT NULL,
    profileimg VARCHAR(255) DEFAULT NULL,
    phone VARCHAR(15) DEFAULT NULL,
    gender VARCHAR(10) DEFAULT NULL,
    address TEXT DEFAULT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

-- Planner 테이블 생성
CREATE TABLE IF NOT EXISTS `Planner` (
                                         `id` INTEGER NOT NULL auto_increment,
                                         `start_day` DATE NOT NULL,
                                         `end_day` DATE,
                                         `title` VARCHAR(255) NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `memo` TEXT DEFAULT NULL,
    `notification` ENUM('안 함', '5분 전', '10분 전', '15분 전', '30분 전', '1시간 전', '2시간 전', '1일 전', '2일 전') NOT NULL DEFAULT '안 함',
    `repeat` ENUM('안 함', '월', '화', '수', '목', '금', '토', '일') NOT NULL DEFAULT '안 함',
    `check_box` TINYINT(1) DEFAULT 0,
    `url` VARCHAR(255) DEFAULT NULL,
    `userEmail` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`)
    ) ENGINE=InnoDB;

