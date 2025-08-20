import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize} from "../GlobalStyles";

const styles = StyleSheet.create({
    monthList: {
        backgroundColor: Color.colorAliceblue,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    bg: {
        top: 60,
        borderTopLeftRadius: 37,
        borderTopRightRadius: 37,
        backgroundColor: Color.backgroundDefaultDefault,
        width: "100%",
        height: "100%",
    },
    bgPosition: {
        position: "absolute",
    },
    mlTitle: {
        fontSize: FontSize.size_5xl,
        fontWeight: "600",
        fontFamily: FontFamily.bodyStrong,
        color: Color.colorLightskyblue_100,
        textAlign: "left",
        left: 30,
        top: 90,
    },
    scrollContainer: {
        top: 110,
        width: 350,
        height: 690,
        alignSelf: "center",
        overflow: "hidden",
    },
    mlContent: {
        alignSelf: "center",
        width: 313,
    },
    mlDate: {
        alignSelf: "stretch",
        marginBottom: 20,
    },
    day: {
        fontSize: FontSize.title3Regular_size,
    },
    dayTypo: {
        color: "#69666E",
        fontFamily: FontFamily.interMedium,
        fontWeight: "500",
        textAlign: "left",
    },
    mlDateList: {
        marginTop: 7,
        alignSelf: "stretch",
    },
    listFlexBox: {
        justifyContent: "space-between",
        alignSelf: "stretch",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 7,
    },
    todo: {
        fontSize: 16,
    },
    todoTime: {
        fontSize: 15,
        fontFamily: FontFamily.bodySmall,
        color: "#B3B3B3",
        textAlign: "left",
    },
});

export default styles;
