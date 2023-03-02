import React, {useState, Component, useEffect, useLayoutEffect, useRef} from 'react';
import {Alert,Button,Image,Platform,StyleSheet,Text,View,TouchableOpacity,ImageBackground,FlatList,BackHandler,ActivityIndicator} from 'react-native';
import {Header} from './Header.js';
import styles from './commonCss';
import * as cu from './commonUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from '@react-navigation/native';

function Login({navigation, route}) {


    return (
        <View style={{backgroundColor: '#fff', }}>
            <Text>로그인 화면</Text>
        </View>
    )
}

export default Login;
