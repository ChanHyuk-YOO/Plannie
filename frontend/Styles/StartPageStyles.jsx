import { StyleSheet } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const styles = StyleSheet.create({
    startPage: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 50,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 150,
    },
    plannieIcon: {
        width: 185,
        height: 231,
        marginBottom: 10,
    },
    brandText: {
        fontSize: 46,
        fontWeight: "800",
        fontFamily: FontFamily.interExtraBold,
        color: Color.backgroundDefaultDefault, // 메인 텍스트 색상 (화이트 혹은 밝은 색상 추천)
    },
    textContainer: {
        alignItems: "center",
        marginHorizontal: 20,
    },
    headline: {
        fontSize: 37,
        fontWeight: "700",
        fontFamily: FontFamily.interBold,
        color: Color.backgroundDefaultDefault,
        textAlign: "center",
    },
    spStartButton: {
        borderRadius: 46,
        backgroundColor: Color.backgroundDefaultDefault,
        width: 330,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
        // 그림자 효과 (iOS)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        // 안드로이드 Elevation
        elevation: 5,
    },
    planit: {
        fontSize: FontSize.size_lg_4,
        fontWeight: "600",
        fontFamily: FontFamily.bodyStrong,
        color: Color.labelsPrimary,
    },
});

export default styles;
