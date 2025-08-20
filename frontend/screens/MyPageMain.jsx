import * as React from "react";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../Styles/MyPageMainStyles';
import BottomNav from "../nav/BottomNav";
import MyPageTopNav from "../nav/MyPageTopNav";
import { useNavigation } from "@react-navigation/native";
import {deleteUser, fetchNickname, handleLogout} from "./api/user";
import DeleteAccount from "./DeleteAccount";

const MyPageMain = () => {
    const navigation = useNavigation();
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        const loadNickname = async () => {
            const nicknameData = await fetchNickname(navigation);
            if (nicknameData) {
                setNickname(nicknameData);
            }
        };

        loadNickname();
    }, []);
    return (
        <View style={styles.mypageMain}>
            <MyPageTopNav/>
            <View style={styles.mpProfileBox}>
                <View style={styles.mpProfileWhitebox}>
                    <View style={styles.mpPhotoNicname}>
                        <Image
                            style={styles.mpPhotoIcon}
                            contentFit="cover"
                            source={require("../assets/MP_Photo.png")}
                        />
                        <View style={styles.mpNickContent}>
                            <Text style={styles.titleTypo}>{nickname || '닉네임 불러오는 중...'}</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MyPageProfile')}
                                contentFit="cover">
                                <Image
                                    style={styles.arrowIconLayout}
                                    contentFit="cover"
                                    source={require("../assets/arrow_front.png")}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.mpProfileButtonContent}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProfileEdit')}
                            contentFit="cover">
                            <View style={styles.profileFlexBox}>
                                <Text style={styles.mpProfileButton}>프로필 편집</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

                <Image
                    style={styles.mpBanner}
                    source={require("../assets/logo.png")}
                />

            <View style={styles.mpContentFrame}>
                <View style={[styles.mpContent, styles.contentFlexBox]}>
                    <Text style={styles.textTypo}>공지사항</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MyPageNotice')}
                        contentFit="cover">
                        <Image
                            style={styles.arrowIconLayout}
                            contentFit="cover"
                            source={require("../assets/arrow_front.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.mpContent, styles.contentFlexBox]}>
                    <Text style={styles.textTypo}>알림설정</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MyPageAlarm')}
                        contentFit="cover">
                        <Image
                            style={styles.arrowIconLayout}
                            contentFit="cover"
                            source={require("../assets/arrow_front.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.mpContent, styles.contentFlexBox]}>
                    <Text style={styles.textTypo}>문의하기</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MyPageEnquire')}
                        contentFit="cover">
                        <Image
                            style={styles.arrowIconLayout}
                            contentFit="cover"
                            source={require("../assets/arrow_front.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={[styles.mpContent, styles.contentFlexBox]}>
                    <Text style={styles.textTypo}>버전정보</Text>
                    <Text style={[styles.version, styles.textTypo]}>1.0</Text>
                </View>
            </View>
            <TouchableOpacity style={[styles.mpLogoutButton, styles.buttonLayout]} onPress={() => handleLogout(navigation)} >
                <Text style={styles.textTypo}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => deleteUser()}
                style={[styles.mpWithdrawalButton, styles.buttonLayout]} >
                <Text style={[styles.text, styles.textTypo]}>탈퇴하기</Text>
            </TouchableOpacity>
            <BottomNav/>
        </View>
    );
};

export default MyPageMain;
