import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize, StyleVariable} from "../GlobalStyles";

const styles = StyleSheet.create({
    mypageAlarm: {
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: Color.backgroundDefaultDefault,
    },
    text4: {
        top: 10,
        left: 30,
        fontSize: FontSize.size_lg_4,
        color: Color.labelsPrimary,
        textAlign: "left",
    },
    text4Typo: {
        textAlign: "left",
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
    },
    mpaAlarmFrame4: {
        top: 30,
        alignSelf: "center",
        width: 320,
    },
    mpaFrameFlexBox: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        color: Color.labelsPrimary,
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
        lineHeight: 20,
        fontSize: FontSize.size_mini_7,
    },
    toggleIcon: {
        height: 23,
        width: 40,
    },
    mpaLine: {
        top: 50,
        borderColor: Color.labelsPrimary,
        borderTopWidth: 0.9,
        width: 350,
        height: 1,
        borderStyle: "solid",
        alignSelf: "center",
    },
    mpaAlarmlistFrame: {
        marginTop: 70,
        alignSelf: "center",
    },
    mpaFrameLayout: {
        width: 320,
    },
    mpaAlarmFrame: {
        alignSelf: "stretch",
        justifyContent: "space-between",
    },
    mpaAlarmFrame1: {
        marginTop: 15,
        alignSelf: "stretch",
        justifyContent: "space-between",
    },
});
export default styles;