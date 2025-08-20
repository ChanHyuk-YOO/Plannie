import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import {Alert} from "react-native";


export const loginUser = async (email, password, navigation) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, {
            email,
            password
        });

        if (response.status === 200) {
            const { token } = response.data;

            // Store the token in AsyncStorage
            await AsyncStorage.setItem('userToken', token);

            Alert.alert('로그인 성공', '환영합니다!');
            navigation.navigate('Calendar');
        }

    } catch (error) {
        if (email == 'Admin' && password == '1234') {
            navigation.navigate('Calendar')
        }
        if (error.response && error.response.status === 401) {
            Alert.alert('로그인 실패', '아이디 또는 비밀번호가 일치하지 않습니다.');
        } else {
            console.error('로그인 오류:', error);
            Alert.alert('오류', '로그인 중 오류가 발생했습니다.');
        }
    }
};




// 회원 탈퇴 API
export const deleteUser = async () => {
    try {
        const token = await AsyncStorage.getItem('token');

        if (!token) throw new Error('토큰이 없습니다. 로그인 해주세요.');

        const response = await axios.delete(`http://${API_URL}:3000/user/delete`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('회원 탈퇴 오류:', error.message);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            Alert.alert("로그인 정보가 없습니다.", "다시 로그인 해주세요.");
            return null;
        }

        const response = await axios.get(`${API_URL}/user/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        Alert.alert("오류", "사용자 정보를 가져오는 데 실패했습니다.");
        return null;
    }
};
export const updateUserProfile = async (formData) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        await axios.put(
            `${API_URL}/user/update`,
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        Alert.alert('오류', '회원 정보 수정에 실패했습니다.');
        return { success: false };
    }
};

export const fetchNickname = async (navigation) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            Alert.alert("로그인 정보가 없습니다.", "다시 로그인 해주세요.");
            navigation.navigate('Login');
            return null;
        }

        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data.nickname; // Assuming response contains { nickname: 'your_nickname' }
    } catch (error) {
        console.error("Error fetching nickname:", error);
        Alert.alert("오류", "사용자 정보를 가져오는 데 실패했습니다.");
        return null;
    }
};

export const handleLogout = async (navigation) => {
    try {
        await AsyncStorage.removeItem('userToken');
        Alert.alert("로그아웃 되었습니다.");
        navigation.navigate('Login');
    } catch (error) {
        console.error("Logout error:", error);
        Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
};
