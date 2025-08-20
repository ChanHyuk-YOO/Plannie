import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(228, 239, 255, 0.86)',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        color: '#8FBEFF',
        textAlign: 'center',
        marginBottom: 20, // 타이틀과 입력란 사이 간격
    },
    formContainer: { 
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20, // 입력란과 버튼 사이 간격
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        width: 80, 
        fontSize: 16,
        color: '#000000',
        marginRight: 10, 
    },
    input: {
        flex: 1, // 입력란이 남은 공간을 차지하도록 설정
        height: 40,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#FFFFFF',
    },
    submitInput: {
        height: 80,
        width: 310,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#FFFFFF',
        textAlignVertical: 'top',
        padding: 10,
        alignSelf: 'center', // 중앙 정렬
    },
    submitButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#1E4CF5',
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
