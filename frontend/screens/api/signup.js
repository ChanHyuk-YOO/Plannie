// api/userApi.js
import axios from 'axios';
import { API_URL } from '@env';

export const checkEmailAvailability = async (email) => {
    try {
        const response = await axios.get(`http://${API_URL}/users/check/${email.toLowerCase()}`);

        if (response.status === 200) {
            // 이메일이 이미 존재하는 경우
            return { available: false, message: '이미 사용 중인 이메일입니다.' };
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // 이메일이 사용 가능할 경우
            return { available: true };
        } else {
            // 다른 오류 발생
            const errorMessage = error.response?.data?.message || '이메일 중복 확인 중 오류가 발생했습니다.';
            console.error('이메일 중복 확인 오류:', error);
            return { available: false, message: errorMessage };
        }
    }
};
export const signUpUser = async ({ email, password, nickname, name, phone, selectedAddress, birthdate, selectedGender }) => {
    try {
        const response = await axios.post(
            `http://${API_URL}/signup`,
            {
                email,
                password,
                nickname,
                name,
                phone,
                address: selectedAddress,
                birth: birthdate,
                gender: selectedGender,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (response.status === 201) {
            return { success: true, message: response.data.message };
        }
    } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.error === '이미 등록된 이메일입니다.') {
            return { success: false, error: '이미 사용 중인 이메일입니다.' };
        } else {
            console.error('회원가입 오류:', error);
            return { success: false, error: '회원가입 중 알 수 없는 오류가 발생했습니다.' };
        }
    }
};
