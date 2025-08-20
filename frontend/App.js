import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import StartPage from './screens/StartPage';
import Login from './screens/Login';

import Calendar from './screens/Calendar';
import MonthList from "./screens/MonthList";

import ChatMain from "./screens/ChatMain";

import MyPageMain from "./screens/MyPageMain";
import MyPageProfile from "./screens/MyPageProfile";
import MyPageNotice from "./screens/MyPageNotice";
import MyPageAlarm from "./screens/MyPageAlarm";
import MyPageEnquire from "./screens/MyPageEnquire";
import SignUp1 from './screens/SignUp1';
import SignUp2 from './screens/SignUp2';
import SignUp3 from './screens/SignUp3';


import ProfileEdit from './screens/ProfileEdit';
import DeleteAccount from './screens/DeleteAccount';
import ScheduleAdd from "./screens/ScheduleAdd";

const Stack = createNativeStackNavigator();

export default function App() {
    const RootStack = createNativeStackNavigator();
    const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
    return (
        <NativeBaseProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <RootStack.Navigator
                        initialRouteName={"StartPage"}
                        screenOptions={{ headerShown: false}}
                    >
                        <RootStack.Screen
                            name="StartPage" component={StartPage}
                        />
                        <RootStack.Screen
                            name="Login" component={Login}
                        />
                        <RootStack.Screen
                            name="Calendar" component={Calendar}
                        />
                        <RootStack.Screen
                            name="MonthList" component={MonthList}
                        />
                        <RootStack.Screen
                            name="ChatMain" component={ChatMain}
                        />
                        <RootStack.Screen
                            name="MyPageMain" component={MyPageMain}
                        />
                        <RootStack.Screen
                            name="MyPageProfile" component={MyPageProfile}
                        />
                        <RootStack.Screen
                            name="MyPageNotice" component={MyPageNotice}
                        />
                        <RootStack.Screen
                            name="MyPageAlarm" component={MyPageAlarm}
                        />
                        <RootStack.Screen
                            name="MyPageEnquire" component={MyPageEnquire}
                        />
                        <RootStack.Screen
                            name="SignUp1" component={SignUp1}
                        />
                        <RootStack.Screen
                            name="SignUp2" component={SignUp2}
                        />
                        <RootStack.Screen
                            name="SignUp3" component={SignUp3}
                        />
                        <RootStack.Screen
                            name="ProfileEdit" component={ProfileEdit}
                        />
                        <RootStack.Screen
                            name="DeleteAccount" component={DeleteAccount}
                        />
                        <RootStack.Screen
                            name="ScheduleAdd" component={ScheduleAdd}
                        />
                    </RootStack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </NativeBaseProvider>
    );
}
