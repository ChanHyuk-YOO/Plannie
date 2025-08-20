import * as React from "react";
import { Text, View, TouchableOpacity, Linking, Alert, TextInput } from "react-native";
import { useState } from "react";
import styles from "../Styles/MyPageEnquireStyles";
import MyPageTopNav from "../nav/MyPageTopNav";
import BottomNav from "../nav/BottomNav";

const MyPageEnquire = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSendEmail = () => {
        const email = "missionkinggu@gmail.com";

        if (!subject || !body) {
            Alert.alert("오류", "제목과 내용을 입력해주세요.");
            return;
        }

        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        Linking.openURL(url).catch((error) => {
            console.error("Error opening email client:", error);
            Alert.alert("오류", "이메일 클라이언트를 열 수 없습니다.");
        });
    };

    return (
        <View style={styles.mypageEnquire}>
            <MyPageTopNav/>
            <Text style={[styles.text4, styles.textTypo1]}>문의하기</Text>
            <View style={styles.mpeContent}>
                <View style={styles.mpeSpaceBlock}>
                    <View>
                        <TextInput
                            style={[styles.text, styles.textLayout]}
                            placeholder="제목"
                            value={subject}
                            onChangeText={setSubject}
                        />
                    </View>
                </View>
                <View style={[styles.mpeNoticeBox, styles.mpeSpaceBlock]}>
                    <View>
                        <TextInput
                            style={[styles.text1, styles.textTypo]}
                            placeholder="문의할 내용을 작성해주세요"
                            value={body}
                            onChangeText={setBody}
                            multiline
                        />
                    </View>
                </View>
                <Text style={[styles.text2, styles.textTypo]}>
                    • 문의하신 사항은 관리자 연락처로 전송됩니다.{"\n"}
                    • 평일 09시~11시, 13~17시에 이메일로 답변드립니다.
                </Text>
                <TouchableOpacity style={styles.mpeButton} onPress={handleSendEmail}>
                    <Text style={styles.text3}>문의하기</Text>
                </TouchableOpacity>
            </View>
            <BottomNav/>
        </View>
    );
};

export default MyPageEnquire;
