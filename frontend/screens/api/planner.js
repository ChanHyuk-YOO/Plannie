import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { API_URL } from '@env';
import moment from "moment";
export const fetchMonthSchedules = async (year, month) => {
    // 년도와 월 형식이 올바른지 검증
    if (!year || !month || isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        Alert.alert("Invalid date format", "Please enter a valid year and month.");
        return [];
    }

    // 월을 두 자리 문자열로 변환 (예: 3 -> "03")
    const formattedMonth = month.toString().padStart(2, '0');

    try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            Alert.alert("Authentication required", "Please log in.");
            return [];
        }

        // API 요청: Authorization 헤더와 쿼리 파라미터로 년도와 두 자리 형식의 월 전송
        const response = await axios.get(`${API_URL}/planner/monthly`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { year, month: formattedMonth }
        });

        // 데이터 확인 후 반환
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Failed to fetch schedules:", error);
        Alert.alert("Error", "Failed to fetch schedules. Please try again later.");
        return [];
    }
};


export const updateCheckboxStatus = async (scheduleId, currentCheckBoxState) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        await axios.put(
            `${API_URL}/planner/${scheduleId}`,
            { check_box: !currentCheckBoxState },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return true;
    } catch (error) {
        console.error("Failed to update schedule:", error);
        Alert.alert("오류", "일정 상태 업데이트에 실패했습니다.");
        return false;
    }
};

// fetchSchedulesByDate 함수에서 데이터 확인용 로그 추가
export const fetchSchedulesByDate = async (apiDate) => {
    if (!apiDate) return [];

    try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`${API_URL}/planner/date/?date=${apiDate}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Schedules fetched:", response.data); // 데이터 확인
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        if (error.response && error.response.status === 404) {
            Alert.alert("알림", "해당 날짜에 일정이 없습니다.");
            return [];
        } else {
            console.error("일정 가져오기 오류:", error);
            Alert.alert("오류", "일정을 불러오는 데 실패했습니다.");
            return [];
        }
    }
};

export const createSchedule = async ({
                                         selectedDate,
                                         title,
                                         startTime,
                                         endTime,
                                         memo,
                                         notification,
                                         repeat,
                                         url,
                                         closeModal,
                                     }) => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    const formattedStartTime = moment(startTime).format("HH:mm");
    const formattedEndTime = moment(endTime).format("HH:mm");

    try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await axios.post(
            `${API_URL}/planner/add`,
            {
                start_day: formattedDate,
                end_day: formattedDate,
                title,
                start_time: formattedStartTime,
                end_time: formattedEndTime,
                memo,
                notification,
                repeat,
                check_box: false,
                url,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (response.status === 201 || response.status === 200) {
            Alert.alert("성공", "일정이 생성되었습니다.");
            closeModal();
        } else {
            console.warn("응답 상태 코드:", response.status); // 디버그용
            Alert.alert("오류", "일정 생성에 실패했습니다.");
        }
    } catch (error) {
        console.error("일정 생성 오류:", error);
        Alert.alert("오류", "일정 생성에 실패했습니다.");
    }
};
