import React, {Component, useEffect, useState} from 'react';
import {Alert, Button, Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import * as sub1 from './sub';
import * as cu from './commonUtil';
import styles from './commonCss';


function TestView1() {
    return (
        <View>
            <Text>오호홍2222233333333322222222222222333333323</Text>
        </View>
    );
}



function MooratoMain() {
    const [number, setNumber] = useState(0);
    useEffect(() => {
        callApi2();
    },[]);
    return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <Text
                    style={{backgroundColor: 'red'}}
                >버킷리스트
                </Text>
            </View>
            <View style={styles.contentsView}></View>
        </View>
    );
}

// API 호출
function callApi2() {

    const param = {
        svcGb: 'B',
        userId: 'oper250',
        pwd: 'Camac250#',
    }

    cu.callApi('https://j-devs.net/bucket/login', param, 'post');
}

function testFn() {
    sub1.testFn2();
}





export default MooratoMain;
