import {Text, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import styles from "./MyPageTopNavStyles";

const MyPageTopNav = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.topNav}>
            <View style={[styles.topNavContentFrame, styles.contentFlexBox]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    contentFit="cover">
                    <Image
                        style={styles.arrowIconLayout}
                        contentFit="cover"
                        source={require("../assets/arrow_back.png")}
                    />
                </TouchableOpacity>
                <Text style={styles.plannie}>Plannie</Text>
            </View>
        </View>
    );
};

export default MyPageTopNav;