import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import {signUpUser} from "./api/signup";

const SignUp3 = ({ route, navigation }) => {
    const { email, password, nickname, name, phone } = route.params;
    const [selectedAddress, setSelectedAddress] = useState('미선택');
    const [selectedGender, setSelectedGender] = useState('미선택');
    const [isAddressModalVisible, setAddressModalVisible] = useState(false);
    const [isGenderModalVisible, setGenderModalVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState('2000');
    const [selectedMonth, setSelectedMonth] = useState('1');
    const [selectedDay, setSelectedDay] = useState('1');
    const [isBirthModalVisible, setBirthModalVisible] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => (1900 + i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth(selectedYear, selectedMonth) }, (_, i) => (i + 1).toString());

    const handleSignUp = async () => {
        const birthdate = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')} 00:00:00`;

        const { success, message, error } = await signUpUser({
            email,
            password,
            nickname,
            name,
            phone,
            selectedAddress,
            birthdate,
            selectedGender,
        });

        if (success) {
            Alert.alert('회원가입 성공', message);
            navigation.navigate('Login');
        } else if (error === '이미 사용 중인 이메일입니다.') {
            Alert.alert(
                '오류',
                error,
                [
                    {
                        text: '확인',
                        onPress: () => {
                            navigation.navigate('SignUp1', { email, password, nickname, name, phone });
                        },
                    },
                ]
            );
        } else {
            Alert.alert('오류', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Let’s join the Plannie</Text>
            <Text style={styles.requiredText}>* 필수입력항목</Text>

            <View style={styles.formContainer}>
                {/* Address Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>주소</Text>
                    <TouchableOpacity style={styles.inputBox} onPress={() => setAddressModalVisible(true)}>
                        <Text style={styles.inputText}>{selectedAddress}</Text>
                    </TouchableOpacity>
                </View>

                {/* Address Modal */}
                <Modal
                    visible={isAddressModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setAddressModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Picker
                                selectedValue={selectedAddress}
                                onValueChange={(itemValue) => setSelectedAddress(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="미선택" value="미선택" />
                                <Picker.Item label="서울특별시" value="서울특별시" />
                                <Picker.Item label="부산광역시" value="부산광역시" />
                                <Picker.Item label="대구광역시" value="대구광역시" />
                                <Picker.Item label="인천광역시" value="인천광역시" />
                                <Picker.Item label="대전광역시" value="대전광역시" />
                                <Picker.Item label="광주광역시" value="광주광역시" />
                                <Picker.Item label="울산광역시" value="울산광역시" />
                                <Picker.Item label="세종특별자치시" value="세종특별자치시" />
                                <Picker.Item label="경기도" value="경기도" />
                                <Picker.Item label="강원특별자치도" value="강원특별자치도" />
                                <Picker.Item label="충청북도" value="충청북도" />
                                <Picker.Item label="충청남도" value="충청남도" />
                                <Picker.Item label="전북특별자치도" value="전북특별자치도" />
                                <Picker.Item label="전라남도" value="전라남도" />
                                <Picker.Item label="경상북도" value="경상북도" />
                                <Picker.Item label="경상남도" value="경상남도" />
                                <Picker.Item label="제주특별자치도" value="제주특별자치도" />
                            </Picker>
                            <TouchableOpacity onPress={() => setAddressModalVisible(false)} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Birthdate Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>생년월일</Text>
                    <TouchableOpacity style={styles.inputBox} onPress={() => setBirthModalVisible(true)}>
                        <Text style={styles.inputText}>{`${selectedYear}년 ${selectedMonth}월 ${selectedDay}일`}</Text>
                    </TouchableOpacity>
                </View>

                {/* Birthdate Modal */}
                <Modal
                    visible={isBirthModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setBirthModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text>연도</Text>
                            <Picker
                                selectedValue={selectedYear}
                                onValueChange={(itemValue) => setSelectedYear(itemValue)}
                                style={styles.picker}
                            >
                                {years.map(year => (
                                    <Picker.Item label={year} value={year} key={year} />
                                ))}
                            </Picker>

                            <Text>월</Text>
                            <Picker
                                selectedValue={selectedMonth}
                                onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                                style={styles.picker}
                            >
                                {months.map(month => (
                                    <Picker.Item label={month} value={month} key={month} />
                                ))}
                            </Picker>

                            <Text>일</Text>
                            <Picker
                                selectedValue={selectedDay}
                                onValueChange={(itemValue) => setSelectedDay(itemValue)}
                                style={styles.picker}
                            >
                                {days.map(day => (
                                    <Picker.Item label={day} value={day} key={day} />
                                ))}
                            </Picker>

                            <TouchableOpacity onPress={() => setBirthModalVisible(false)} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Gender Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>성별</Text>
                    <TouchableOpacity style={styles.inputBox} onPress={() => setGenderModalVisible(true)}>
                        <Text style={styles.inputText}>{selectedGender}</Text>
                    </TouchableOpacity>
                </View>

                {/* Gender Modal */}
                <Modal
                    visible={isGenderModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setGenderModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Picker
                                selectedValue={selectedGender}
                                onValueChange={(itemValue) => setSelectedGender(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="미선택" value="미선택" />
                                <Picker.Item label="남성" value="남성" />
                                <Picker.Item label="여성" value="여성" />
                            </Picker>
                            <TouchableOpacity onPress={() => setGenderModalVisible(false)} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    <Text style={styles.signupButtonText}>회원가입 하기</Text>
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
    signupButton: {
        backgroundColor: '#4183F3',
        borderRadius: 5,
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signupButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '80%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: '#4183F3',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    picker: {
        width: '100%',
    },
});

export default SignUp3;
