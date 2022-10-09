import React, {Component} from 'react';
import {Alert, Text, View} from 'react-native';

export function testFn1() {
    Alert.alert("테스트fn111");
}

export function testFn2() {
    Alert.alert("테스트fn222");
}

export function testFn3() {
    return (
        <View>
            <Text>오호홍</Text>
        </View>
    );
}

