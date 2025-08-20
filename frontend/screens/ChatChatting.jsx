import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color, FontSize } from "../GlobalStyles";
// 채팅창 말풍선만 사용하고 지울 파일임 !!!!!!!!!!
const ChatChatting = () => {
    return (
        <View style={styles.chatChatting}>
            <View style={styles.bg} />
            <View style={[styles.chatPlannie, styles.chatFlexBox]}>
                <Image
                    style={styles.arrowBackIcon}
                    contentFit="cover"
                    source={require("../assets/arrow_back.png")}
                />
                <Text style={styles.plannie}>Plannie</Text>
            </View>
            <View style={[styles.chatting, styles.chatBarPosition]}>
                <View style={styles.chatUserFrame}>
                    <View style={styles.chatUser}>
                        <View style={[styles.chatUserBox, styles.chatPosition]}>
                            <Text style={[styles.text, styles.textTypo]}>
                                공부 일정을 짜고 싶은데 도와줘
                            </Text>
                        </View>
                        <Image
                            style={[styles.chatUserChild, styles.chatChildLayout]}
                            contentFit="cover"
                            // source={require("../assets/polygon-1.png")}
                        />
                    </View>
                </View>
                <View style={styles.chatAiFrame}>
                    <View style={styles.chatAi}>
                        <View style={[styles.chatAiBox, styles.chatPosition]}>
                            <Text style={[styles.text, styles.textTypo]}>
                                네, 기본 정보들을 입력해주세요!
                            </Text>
                        </View>
                        <Image
                            style={[styles.chatAiChild, styles.chatChildLayout]}
                            contentFit="cover"
                            // source={require("../assets/polygon-2.png")}
                        />
                    </View>
                </View>
            </View>
            <View style={[styles.chatBar, styles.chatBarPosition]}>
                <View style={styles.fabFlexBox}>
                    <View style={[styles.fab, styles.fabFlexBox]}>
                        <Image
                            style={styles.plusIcon}
                            contentFit="cover"
                            // source={require("../assets/plus-icon1.png")}
                        />
                    </View>
                    <View style={[styles.chatWindow, styles.chatFlexBox]}>
                        <Text style={[styles.text2, styles.textTypo]}>
                            정보를 입력해주세요
                        </Text>
                        <Image
                            style={styles.gravityUimagnifierIcon}
                            contentFit="cover"
                            // source={require("../assets/gravityuimagnifier1.png")}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatFlexBox: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },
    chatBarPosition: {
        left: 0,
        width: 393,
        position: "absolute",
    },
    chatPosition: {
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 18,
        top: 0,
        justifyContent: "center",
        left: 0,
        alignItems: "center",
        flexDirection: "row",
        position: "absolute",
    },
    textTypo: {
        fontFamily: FontFamily.m3BodyLarge,
        textAlign: "left",
    },
    chatChildLayout: {
        height: 35,
        width: 37,
        top: 29,
        position: "absolute",
    },
    fabFlexBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    bg: {
        marginLeft: 196,
        top: 72,
        left: "50%",
        borderTopLeftRadius: 37,
        borderTopRightRadius: 37,
        height: 779,
        transform: [
            {
                rotate: "-180deg",
            },
        ],
        width: 393,
        backgroundColor: Color.backgroundDefaultDefault,
        position: "absolute",
    },
    arrowBackIcon: {
        width: 28,
        height: 28,
        overflow: "hidden",
    },
    plannie: {
        fontSize: FontSize.size_3xl,
        fontWeight: "600",
        fontFamily: FontFamily.bodyStrong,
        color: Color.colorLightskyblue_100,
        textAlign: "left",
    },
    chatPlannie: {
        top: 22,
        left: 19,
        width: 217,
        justifyContent: "space-between",
        position: "absolute",
    },
    text: {
        fontSize: FontSize.size_mini_7,
        letterSpacing: 0,
        lineHeight: 22,
        color: Color.labelsPrimary,
    },
    chatUserBox: {
        backgroundColor: Color.colorAliceblue,
    },
    chatUserChild: {
        left: 184,
    },
    chatUser: {
        width: 235,
        height: 64,
    },
    chatUserFrame: {
        alignItems: "flex-end",
        paddingRight: 14,
        justifyContent: "center",
        alignSelf: "stretch",
    },
    chatAiBox: {
        backgroundColor: "#e7e7e7",
    },
    chatAiChild: {
        left: 15,
    },
    chatAi: {
        width: 239,
        height: 64,
    },
    chatAiFrame: {
        paddingLeft: 14,
        marginTop: 27.5,
        alignSelf: "stretch",
    },
    chatting: {
        top: 617,
    },
    plusIcon: {
        width: 22,
        height: 22,
    },
    fab: {
        padding: 14,
        justifyContent: "center",
    },
    text2: {
        fontSize: FontSize.m3BodyLarge_size,
        letterSpacing: 1,
        lineHeight: 24,
        color: Color.colorDarkgray_200,
    },
    gravityUimagnifierIcon: {
        width: 18,
        height: 18,
        overflow: "hidden",
    },
    chatWindow: {
        borderRadius: 28,
        width: 321,
        height: 33,
        paddingHorizontal: 23,
        paddingVertical: 6,
        marginLeft: 7.3,
        backgroundColor: Color.backgroundDefaultDefault,
        justifyContent: "space-between",
    },
    chatBar: {
        top: 800,
        height: 51,
        backgroundColor: Color.colorAliceblue,
        justifyContent: "center",
    },
    chatChatting: {
        backgroundColor: Color.colorLavender,
        flex: 1,
        width: "100%",
        height: 852,
        overflow: "hidden",
    },
});

export default ChatChatting;
