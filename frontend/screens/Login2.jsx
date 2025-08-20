import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login2 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.appName}>Plannie</Text>
            <Text style={styles.header}>로그인</Text>

            <View style={styles.formContainer}>
                {/* ID Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>아이디</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputText}
                            placeholder=""
                            placeholderTextColor="#878787"
                        />
                    </View>
                </View>

                {/* Password Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>비밀번호</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry
                            placeholder=""
                            placeholderTextColor="#878787"
                        />
                    </View>
                </View>

                {/* Signup and Find ID/PW Links */}
                <View style={styles.linksContainer}>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>회원가입</Text>
                    </TouchableOpacity>
                    <View style={styles.linkSeparator}>
                        <Text style={styles.linkText}>아이디 찾기</Text>
                        <Text style={styles.separator}> / </Text>
                        <Text style={styles.linkText}>비밀번호 찾기</Text>
                    </View>
                </View>
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
    appName: {
        fontSize: 28,
        fontWeight: '600',
        color: '#8FBEFF',
        position: 'absolute',
        top: 90,
        left: 30,
    },
    header: {
        fontSize: 30,
        fontWeight: '600',
        color: '#8FBEFF',
        marginTop: 120,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 37,
        width: 315,
        paddingVertical: 20,
        alignItems: 'center',
        marginTop: 50,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    inputBox: {
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    inputText: {
        fontSize: 16,
        color: '#000',
    },
    linksContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    linkText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
    linkSeparator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    separator: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
    },
});

export default Login2;
