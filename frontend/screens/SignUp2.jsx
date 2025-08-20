
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUp2 = ({ navigation, route }) => {
    const { email, password } = route.params; // SignUp1에서 전달된 데이터
    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleNext = () => {
        // 입력받은 데이터를 SignUp3로 전달
        navigation.navigate('SignUp3', {
            email,
            password,
            nickname,
            name,
            phone
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Let’s join the Plannie</Text>
            <Text style={styles.requiredText}>* 필수입력항목</Text>

            <View style={styles.formContainer}>
                {/* Nickname Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>닉네임 *</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="닉네임 입력"
                            placeholderTextColor="#878787"
                            value={nickname}
                            onChangeText={setNickname}
                        />
                    </View>
                </View>

                {/* Name Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>이름</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="이름 입력"
                            placeholderTextColor="#878787"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                </View>

                {/* Phone Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>휴대폰</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="전화번호 입력"
                            placeholderTextColor="#878787"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>

                {/* Next Button */}
                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>다음</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(228, 239, 255, 0.86)',
        alignItems: 'center',
        paddingTop: 60,
    },
    header: {
        fontSize: 28,
        fontWeight: '600',
        color: '#8FBEFF',
        marginTop: 30,
    },
    requiredText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4183F3',
        position: 'absolute',
        top: 160,
        right: 30,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 37,
        width: 340,
        paddingVertical: 40,
        alignItems: 'center',
        marginTop: 60,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    inputBox: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 20,
    },
    inputText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    nextButton: {
        backgroundColor: '#4183F3',
        borderRadius: 5,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default SignUp2;
