import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize, StyleVariable} from "../GlobalStyles";

const styles = StyleSheet.create({
    mypageEnquire: {
        backgroundColor: Color.colorAliceblue,
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    text4: {
        alignSelf: "center",
        top: 15,
        fontSize: FontSize.size_lg_4,
        lineHeight: 25,
        color: Color.labelsPrimary,
        textAlign: "left",
    },
    textTypo1: {
        textAlign: "left",
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "700",
    },
    mpeContent: {
        top: 30,
        alignSelf: "center",
        width: 360,
    },
    mpeSpaceBlock: {
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignSelf: "stretch",
        backgroundColor: Color.backgroundDefaultDefault,
    },
    text: {
        display: "flex",
        alignItems: "center",
        textAlign: "left",
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
        fontSize: FontSize.size_base_5,
    },
    textLayout: {
        color: Color.labelsPrimary,
    },
    mpeNoticeBox: {
        marginTop: 20,
    },
    text1: {
        height: 360,
        width: 320,
        color: Color.labelsPrimary,
        fontSize: FontSize.size_mini_7,
        fontFamily: FontFamily.interMedium,
        fontWeight: "500",
    },
    textTypo: {
        fontFamily: FontFamily.interMedium,
        fontWeight: "500",
        textAlign: "left",
    },
    text2: {
        fontSize: 14,
        lineHeight: 18,
        color: Color.colorDarkgray,
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        width: 360,
    },
    mpeButton: {
        borderRadius: 5,
        backgroundColor: Color.colorDodgerblue,
        height: 55,
        marginTop: 20,
        width: 360,
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    text3: {
        lineHeight: 22,
        color: Color.backgroundDefaultDefault,
        fontSize: FontSize.size_base_5,
        textAlign: "center",
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
    },
});

export default styles;