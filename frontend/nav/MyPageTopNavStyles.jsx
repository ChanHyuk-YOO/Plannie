import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize} from "../GlobalStyles";

const styles = StyleSheet.create({
    topNav: {
        top: 0,
        height: 100,
        backgroundColor: "#FFFFFF",
        width: "100%",
    },
    topNavContentFrame: {
        width: 350,
        top: 60,
        alignSelf: "center",
        justifyContent: "center",
    },
    contentFlexBox: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    arrowIconLayout: {
        height: 28,
        width: 28,
        overflow: "hidden",
    },
    plannie: {
        fontSize: FontSize.size_3xl,
        color: Color.colorLightskyblue_100,
        textAlign: "left",
        fontFamily: FontFamily.bodyStrong,
        fontWeight: "600",
    },

});

export default styles;