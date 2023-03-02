import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, {Component, useEffect, useLayoutEffect, useState} from 'react';
import {Dimensions, Text, View, Alert, Platform, UIManager} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Alarm, Message, Mension} from './src/moorato/alarm/Alarm'
import {HashGroup} from './src/moorato/hashGroup/HashGroup'
import reactGesture from 'react-native-gesture-handler';
import MyBucket from './src/moorato/MyBucket';
import OtherBucket from './src/moorato/OtherBucket';
import Login from './src/moorato/Login';
import BucketDetail from './src/moorato/BucketDetail';
import StoryDetail from './src/moorato/StoryDetail';
import WriteBucket from './src/moorato/WriteBucket';
import Intro from './src/moorato/Intro';
import MyInfo from './src/moorato/myInfo/MyInfo';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function BucketStack({navigation, route}) {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName !== 'BucketMain') { //MyPage이외의 화면에 대해 tabBar none을 설정한다.
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        } else {
            navigation.setOptions({tabBarStyle: {display: undefined}});
        }
    }, [navigation, route]);


    return (
        <Stack.Navigator
            initialRouteName={"Intro"}
            initialLayout={{
                width: Dimensions.get('window').width      // 초기성능 향상
            }}
            screenOptions={() => ({
                animationEnabled: true,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: "white",
                    borderBottomColor: "#eeeeee",
                    shadowColor: "white",
                    height: 50,
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: '#3b5066',
                },
                headerLeft: () => (
                    <View style={{marginLeft: 20,}}>
                        <AntDesign
                            name="github" color={'black'} size={25}/>
                    </View>
                ),
            })}
        >
            <Stack.Screen name="Intro" component={Intro}></Stack.Screen>
            <Stack.Screen
                name="BucketMain" component={BucketMain}></Stack.Screen>
            <Stack.Screen
                name="DetailView" component={DetailView}></Stack.Screen>
            <Stack.Screen name="WriteBucket" component={WriteBucket}></Stack.Screen>
            <Stack.Screen
                options={{
                    presentation: 'modal',
                }}
                name="Login" component={Login}></Stack.Screen>
        </Stack.Navigator>
    )
}

function BucketMain() {
    return (
        <TopTab.Navigator
            screenOptions={{
        }}
        >
            <TopTab.Screen name="MyBucket" component={MyBucket} />
            <TopTab.Screen name="OtherBucket" component={OtherBucket} />
        </TopTab.Navigator>
    );
}

function DetailView({navigation, route}) {
    return (
        <TopTab.Navigator
            screenOptions={({route, navigation}) => ({
                tabBarShowLabel: false,
                tabBarItemStyle: { width: 10 },
                tabBarStyle: { display: 'none' },
                tabBarIndicatorStyle: {display: 'none'},
                lazy: true,
            })}
        >
            <TopTab.Screen
                options={{
                    tabBarShowLabel: false,
                }}
                initialParams={{'bucketSeqno': route.params.bucketSeqno, 'callerIsWrite': route.params.callerIsWrite}}
                name="BucketDetail" component={BucketDetail} />
            <TopTab.Screen
                options={{
                    tabBarShowLabel: false,
                }}
                name="StoryDetail" component={StoryDetail} />
        </TopTab.Navigator>
    );
}

function AlarmView({navigation, route}) {
    return (
        <TopTab.Navigator
            screenOptions={({route, navigation}) => ({
            })}
        >
            <TopTab.Screen
                name="Alarm" component={Alarm} />
            <TopTab.Screen
                name="Message" component={Message} />
            <TopTab.Screen
                name="Mension" component={Mension} />
        </TopTab.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarActiveTintColor: '#fcfcfc',
                    tabBarInactiveTintColor: '#d3c0cf',
                    tabBarActiveBackgroundColor: '#3b5066',
                    tabBarInactiveBackgroundColor: '#3b5066',
                    tabBarLabelStyle: {marginBottom: 5,},
                    tabBarIconStyle: {marginTop: 5,},
                    animationEnabled: true,
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: "white",
                        borderBottomColor: "#eeeeee",
                        shadowColor: "white",
                        height: 50,
                    },
                    headerLeft: () => (
                        <View style={{marginLeft: 20,}}>
                            <AntDesign
                                name="github" color={'black'} size={25}/>
                        </View>
                    ),
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 15,
                        color: '#3b5066',
                    },
                }}>
                <BottomTab.Screen
                    name="Home"
                    component={BucketStack}
                    options={({ navigation, route }) => ({
                        headerShown: false,
                        title: '홈',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="home" color={color} size={25} />
                        ),
                    })}
                />
                <BottomTab.Screen
                    name="HashGroup"
                    component={HashGroup}
                    options={{
                        headerShown: true,
                        title: '해시그룹',
                        tabBarIcon: ({color, size}) => (
                            <AntDesign name="search1" color={color} size={25}/>
                        ),
                    }}
                />
                <BottomTab.Screen
                    name="AlarmView"
                    component={AlarmView}
                    options={({ navigation, route }) => ({
                        headerShown: true,
                        title: '알람',
                        tabBarIcon: ({color, size}) => (
                            <AntDesign name="bells" color={color} size={25} />
                        ),
                    })}
                />
                <BottomTab.Screen
                    name="MyInfo"
                    component={MyInfo}
                    options={{
                        headerShown: true,
                        title: '내정보',
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="face-man" color={color} size={25} />
                        ),
                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
}

export default App;
