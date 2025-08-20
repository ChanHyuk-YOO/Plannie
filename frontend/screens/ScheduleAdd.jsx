import * as React from "react";
import { Text, View, TouchableOpacity, Image, Modal, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "../Styles/ScheduleAddStyles";
import ScheduleCreate from "./ScheduleCreate";
import { fetchSchedulesByDate, updateCheckboxStatus } from "./api/planner";
import io from "socket.io-client"; // 웹소켓 클라이언트 임포트

const ScheduleAdd = ({ selectedDate }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [schedules, setSchedules] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // 선택한 날짜를 "YYYY-MM-DD" 형식으로 변환
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
    // API에서는 "YYYY.MM.DD" 형식으로 필요할 경우 변환
    const apiDate = selectedDate ? new Date(selectedDate).toISOString().split('T')[0].replace(/-/g, '.') : '';

    // 해당 날짜의 일정 목록을 API로 가져오기
    React.useEffect(() => {
        const fetchAndSetSchedules = async () => {
            setLoading(true);
            const data = await fetchSchedulesByDate(apiDate);
            setSchedules(data);
            setLoading(false);
        };
        if(apiDate) {
            fetchAndSetSchedules();
        }
    }, [apiDate]);

    // 웹소켓 연결: 새 일정 및 삭제된 일정 이벤트 수신
    React.useEffect(() => {
        const socket = io("http://localhost:3000", {
            transports: ['polling', 'websocket'],
            path: '/socket.io'
        });

        socket.on("connect", () => {
            console.log("Socket.IO 서버에 연결됨:", socket.id);
        });

        // 새 일정이 등록되었을 때 처리 (날짜 일치하는 경우 추가)
        socket.on("newSchedule", (newSchedule) => {
            if (formattedDate && newSchedule.start_day === formattedDate) {
                console.log("해당 날짜의 새 일정 수신:", newSchedule);
                setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
            }
        });

        // 삭제된 일정 이벤트 처리: schedules 배열에서 해당 id 제거
        socket.on("deleteSchedule", (deletedData) => {
            console.log("삭제된 일정 수신:", deletedData);
            setSchedules(prevSchedules =>
                prevSchedules.filter(schedule => schedule.id !== deletedData.id)
            );
        });

        return () => {
            socket.disconnect();
        };
    }, [formattedDate]);

    // 체크박스 토글 함수
    const toggleCheckbox = async (scheduleId, currentCheckBoxState) => {
        const success = await updateCheckboxStatus(scheduleId, currentCheckBoxState);
        if (success) {
            setSchedules(prevSchedules =>
                prevSchedules.map(schedule =>
                    schedule.id === scheduleId ? { ...schedule, check_box: !currentCheckBoxState } : schedule
                )
            );
        }
    };

    return (
        <View style={styles.scheduleAdd}>
            <Text style={[styles.schDate, styles.textTypo]}>{formattedDate}</Text>

            <ScrollView style={styles.schList}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : schedules.length > 0 ? (
                    schedules.map((schedule, index) => (
                        <View key={index} style={[styles.schList1, styles.schFlexBox]}>
                            <TouchableOpacity onPress={() => toggleCheckbox(schedule.id, schedule.check_box)}>
                                <Image
                                    style={styles.iconLayout}
                                    source={
                                        schedule.check_box
                                            ? require("../assets/nc_check.png") // 체크된 상태
                                            : require("../assets/Square.png")    // 체크되지 않은 상태
                                    }
                                />
                            </TouchableOpacity>
                            <Text style={[styles.text, styles.textTypo]}>
                                {schedule.title} - {schedule.start_time.slice(0, 5)} ~ {schedule.end_time.slice(0, 5)}
                            </Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noScheduleText}>해당 날짜에 일정이 없습니다.</Text>
                )}
            </ScrollView>

            <TouchableOpacity
                style={styles.schPlusIcon}
                onPress={() => setModalVisible(true)}
            >
                <Image
                    style={styles.iconLayout}
                    source={require("../assets/sch_plus.png")}
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.modalBackground}>
                    <ScheduleCreate selectedDate={selectedDate} closeModal={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
};

export default ScheduleAdd;
