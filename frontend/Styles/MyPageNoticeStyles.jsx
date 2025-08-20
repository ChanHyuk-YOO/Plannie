import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize, StyleVariable} from "../GlobalStyles";

const styles = StyleSheet.create({
    mypageNotice: {
        backgroundColor: Color.colorAliceblue,
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    text2: {
        alignSelf: "center",
        top: 115,
        fontSize: FontSize.size_lg_4,
        lineHeight: 25,
        color: Color.labelsPrimary,
        position: "absolute",
    },
    text2Typo: {
        textAlign: "left",
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
    },
    mpnFrame: {
        marginTop: 55,
        alignSelf: "center",
        width: 360,
    },
    noticeSpaceBlock: {
        paddingVertical: 18,
        paddingHorizontal: 22,
        borderRadius: 10,
        alignSelf: "stretch",
        backgroundColor: Color.backgroundDefaultDefault,
        marginBottom: 23,
    },
    plannie: {
        fontSize: FontSize.size_base_5,
        display: "flex",
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
        alignItems: "center",
    },
    textLayout: {
        textAlign: "left",
        color: Color.labelsPrimary,
    },
    text: {
        fontWeight: "500",
        fontFamily: FontFamily.interMedium,
        marginTop: 18,
        fontSize: FontSize.size_mini_7,
    },
});

export default styles;