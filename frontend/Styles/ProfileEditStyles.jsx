import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(228, 239, 255, 0.86)',
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#8FBEFF',
        position: 'absolute', 
        top: 5, 
        alignSelf: 'center', 
    },
    profileImageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#C4C4C4',
    },
    form: {
        marginTop: 20,
        
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        marginRight: 20,
    },
    input: {
        flex: 4,
        height: 40,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#FFFFFF',
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
    },
    submitButton: {
        marginTop: 20, // 흰 박스에서 20px 아래에 위치
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#8FBEFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold', 
        fontSize: 16,
    },
});

