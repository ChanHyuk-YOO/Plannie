/* fonts */
import {Asset as Font} from "expo-asset";

export async function FontFamily()  {
    await Font.loadAsync({
        // 폰트 이름과 파일 경로 설정
        'interBold': require('./assets/Font/Inter-Bold.ttf'),
        'interMedium': require('./assets/Font/Inter-Medium.ttf'),
        'interSemiBold': require('./assets/Font/Inter-SemiBold.ttf'),
        'interRegular': require('./assets/Font/Inter-Regular.ttf'),
        'interThin': require('./assets/Font/Inter-Thin.ttf'),
        'interBlack': require('./assets/Font/Inter-Black.ttf'),
        'interLight': require('./assets/Font/Inter-Light.ttf'),
    });
}
/* font sizes */
export const FontSize = {
    size_smi_9: 13,
    size_mini_7: 15,
    size_lg_4: 18,
    size_3xl_1: 22,
    size_xs: 12,
    size_base_6: 16,
    size_3xl: 22,
    size_8xl_5: 28,
    size_4xl_9: 24,
    size_mid_7: 18,
    size_smi_4: 12,
    size_base_5: 17,
    title3Regular_size: 20,
    size_5xl: 24,
    bodySmall_size: 14,
    bodyStrong_size: 16,
};
/* Colors */
export const Color = {
    colorLavender: "rgba(228, 239, 255, 0.86)",
    backgroundDefaultDefault: "#fff",
    borderDefaultDefault: "#d9d9d9",
    colorLightskyblue_100: "#8fbeff",
    colorLightskyblue_200: "rgba(143, 190, 255, 0.5)",
    labelsPrimary: "#000",
    separatorsNonOpaque: "rgba(84, 84, 86, 0.34)",
    colorsBlue: "#007aff",
    colorDarkslategray_100: "#474a4e",
    schemesOnSurfaceVariant: "#49454f",
    colorDarkslategray_200: "#343940",
    colorDarkslategray_300: "rgba(73, 69, 79, 0.81)",
    labelsTertiary: "rgba(60, 60, 67, 0.3)",
    colorAliceblue: "#e7f1fe",
    colorDarkgray: "#999",
    schemesOutline: "#79747e",
    colorDodgerblue: "#4183f3",
    colorBlueviolet: "#1e4cf5",
};
/* Style Variables */
export const StyleVariable = {
    space300: 11,
    space200: 7,
    radius200: 7,
};
/* Paddings */
export const Padding = {
    p_sm_8: 14,
    p_mini_7: 15,
    p_4xl: 23,
    p_lg_4: 18,
    p_3xl: 22,
    p_8xs_6: 5,
    p_50xl_8: 70,
    p_3xs_2: 9,
    p_33xl_3: 52,
    p_2xs: 11,
    p_5xs_4: 7,
    p_base: 16,
    p_xs: 12,
    p_5xs: 8,
    p_6xl: 25,
};
/* border radiuses */
export const Border = {
    br_17xl_8: 37,
    br_lg_4: 18,
    br_17xl_7: 37,
    br_16xl_4: 35,
    br_5xs_1: 7,
    br_3xs_2: 9,
    br_8xs_6: 5,
    br_5xs_4: 7,
    br_26xl_9: 46,
    br_5xs: 8,
};
