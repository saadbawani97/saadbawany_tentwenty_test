import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WatchScreen } from '../../Screens/WatchScreen';
import { Colors, Fonts, Icons, Images, Metrix } from '../../config';
import { Image, Text, View } from 'react-native';
import styles from './styles';
import { ComingSoon } from '../../Screens/ComingSoon';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarContainer,
            }}>
            <Tab.Screen
                name="Dashboard"
                component={ComingSoon}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image source={Images.dashboardIcon} style={{
                                width: Metrix.HorizontalSize(18),
                                height: Metrix.HorizontalSize(18),
                                resizeMode: 'contain'
                            }}
                            />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={[
                                    styles.textStyle,
                                    focused && {
                                        color: Colors.White,
                                        fontFamily: Fonts['Poppins-Bold'],
                                    },
                                ]}>
                                Dashboard
                            </Text>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Watch"
                component={WatchScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image source={Images.watchIcon} style={{
                                width: Metrix.HorizontalSize(18),
                                height: Metrix.HorizontalSize(18),
                                resizeMode: 'contain'
                            }}
                            />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={[
                                    styles.textStyle,
                                    focused && {
                                        color: Colors.White,
                                        fontFamily: Fonts['Poppins-Bold'],
                                    },
                                ]}>
                                Watch
                            </Text>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Media Library"
                component={ComingSoon}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icons.Ionicons
                                name="folder-open-sharp"
                                color={focused ? 'white' : 'grey'}
                                size={20}
                            />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={[
                                    styles.textStyle,
                                    focused && {
                                        color: Colors.White,
                                        fontFamily: Fonts['Poppins-Bold'],
                                    },
                                ]}>
                                Media Library
                            </Text>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="More"
                component={ComingSoon}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icons.Octicons
                                name="list-unordered"
                                color={focused ? 'white' : 'grey'}
                                size={20}
                            />
                        );
                    },
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text
                                style={[
                                    styles.textStyle,
                                    focused && {
                                        color: Colors.White,
                                        fontFamily: Fonts['Poppins-Bold'],
                                    },
                                ]}>
                                More
                            </Text>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
