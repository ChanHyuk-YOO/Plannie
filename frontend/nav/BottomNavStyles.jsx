import {StyleSheet} from "react-native";
import {Color, Padding, StyleVariable} from "../GlobalStyles";

const styles = StyleSheet.create({
    bottomNav: {
        bottom:0,
        borderColor: Color.borderDefaultDefault,
        borderBottomWidth:0,
        borderWidth: 1,
        width: "100%",
        height: 70,
        justifyContent: "center",
        position: "absolute",
        backgroundColor: "#FFFFFF",
    },
    nav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        alignItems: "flex-start",
        top: 15,
        width: 280,
        position: "absolute",
    },
    tooltip: {
        width: 30,
        height: 26,
        paddingHorizontal: StyleVariable.space300,
        paddingVertical: StyleVariable.space200,
    },
    iconLayout: {
        height: 30,
        width: 30,
    },
    userIcon: {
        overflow: "hidden",
    },
});

export default styles;
