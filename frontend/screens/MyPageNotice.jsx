import * as React from "react";
import { Text, View } from "react-native";
import styles from "../Styles/MyPageNoticeStyles";
import {useNavigation} from "@react-navigation/native";
import MyPageTopNav from "../nav/MyPageTopNav";
import BottomNav from "../nav/BottomNav";

const MyPageNotice = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mypageNotice}>
            <MyPageTopNav/>
            <Text style={[styles.text2, styles.text2Typo]}>공지사항</Text>
            <View style={styles.mpnFrame}>
                <View style={styles.noticeSpaceBlock}>
                    <View>
                        <Text style={[styles.plannie, styles.textLayout]}>
                            Plannie 출시!
                        </Text>
                        <Text
                            style={[styles.text, styles.textLayout]}
                        >{`10월 중 정식 오픈 예정!

지금까지 없었던 새로운 일정 관리 앱을 지금 바로 베타버전으로 만나보세요`}</Text>
                    </View>
                </View>
                <View style={styles.noticeSpaceBlock}>
                    <View>
                        <Text style={[styles.plannie, styles.textLayout]}>
                            Plannie 출시!
                        </Text>
                        <Text
                            style={[styles.text, styles.textLayout]}
                        >{`10월 중 정식 오픈 예정!

지금까지 없었던 새로운 일정 관리 앱을 지금 바로 베타버전으로 만나보세요`}</Text>
                    </View>
                </View>
            </View>
            <BottomNav/>
        </View>
    );
};

export default MyPageNotice;
