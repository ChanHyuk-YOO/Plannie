import * as React from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, Modal, Button } from "react-native";
import { Image } from "expo-image";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../Styles/ScheduleCreateStyles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';
import {createSchedule} from "./api/planner";


const ScheduleCreate = ({ selectedDate, closeModal }) => {
    const [title, setTitle] = React.useState("");
    const [startTime, setStartTime] = React.useState(new Date());
    const [endTime, setEndTime] = React.useState(new Date());
    const [notification, setNotification] = React.useState("");
    const [repeat, setRepeat] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [memo, setMemo] = React.useState("");
    const [isNotificationModalVisible, setNotificationModalVisible] = React.useState(false);
    const [isRepeatModalVisible, setRepeatModalVisible] = React.useState(false);
    const [showStartPicker, setShowStartPicker] = React.useState(false);
    const [showEndPicker, setShowEndPicker] = React.useState(false);

    const formattedDate = selectedDate ? moment(selectedDate).format("YYYY.MM.DD dddd") : '';

    const notificationOptions = ["안 함", "5분 전", "10분 전", "15분 전", "30분 전", "1시간 전", "2시간 전", "1일 전", "2일 전"];
    const repeatOptions = ["안 함", "월", "화", "수", "목", "금", "토", "일"];

    const handleSave = () => {
        if (!title) {
            Alert.alert("오류", "일정 제목을 입력하세요.");
            return;
        }

        createSchedule({
            selectedDate,
            title,
            startTime,
            endTime,
            memo,
            notification,
            repeat,
            url,
            closeModal
        });
    };

    return (
        <View style={styles.scheduleCreate}>
            <View style={[styles.ncXCheck, styles.frameFlexBox]}>
                <TouchableOpacity onPress={closeModal}>
                    <Image style={styles.ncXIcon} contentFit="cover" source={require("../assets/nc_x.png")}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave}>
                    <Image style={styles.ncCheckIcon} contentFit="cover" source={require("../assets/nc_check.png")}/>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.ncContent} contentContainerStyle={styles.scrollViewContent}>
                <TextInput
                    style={styles.ncScheduleTitle}
                    placeholder="일정 제목"
                    placeholderTextColor="#A9A9A9"
                    value={title}
                    onChangeText={setTitle}
                />

                <View style={styles.frameSpaceBlock}>
                    <View style={[styles.scDateFrame, styles.frameFlexBox]}>
                        <Text style={[styles.scDateText, styles.dateTypo]}>날짜</Text>
                        <Text style={[styles.scDate, styles.dateTypo]}>{formattedDate}</Text>
                    </View>

                    {/* 시간 선택 */}
                    <View style={[styles.scTimeFrame, styles.frameSpaceBlock]}>
                        <Text style={[styles.scDateText, styles.dateTypo]}>시간</Text>

                        {/* 시작 시간 버튼 */}
                        <TouchableOpacity
                            style={styles.timePickerButton}
                            onPress={() => setShowStartPicker(true)}
                        >
                            <Text style={styles.timePickerText}>{moment(startTime).format("HH:mm")}</Text>
                        </TouchableOpacity>

                        <Text style={styles.timeSeparator}> - </Text>

                        {/* 종료 시간 버튼 */}
                        <TouchableOpacity
                            style={styles.timePickerButton}
                            onPress={() => setShowEndPicker(true)}
                        >
                            <Text style={styles.timePickerText}>{moment(endTime).format("HH:mm")}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 알림 설정 */}
                    <TouchableOpacity
                        style={[styles.scNoti, styles.pickerTouchable]}
                        onPress={() => setNotificationModalVisible(true)}
                    >
                        <Text style={styles.scDateText}>알림 설정: {notification}</Text>
                    </TouchableOpacity>

                    {/* 반복 여부 설정 */}
                    <TouchableOpacity
                        style={[styles.scNoti, styles.pickerTouchable]}
                        onPress={() => setRepeatModalVisible(true)}
                    >
                        <Text style={styles.scDateText}>반복 여부: {repeat}</Text>
                    </TouchableOpacity>

                    <Text style={[styles.scUrlText, styles.dateTypo]}>연관 사항 URL</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="URL을 입력하세요"
                        placeholderTextColor="#A9A9A9"
                        value={url}
                        onChangeText={setUrl}
                    />

                    <Text style={[styles.scEpText, styles.dateTypo]}>메모</Text>
                    <TextInput
                        style={[styles.scMemo, styles.input]}
                        placeholder="메모를 입력하세요"
                        placeholderTextColor="#A9A9A9"
                        multiline
                        value={memo}
                        onChangeText={setMemo}
                    />
                </View>
            </ScrollView>

            {/* DateTimePicker - 시작 시간 */}
            <Modal
                transparent={true}
                visible={showStartPicker}
                animationType="slide"
                onRequestClose={() => setShowStartPicker(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <DateTimePicker
                            value={startTime}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                setShowStartPicker(false);
                                if (selectedDate) setStartTime(selectedDate);
                            }}
                        />
                        <Button title="닫기" onPress={() => setShowStartPicker(false)} />
                    </View>
                </View>
            </Modal>

            {/* DateTimePicker - 종료 시간 */}
            <Modal
                transparent={true}
                visible={showEndPicker}
                animationType="slide"
                onRequestClose={() => setShowEndPicker(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <DateTimePicker
                            value={endTime}
                            mode="time"
                            is24Hour={true}
                            display="spinner"
                            onChange={(event, selectedDate) => {
                                setShowEndPicker(false);
                                if (selectedDate) setEndTime(selectedDate);
                            }}
                        />
                        <Button title="닫기" onPress={() => setShowEndPicker(false)} />
                    </View>
                </View>
            </Modal>

            {/* Notification Modal */}
            <Modal
                transparent={true}
                visible={isNotificationModalVisible}
                animationType="slide"
                onRequestClose={() => setNotificationModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        {notificationOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.modalOption}
                                onPress={() => {
                                    setNotification(option);
                                    setNotificationModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Button title="닫기" onPress={() => setNotificationModalVisible(false)}/>
                </View>
            </Modal>

            {/* Repeat Modal */}
            <Modal
                transparent={true}
                visible={isRepeatModalVisible}
                animationType="slide"
                onRequestClose={() => setRepeatModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        {repeatOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.modalOption}
                                onPress={() => {
                                    setRepeat(option);
                                    setRepeatModalVisible(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Button title="닫기" onPress={() => setRepeatModalVisible(false)}/>
                </View>
            </Modal>
        </View>
    );
};

export default ScheduleCreate;
