import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "../Styles/StartPageStyles";

const StartPage = () => {
    const navigation = useNavigation();
    return (
        <LinearGradient
            colors={['#1e4cf5', '#8fbeff']} // 깊은 파란색에서 밝은 보라색 그라데이션
            style={styles.startPage}
        >
            <View style={styles.contentContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.plannieIcon}
                        contentFit="cover"
                        source={require("../assets/Plannie_icon.png")}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.headline}>계획 세우는 게 어려울 땐?</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.spStartButton}
                >
                    <Text style={styles.planit}>Plannie 시작하기</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default StartPage;
