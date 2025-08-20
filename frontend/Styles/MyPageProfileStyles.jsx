import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize, StyleVariable} from "../GlobalStyles";

const styles = StyleSheet.create({
    mypageProfile: {
        backgroundColor: Color.colorAliceblue,
        flex: 1,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
    mppPhoto: {
        top: 120,
        borderRadius: 100,
        backgroundColor: Color.borderDefaultDefault,
        width: 90,
        height: 90,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
    },
    mppPFrameIcon: {
        width: 22,
        height: 22,
        overflow: "hidden",
    },
    mppContentBox: {
        top: 165,
        borderRadius: 10,
        height: 580,
        paddingHorizontal: 25,
        paddingTop: 75,
        flexDirection: "row",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: Color.backgroundDefaultDefault,
        position: "absolute",
    },
    mppContent: {
        alignItems: "center",
    },
    mppGNickname: {
        height: 22,
        width: 317,
    },
    text: {
        top: 2,
        textAlign: "left",
        color: Color.labelsPrimary,
        fontSize: FontSize.size_mini_7,
        fontFamily: 'interMedium',
        fontWeight: "600",
    },
    textPosition: {
        left: 0,
        position: "absolute",
    },
    mppLine: {
        top: 22,
        width: 255,
    },
    mppPosition: {
        height: 1,
        borderTopWidth: 1,
        borderColor: Color.labelsPrimary,
        marginLeft: 60,
        borderStyle: "solid",
    },
    mppFNickname: {
        width: 235,
        left: 70,
    },
    mppFNicknameFlexBox: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    textTypo: {
        fontFamily: FontFamily.interRegular,
        fontWeight: "500",
        textAlign: "left",
        color: Color.labelsPrimary,
        fontSize: FontSize.size_mini_7,
    },
    nav: {
        flexDirection: "row",
        alignItems: "center",
    },
    mppInitializationIcon: {
        width: 14,
        height: 14,
        overflow: "hidden",
    },
    mppNicknameNum: {
        fontSize: 12,
        marginLeft: 10,
        textAlign: "left",
    },
    bodyTextTypo: {
        fontFamily: FontFamily.interRegular,
        color: Color.labelsPrimary,
    },
    mppGName: {
        height: 22,
    },
    mppSpaceBlock: {
        marginTop: 30,
        width: 315,
    },
    text3: {
        left: 70,
        top: 0,
    },
    mppGBirth: {
        height: 22,
    },
    text7: {
        top: 5,
        textAlign: "left",
        color: Color.labelsPrimary,
        fontSize: FontSize.size_mini_7,
        fontFamily: FontFamily.interSemiBold,
        fontWeight: "600",
    },
    mppLineShort: {
        top: 25,
        width: 220,
    },
    text8: {
        top: 3,
        left: 70,
        position: "absolute",
    },
    arrowRightIcon: {
        left: 295,
        width: 22,
        top: 0,
        height: 22,
        position: "absolute",
        overflow: "hidden",
    },

});

export default styles;