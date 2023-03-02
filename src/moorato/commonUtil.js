import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {ActivityIndicator, Alert, Text, View} from 'react-native';
import styles from './commonCss';

/* REST API 호출 */
export function callApi(url, data, method, setLodingFlag, callback) {
    if(setLodingFlag) setLodingFlag(true);

    axios({
        method: method,
        url: url,
        data : data,
        responseType: "json",

    }).then(function (response) {
        console.log( '-------------------RESULT-------------------' );
        console.log( response.data );
        console.log( '--------------------------------------------' );
        if(setLodingFlag) setLodingFlag(false);
        if(callback) callback( response.data );
    }).catch(function( e ){
        console.log( '-------------------ERROR!-------------------' );
        console.log(e.message);
        console.log( '--------------------------------------------' );
    });
}

export function confirm(callback) {
    Alert.alert(
        '이 게시물을 삭제하시겠어요?',
        '30일 이내에 내 활동의 최근 삭제항목에서 이 게시물을 복원할 수 있습니다.',
        [
            {text: '취소', onPress: () => {}, style: 'cancel'},
            {
                text: '삭제',
                onPress: () => {
                    callback();
                },
                style: 'destructive',
            },
        ],
        {
            cancelable: true,
            onDismiss: () => {},
        },
    );
}

export function MainView(props) {
    return (
        <View style={styles.mainView}>
            { props.loding ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color={'#fa8e81'} />
                </View>
            ) : (
                <View>
                    <Text>{'asdddddddddddddddddddd'}</Text>
                </View>
            )}
        </View>
    )
}


