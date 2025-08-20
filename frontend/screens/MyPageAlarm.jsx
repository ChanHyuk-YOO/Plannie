import * as React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "../Styles/MyPageAlarmStyles";
import { useNavigation } from "@react-navigation/native";
import MyPageTopNav from "../nav/MyPageTopNav";
import BottomNav from "../nav/BottomNav";

const MyPageAlarm = () => {
    const navigation = useNavigation();

    // 알림 상태를 관리하는 state
    const [alarmSettings, setAlarmSettings] = React.useState({
        receiveAlarm: true,
        scheduleAlarm: true,
        noticeAlarm: false,
        smsAlarm: true,
        emailAlarm: true,
    });

    // 알림 토글 함수
    const toggleAlarm = (key) => {
        setAlarmSettings((prevSettings) => ({
            ...prevSettings,
            [key]: !prevSettings[key],
        }));
    };

    return (
        <View style={styles.mypageAlarm}>
            <MyPageTopNav/>
            <Text style={[styles.text4, styles.text4Typo]}>알림설정</Text>
            <View style={[styles.mpaAlarmFrame4, styles.mpaFrameFlexBox]}>
                <Text style={styles.text}>알림 받기</Text>
                <TouchableOpacity onPress={() => toggleAlarm('receiveAlarm')}>
                    <Image
                        style={styles.toggleIcon}
                        contentFit="cover"
                        source={alarmSettings.receiveAlarm ? require("../assets/toggle_On.png") : require("../assets/toggle_Off.png")}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.mpaLine} />
            <View style={[styles.mpaAlarmlistFrame, styles.mpaFrameLayout]}>
                <View style={[styles.mpaAlarmFrame, styles.mpaFrameFlexBox]}>
                    <Text style={styles.text}>일정 알림 받기</Text>
                    <TouchableOpacity onPress={() => toggleAlarm('scheduleAlarm')}>
                        <Image
                            style={styles.toggleIcon}
                            contentFit="cover"
                            source={alarmSettings.scheduleAlarm ? require("../assets/toggle_On.png") : require("../assets/toggle_Off.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.mpaAlarmFrame1, styles.mpaFrameFlexBox]}>
                    <Text style={styles.text}>공지 알림 받기</Text>
                    <TouchableOpacity onPress={() => toggleAlarm('noticeAlarm')}>
                        <Image
                            style={styles.toggleIcon}
                            contentFit="cover"
                            source={alarmSettings.noticeAlarm ? require("../assets/toggle_On.png") : require("../assets/toggle_Off.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.mpaAlarmFrame1, styles.mpaFrameFlexBox]}>
                    <Text style={styles.text}>SMS 알림 받기</Text>
                    <TouchableOpacity onPress={() => toggleAlarm('smsAlarm')}>
                        <Image
                            style={styles.toggleIcon}
                            contentFit="cover"
                            source={alarmSettings.smsAlarm ? require("../assets/toggle_On.png") : require("../assets/toggle_Off.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.mpaAlarmFrame1, styles.mpaFrameFlexBox]}>
                    <Text style={styles.text}>이메일 알림 받기</Text>
                    <TouchableOpacity onPress={() => toggleAlarm('emailAlarm')}>
                        <Image
                            style={styles.toggleIcon}
                            contentFit="cover"
                            source={alarmSettings.emailAlarm ? require("../assets/toggle_On.png") : require("../assets/toggle_Off.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <BottomNav/>
        </View>
    );
};

export default MyPageAlarm;
