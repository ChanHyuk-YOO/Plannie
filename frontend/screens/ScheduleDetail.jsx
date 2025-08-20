// ScheduleDetail.jsx
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ScheduleDetail = ({ schedule, onClose }) => {
    return (
        <View style={styles.detailContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{schedule.title}</Text>
            <Text>날짜: {schedule.date}</Text>
            <Text>시간: {schedule.time}</Text>
            <Text>알림 설정: {schedule.notification}</Text>
            <Text>반복 여부: {schedule.repetition}</Text>
            <Text>메모: {schedule.memo}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    detailContainer: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        width: 300,
        alignItems: "center",
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    closeButtonText: {
        color: "blue",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

export default ScheduleDetail;
