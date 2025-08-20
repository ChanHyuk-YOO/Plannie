import * as React from "react";
import { View, Text, ScrollView, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import styles from "../Styles/MonthListStyles";

const MonthList = () => {
    const [schedules, setSchedules] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://172.30.1.92:3000/planner/month/2024/06'); // 적절히 연도와 월을 수정
                setSchedules(response.data);
            } catch (err) {
                console.error("일정 조회 오류:", err);
                setError("일정 조회 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };
        fetchSchedules();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={{ color: 'red' }}>{error}</Text>;
    }

    return (
        <View style={styles.monthList}>
            <View style={[styles.bg, styles.bgPosition]} />
            <Text style={styles.mlTitle}>이 달의 일정</Text>
            <View style={styles.scrollContainer}>
                <ScrollView contentContainerStyle={styles.mlContent}>
                    {schedules.map((schedule, index) => (
                        <View key={index} style={styles.mlDate}>
                            <Text style={[styles.day, styles.dayTypo]}>
                                {new Date(schedule.start_day).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit', weekday: 'short' })}
                            </Text>
                            <View style={styles.mlDateList}>
                                <View style={styles.listFlexBox}>
                                    <Text style={[styles.todo, styles.dayTypo]}>{schedule.title}</Text>
                                    <Text style={styles.todoTime}>{`${schedule.start_time} - ${schedule.end_time}`}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default MonthList;
