import {StyleSheet} from "react-native";
import {Color, FontFamily, FontSize, Padding, StyleVariable} from "../GlobalStyles";

const styles = StyleSheet.create({
    calendar: {
        backgroundColor: Color.colorLavender,
        height: "100%",
        overflow: "hidden",
        width: "100%",
        position: 'absolute', // 하단 고정을 위해 추가
    },
    scheduleContainer: {
        padding: 10,
        marginTop: 0,
        backgroundColor: '#f4f4f4',
        borderTopWidth: 1,
        position: 'absolute', // 하단 고정을 위해 추가
        bottom: 0,            // 하단 위치
        borderTopColor: '#ddd',
        width: '100%',        // 화면 전체 너비
        marginBottom: 60
    },
    calPlannie: {
        top: 60,
        // left: 157,
        // width: 212,
        width: 340,
        alignSelf: "center",
        position: "absolute",
    },
    calFlexBox: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    calLogo: {
        color: Color.colorLightskyblue_100,
        textAlign: "left",
        fontSize: FontSize.size_3xl_1,
        fontFamily: FontFamily.bodyStrong,
        fontWeight: "600",
    },
    calSearch: {
        height: 32,
        width: 32,
    },
    calendar_bg: {
        top: 105,
        borderTopLeftRadius: 37,
        borderTopRightRadius: 37,
        width: 393,
        height: 750,
        backgroundColor: "#FFFFFF",
        position: "absolute",
    },
    calCalender: {
        alignSelf: "center",
        top: 130,
        width: 332,
        position: "absolute",
    },
    calHeader: {
        height: 40,
    },
    calHeaderFrame: {
        width: "100%",
    },
    monthAndYear: {
        flexDirection: "row",
    },
    monthYyyy: {
        fontSize: 18,
        color: Color.labelsPrimary,
        fontFamily: FontFamily.saralaBold,
        fontWeight: "700",
        textAlign: "center",
    },
    arrowBackIcon: {
        width: 20,
        height: 20,
        overflow: "hidden",
    },
    dateHeader: {
        height: 18,
        alignItems: "center",
    },
    weekSpaceBlock: {
        width: 310,
        alignSelf: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    sun: {
        fontSize: FontSize.size_xs,
        lineHeight: 30,
        textTransform: "uppercase",
        color: Color.labelsTertiary,
        width: 45,
        height: 30,
        justifyContent: "center",
        display: "flex",
        textAlign: "center",
        fontFamily: FontFamily.saralaBold,
        fontWeight: "700",
        alignItems: "center",
    },
    calendar1: {
        paddingTop: 10,
        width: 315,
        alignSelf: "center",
    },
    day: {
        width: 45,
        height: 45,
    },
    date1: {
        height: 45,
        width: 45,
        fontFamily: FontFamily.saralaRegular,
        fontSize: FontSize.size_lg_4,
        justifyContent: "center",
        display: "flex",
        textAlign: "center",
        color: Color.labelsPrimary,
        position: "absolute",
    },

    // bottomNav: {
    //     bottom:20,
    //     borderColor: Color.borderDefaultDefault,
    //     borderBottomWidth:0,
    //     borderWidth: 1,
    //     width: "100%",
    //     height: 50,
    //     paddingVertical: Padding.p_sm_8,
    //     justifyContent: "center",
    //     position: "absolute",
    // },
    // nav: {
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     alignSelf: "center",
    //     top: 5,
    //     width: 280,
    // },
    // tooltip: {
    //     width: 30,
    //     height: 26,
    //     paddingHorizontal: StyleVariable.space300,
    //     paddingVertical: StyleVariable.space200,
    // },
    // iconLayout: {
    //     height: 30,
    //     width: 30,
    // },
    // userIcon: {
    //     overflow: "hidden",
    // },

    // datePosition: {
    //     color: Color.colorsBlue,
    //     height: 41,
    //     width: 41,
    //     lineHeight: 23,
    //     top: "50%",
    //     marginLeft: -20.25,
    //     marginTop: -20.25,
    //     justifyContent: "center",
    //     display: "flex",
    //     textAlign: "center",
    //     left: "50%",
    //     alignItems: "center",
    //     position: "absolute",
    // },
    // date9: {
    //     fontFamily: FontFamily.saralaRegular,
    //     letterSpacing: 0,
    //     fontSize: FontSize.size_lg_4,
    //     color: Color.colorsBlue,
    // },
    // week2: {
    //     marginTop: 6.4,
    //     height: 40,
    // },
    // ellipseIcon: {
    //     opacity: 0.12,
    //     top: "50%",
    //     marginLeft: -20.25,
    //     marginTop: -20.25,
    //     width: 40,
    //     height: 40,
    //     left: "50%",
    //     position: "absolute",
    // },
    // date25: {
    //     color: Color.colorsBlue,
    //     fontFamily: FontFamily.saralaBold,
    //     fontWeight: "700",
    //     fontSize: FontSize.size_3xl_1,
    // },
});

export default styles;
