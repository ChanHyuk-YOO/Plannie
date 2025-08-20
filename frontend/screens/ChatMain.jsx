import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Keyboard,
    Animated,
    Alert
} from "react-native";
import { Image } from "expo-image";
import axios from "axios";
import { FontFamily, Color, FontSize } from "../GlobalStyles";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatChatting = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([
        {
            id: "1",
            text: "안녕하세요. 플래니입니다. 당신의 효율적인 공부 계획을 도와드리겠습니다.",
            sender: "bot"
        }
    ]);
    const [inputText, setInputText] = useState("");
    const keyboardHeight = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    // 토큰 검사
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    Alert.alert("Session Expired", "Please log in again.");
                    navigation.navigate("Login");
                }
            } catch (error) {
                console.error("Error retrieving token:", error);
            }
        };
        checkToken();
    }, []);

    // 키보드 이벤트 처리
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            (event) => {
                Animated.timing(keyboardHeight, {
                    duration: 300,
                    toValue: event.endCoordinates.height,
                    useNativeDriver: false
                }).start();
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            "keyboardDidHide",
            () => {
                Animated.timing(keyboardHeight, {
                    duration: 100,
                    toValue: 0,
                    useNativeDriver: false
                }).start();
            }
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // 메시지 추가 시 스크롤
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (inputText.trim().length > 0) {
            // 사용자 메시지 추가
            const newMessage = {
                id: Date.now().toString(),
                text: inputText,
                sender: "user"
            };
            setMessages((prev) => [...prev, newMessage]);
            const currentInput = inputText;
            setInputText("");

            try {
                const token = await AsyncStorage.getItem("userToken");
                // 서버 URL: 실제 서버 주소로 변경 필요 (예: http://your-server-address:3000/chat/send-message2)
                const serverURL = "http://localhost:3000/chat/send-message2";

                const response = await axios.post(
                    serverURL,
                    {
                        conversationId: "example_conversation_id",
                        senderId: token,
                        message: currentInput,
                        participants: ["user_id_example"]
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                // 서버에서 반환한 finalResponse를 사용 (자연어 응답 포함)
                const botMessage = {
                    id: Date.now().toString(),
                    text: response.data.finalResponse || response.data.actionResult || response.data.originalReply,
                    sender: "bot"
                };

                setMessages((prev) => [...prev, botMessage]);
                setTimeout(() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToEnd({ animated: true });
                    }
                }, 100);
            } catch (error) {
                console.error(
                    "Error:",
                    error.response ? error.response.data : error.message
                );
                const errorMessage = {
                    id: Date.now().toString(),
                    text: "오류가 발생했습니다. 다시 시도해주세요.",
                    sender: "bot"
                };
                setMessages((prev) => [...prev, errorMessage]);
            }
        }
    };

    const renderItem = ({ item }) => (
        <View
            style={[
                styles.messageContainer,
                item.sender === "user"
                    ? styles.userMessageContainer
                    : styles.aiMessageContainer
            ]}
        >
            <View
                style={item.sender === "user" ? styles.userMessage : styles.aiMessage}
            >
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.chatChatting}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={50}
        >
            <View style={styles.bg} />
            <View style={[styles.chatPlannie, styles.chatFlexBox]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.arrowBackIcon}
                        contentFit="cover"
                        source={require("../assets/arrow_back.png")}
                    />
                </TouchableOpacity>
                <Text style={styles.plannie}>Plannie</Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[styles.chatting, { paddingBottom: 40 }]}
                onContentSizeChange={() =>
                    flatListRef.current.scrollToEnd({ animated: true })
                }
            />
            <Animated.View style={[styles.chatBar, { bottom: keyboardHeight }]}>
                <View style={styles.fabFlexBox}>
                    <TouchableOpacity style={[styles.fab, styles.fabFlexBox]}>
                        <Image
                            style={styles.plusIcon}
                            contentFit="cover"
                            source={require("../assets/sch_plus.png")}
                        />
                    </TouchableOpacity>
                    <View style={[styles.chatWindow, styles.chatFlexBox]}>
                        <TextInput
                            style={[styles.text2, styles.textTypo]}
                            onChangeText={setInputText}
                            value={inputText}
                            placeholder="정보를 입력해주세요"
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage}>
                            <Image
                                style={styles.gravityUimagnifierIcon}
                                contentFit="cover"
                                source={require("../assets/sch_plus.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        flexDirection: "row",
        marginVertical: 5,
        paddingHorizontal: 13
    },
    userMessageContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        width: "100%"
    },
    aiMessageContainer: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%"
    },
    aiMessage: {
        backgroundColor: "#F0F0F0",
        borderRadius: 10,
        padding: 10,
        maxWidth: "80%"
    },
    userMessage: {
        backgroundColor: "#D3D3D3",
        borderRadius: 10,
        padding: 10,
        maxWidth: "80%"
    },
    messageText: {
        fontSize: 16,
        color: "#000"
    },
    chatFlexBox: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    bg: {
        top: 95,
        left: 0,
        borderTopLeftRadius: 37,
        borderTopRightRadius: 37,
        height: 779,
        width: "100%",
        backgroundColor: Color.backgroundDefaultDefault,
        position: "absolute"
    },
    arrowBackIcon: {
        width: 28,
        height: 28,
        overflow: "hidden"
    },
    plannie: {
        fontSize: FontSize.size_3xl,
        fontWeight: "600",
        fontFamily: FontFamily.bodyStrong,
        color: Color.colorLightskyblue_100,
        textAlign: "center"
    },
    chatPlannie: {
        height: 100,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingTop: 20
    },
    textTypo: {
        fontFamily: FontFamily.m3BodyLarge,
        textAlign: "left"
    },
    fabFlexBox: {
        paddingTop: 15,
        alignItems: "center",
        flexDirection: "row"
    },
    plusIcon: {
        width: 30,
        height: 30,
        marginBottom: 20
    },
    fab: {
        padding: 14,
        justifyContent: "center"
    },
    text2: {
        fontSize: FontSize.m3BodyLarge_size,
        letterSpacing: 1,
        color: Color.colorDarkgray_200
    },
    gravityUimagnifierIcon: {
        width: 18,
        height: 18,
        overflow: "hidden"
    },
    chatWindow: {
        borderRadius: 28,
        width: 321,
        height: 50,
        paddingHorizontal: 23,
        paddingVertical: 6,
        marginLeft: 1,
        marginBottom: 20,
        backgroundColor: Color.backgroundDefaultDefault,
        justifyContent: "space-between"
    },
    chatBar: {
        height: 80,
        backgroundColor: Color.colorAliceblue,
        width: "100%",
        justifyContent: "center",
        position: "absolute"
    },
    chatting: {
        flexGrow: 1,
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 60
    },
    chatChatting: {
        backgroundColor: Color.colorLavender,
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "stretch",
        justifyContent: "center"
    }
});

export default ChatChatting;
