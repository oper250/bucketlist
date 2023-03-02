import React, {useState, Component, useEffect, useLayoutEffect} from 'react';
import {Alert,Button,Image,Platform,StyleSheet,Text,View,TouchableOpacity,ImageBackground,FlatList,BackHandler,ActivityIndicator} from 'react-native';
import {Header} from 'StudyApp/src/moorato/Header.js';
import styles from 'StudyApp/src/moorato/commonCss';
import * as cu from 'StudyApp/src/moorato/commonUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function Alarm({ navigation, route }) {
    const img = 'https://img.j-devs.net/study-app/bucket/rep/202212/TR44L4Y320221202Ua3JVFH2.jpg';
    useEffect(() => {

    }, []);

    return (
        <View style={[styles.mainView, {paddingVertical: 30, backgroundColor: '#fff'}]}>
            <View style={{borderBottomWidth: 0.6, paddingTop: 25, borderColor: '#ddd', flexDirection: 'row', width: '100%', height: 130,}}>
                <View style={{marginLeft: 20, width: '20%', }}>
                    <Image
                        style={styles.profileImg}
                        source={img ? {uri: img} : null}
                    />
                </View>
                <View style={{marginLeft: 15, }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16,}}>첫번째 버킷 달성 축하! </Text>
                    <Text style={{marginTop: 10,}}>새로운 칭호가 부여됩니다!!</Text>
                </View>
            </View>
            <View style={{borderBottomWidth: 0.6, paddingTop: 25, borderColor: '#ddd', flexDirection: 'row', width: '100%', height: 130,}}>
                <View style={{marginLeft: 20, width: '20%', }}>
                    <Image
                        style={styles.profileImg}
                        source={img ? {uri: img} : null}
                    />
                </View>
                <View style={{marginLeft: 15, }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16,}}>데드캣 회원가입을 진심으로 축하합니다. </Text>
                    <Text style={{marginTop: 10,}}>당신의 소중한 인생을 항상 응원하겠습니다.</Text>
                </View>
            </View>
        </View>
    );
}

export function Message({ navigation, route }) {
    useEffect(() => {

    }, []);

    return(
        <View style={[styles.mainView, {paddingVertical: 30, backgroundColor: '#fff'}]}>
            <Text>
                알람이 없습니다.
            </Text>
        </View>
    );
}

export function Mension({ navigation, route }) {
    useEffect(() => {

    }, []);

    return(
        <View style={[styles.mainView, {paddingVertical: 30, backgroundColor: '#fff'}]}>
            <Text>
                멘션이 없습니다.
            </Text>
        </View>
    );
}
