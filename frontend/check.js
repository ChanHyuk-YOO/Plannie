import { updateUserProfile } from './api_user.js';

// 테스트 호출
const testUserData = {
    password: 'newpassword123',
    nickname: 'newnickname',
    phone: '123-456-7890'
};

updateUserProfile(testUserData).then(response => {
    console.log('API 응답:', response);
}).catch(error => {
    console.error('API 요청 오류:', error);
});
