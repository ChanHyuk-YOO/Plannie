import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize} from "../GlobalStyles";

const styles = StyleSheet.create({
    loginBg: {
        top: 60,
        borderTopLeftRadius: 37,
        borderTopRightRadius: 37,
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    plannie: {
        top: 90,
        left: 30,
        fontSize: FontSize.size_8xl_5,
        fontWeight: "600",
        fontFamily: FontFamily.bodyStrong,
        color: Color.colorLightskyblue_100,
        textAlign: "left",
        position: "absolute",
    },
    signWithGoogle1: {
        alignSelf: "center",
        top: "45%",
        width: 258,
        borderWidth: 0,
        height: 60,
        position: "absolute",
    },
    login: {
        backgroundColor: Color.colorLavender,
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
});

export default styles;