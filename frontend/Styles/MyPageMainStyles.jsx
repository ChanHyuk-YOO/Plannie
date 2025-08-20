import {StyleSheet} from "react-native";
import {Color, FontFamily} from "../GlobalStyles";

const styles = StyleSheet.create({
    mypageMain: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: Color.backgroundDefaultDefault,
    },
    mpProfileBox: {
        backgroundColor: Color.colorAliceblue,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    mpProfileWhitebox: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    mpPhotoNicname: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    mpPhotoIcon: {
        width: 55,
        height: 55,
    },
    mpNickContent: {
        marginLeft: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    titleTypo: {
        textAlign: "center",
        color: Color.labelsPrimary,
        fontFamily: FontFamily.bodyStrong,
        fontWeight: "600",
        fontSize: 18,
        marginRight: 150,
    },
    arrowIconLayout: {
        height: 27,
        width: 27,
        overflow: "hidden",
    },
    mpProfileButtonContent: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
    },
    profileFlexBox: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: Color.borderDefaultDefault,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    mpProfileButton: {
        color: "#000000",
        fontSize: 15,
        fontFamily: FontFamily.bodySmall,
        textAlign: "center",
    },
    mpProfileModify: {
        marginLeft: 50,
    },
    mpBanner: {
        marginTop: 10,
        height: 60,
        width: 350,
        backgroundColor: Color.borderDefaultDefault,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
    },
    mpContentFrame: {
        marginTop: 20,
        alignSelf: "center",
        width: 320,
    },
    mpContent: {
        marginBottom: 25,
        alignSelf: "stretch",
        justifyContent: "space-between",
    },
    contentFlexBox: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    textTypo: {
        lineHeight: 22,
        fontSize: 16,
        textAlign: "center",
        fontFamily: 'interSemiBold',
        fontWeight: "600",
    },
    version: {
        color: Color.colorDarkgray,
    },
    mpLogoutButton: {
        top: 665,
        backgroundColor: Color.colorLightskyblue_100,

    },
    mpWithdrawalButton: {
        top: 720,
        backgroundColor: Color.colorDodgerblue,
    },
    buttonLayout: {
        height: 45,
        width: 340,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
    },
    text: {
        color: Color.backgroundDefaultDefault,
    },
});

export default styles;