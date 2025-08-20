import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize} from "../GlobalStyles";

const styles = StyleSheet.create({
    scheduleAdd: {
        borderRadius: 20,
        backgroundColor: Color.backgroundDefaultDefault,
        width: 350,
        height: 600,
        padding: 25,
        alignItems: "center",
    },
    schDate: {
        color: Color.colorLightskyblue_100,
        alignSelf: "stretch",
        fontSize: FontSize.size_4xl_9,
    },
    textTypo: {
        textAlign: "left",
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
        fontSize: 20,
    },
    schList: {
        marginTop: 35,
        alignSelf: "stretch",
    },
    schList1: {
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
    },
    schFlexBox: {
        alignItems: "center",
        flexDirection: "row",
    },
    iconLayout: {
        height: 35,
        width: 35,
    },
    text: {
        color: Color.colorDarkslategray_200,
        marginLeft: 20,
    },
    schList11: {
        marginTop: 25.9,
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
    },
    squareIcon: {
        overflow: "hidden",
    },
    schPlusIcon: {
        width: 48,
        height: 48,
        overflow: "hidden",
        alignSelf: "flex-end"
    },
    modalBackground: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});

export default styles;