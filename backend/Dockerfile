# Node.js 이미지를 기반으로 합니다.
FROM node:16.9.0

# 앱 디렉토리 생성
WORKDIR /usr/src/app

# 패키지 설치
COPY package*.json ./

# 모든 패키지 설치 (bcryptjs 포함)
RUN npm install

# 앱 소스 복사
COPY . .

# 서버를 실행할 포트 설정
EXPOSE 3000

# 앱 실행 명령어
CMD [ "node", "app.js" ]

