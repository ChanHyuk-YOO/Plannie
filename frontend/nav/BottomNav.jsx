import {TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import * as React from "react";
import styles from "./BottomNavStyles";
import {useNavigation} from "@react-navigation/native";

const BottomNav = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.bottomNav}>
            <View style={styles.nav}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ChatMain')}
                    contentFit="cover">
                    <Image
                        style={styles.tooltip}
                        contentFit="cover"
                        source={require("../assets/Tooltip.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Calendar')}
                    contentFit="cover">
                    <Image
                        style={styles.iconLayout}
                        contentFit="cover"
                        source={require("../assets/Home.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('MyPageMain')}
                    contentFit="cover">
                    <Image
                        style={[styles.userIcon, styles.iconLayout]}
                        contentFit="cover"
                        source={require("../assets/User.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BottomNav;