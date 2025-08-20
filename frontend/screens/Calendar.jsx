import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Alert, ScrollView, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import io from 'socket.io-client'; // 추가: Socket.IO 클라이언트 임포트
import moment from "moment";
import { API_URL } from '@env';
import styles from '../Styles/CalendarStyles';
import BottomNav from "../nav/BottomNav";
import ScheduleAdd from "./ScheduleAdd";
import { useNavigation } from "@react-navigation/native";
import { fetchMonthSchedules } from "./api/planner";

const Calendar = () => {
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);

    // 토큰 검사 함수
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (!token) {
                    Alert.alert("Session Expired", "Please log in again.");
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.error("Error retrieving token:", error);
            }
        };
        checkToken();
    }, []);

    // 월별 일정 가져오기
    useEffect(() => {
        setLoading(true);
        fetchMonthSchedules(currentDate.getFullYear(), currentDate.getMonth() + 1)
            .then((data) => setSchedules(data))
            .catch(() => setSchedules([]))
            .finally(() => setLoading(false));
    }, [currentDate]);

    // Socket.IO 연결: 컴포넌트가 마운트 될 때 서버에 연결하고 새 일정 이벤트 수신
    useEffect(() => {
        const socket = io("http://localhost:3000", {
            // transports: ['websocket'], // 잠시 주석 처리하거나,
            transports: ['polling', 'websocket'],
            path: '/socket.io'
        });



        socket.on("connect", () => {
            console.log("Socket.IO 서버에 연결됨:", socket.id);
        });

        socket.on("newSchedule", (newSchedule) => {
            console.log("새 일정 수신:", newSchedule);
            // 수신된 새 일정을 기존 스케줄 목록에 추가 (중복 여부 등은 상황에 맞게 처리)
            setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleDatePress = (date) => {
        const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        setSelectedDate(utcDate);
        setModalVisible(true);
    };

    // 월 이동 이벤트
    const handlePreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    // 달력 렌더링
    const renderDays = () => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = [];

        for (let i = 0; i < firstDayOfMonth.getDay(); i++)
            daysInMonth.push(<View style={styles.day} key={`empty-${i}`} />);
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isScheduled = schedules.some(schedule => new Date(schedule.start_day).getDate() === i);
            daysInMonth.push(
                <TouchableOpacity
                    style={[styles.day, isScheduled ? styles.scheduledDay : null]}
                    key={i}
                    onPress={() => handleDatePress(date)}
                >
                    <Text style={styles.date1}>{i}</Text>
                </TouchableOpacity>
            );
        }
        while (daysInMonth.length % 7 !== 0)
            daysInMonth.push(<View style={styles.day} key={`empty-end-${daysInMonth.length}`} />);

        const weeks = [];
        for (let i = 0; i < daysInMonth.length; i += 7) {
            weeks.push(
                <View style={styles.weekSpaceBlock} key={`week-${i}`}>
                    {daysInMonth.slice(i, i + 7)}
                </View>
            );
        }

        return weeks;
    };

    return (
        <View style={styles.calendar}>
            <View style={[styles.calPlannie, styles.calFlexBox]}>
                <Text style={styles.calLogo}>Plannie</Text>
                <Image style={styles.calSearch} contentFit="cover" source={require("../assets/search.png")} />
            </View>
            <View style={styles.calendar_bg}></View>
            <View style={styles.calCalender}>
                <View style={[styles.calHeader, styles.calFlexBox]}>
                    <View style={[styles.calHeaderFrame, styles.calFlexBox]}>
                        <TouchableOpacity onPress={handlePreviousMonth}>
                            <Image style={styles.arrowBackIcon} contentFit="cover" source={require("../assets/arrow_back.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.monthAndYear} onPress={() => navigation.navigate('MonthList')}>
                            <Text style={styles.monthYyyy}>
                                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextMonth}>
                            <Image style={styles.arrowBackIcon} contentFit="cover" source={require("../assets/arrow_front.png")} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.dateHeader, styles.weekSpaceBlock]}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <Text style={styles.sun} key={index}>{day}</Text>
                    ))}
                </View>
                <View style={styles.calendar1}>
                    {renderDays()}
                </View>
            </View>
            <BottomNav />

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={modalStyles.modalBackground}>
                        <TouchableWithoutFeedback>
                            <View>
                                <ScheduleAdd selectedDate={selectedDate} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Monthly Schedule List Section */}
            <View style={styles.scheduleContainer}>
                <Text style={styles1.scheduleTitle}>이 달의 일정</Text>
                <MonthlyScheduleList schedules={schedules} />
            </View>
        </View>
    );
};

// Monthly Schedule List Component
const MonthlyScheduleList = ({ schedules }) => {
    if (schedules.length === 0)
        return <Text style={styles1.noScheduleText}>이번 달에 등록된 일정이 없습니다.</Text>;

    return (
        <ScrollView style={styles1.scheduleListContainer}>
            {schedules.map((schedule, index) => (
                <View key={index} style={styles1.scheduleItem}>
                    <Text style={styles1.scheduleDate}>{schedule.start_day}</Text>
                    <Text style={styles1.scheduleTime}>
                        {schedule.start_time} - {schedule.end_time}
                    </Text>
                    <Text style={styles1.scheduleTitleText}>{schedule.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const styles1 = StyleSheet.create({
    scheduleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    scheduleListContainer: {
        paddingHorizontal: 20,
        maxHeight: 270,
        marginTop: 10,
        backgroundColor: '#f4f4f4',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    scheduleItem: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    scheduleDate: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    scheduleTime: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
        fontStyle: 'italic',
    },
    scheduleTitleText: {
        fontSize: 15,
        color: '#333',
        marginTop: 8,
    },
    noScheduleText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#888',
    },
});

const modalStyles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});

export default Calendar;
