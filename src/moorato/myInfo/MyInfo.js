import React, {useState, Component, useEffect, useLayoutEffect} from 'react';
import {Alert,Button,Image,Platform,StyleSheet,Text,View,TouchableOpacity,ImageBackground,FlatList,BackHandler,ActivityIndicator} from 'react-native';
import {Header} from 'StudyApp/src/moorato/Header.js';
import styles from 'StudyApp/src/moorato/commonCss';
import * as cu from 'StudyApp/src/moorato/commonUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function MyInfo({ navigation, route }) {
    useEffect(() => {

    }, []);

    return(
        <View style={[styles.mainView, {paddingVertical: 30, backgroundColor: '#fff'}]}>
            <Text>
                개발중
            </Text>
        </View>
    );
}

export default MyInfo;
