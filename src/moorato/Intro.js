import React, {Component, useEffect, useState, useLayoutEffect, useRef} from 'react';
import {Modal, Alert, Button, Image, Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, LayoutAnimation} from 'react-native';
import * as cu from './commonUtil';
import styles from './commonCss';
import LottieView from 'lottie-react-native';
import FadeInOut from 'react-native-fade-in-out';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

function Intro({navigation, route}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(!visible);
        setTimeout(() => {
            //navigation.navigate('BucketMain');
            navigation.reset({routes: [{name: "BucketMain"}]});
        }, 3000)
    },[]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '버킷리스트',
            headerShown: false,
        });
        navigation.getParent()?.setOptions({
            tabBarStyle: { display: "none" }
        });
    },[]);

    return (
        <View
            style={{
                flex: 1,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <LottieView
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#c0d3e8',
                }}
                source={require('./animations/14592-loader-cat.json')}
                autoPlay
                loop={true}
            />
            <FadeInOut style={styles.introLogo} visible={visible} duration={1500}>
                <EvilIcons style={styles.criteriaRow} name="sc-github" color={'white'} size={40} backgroundColor={'#ff0000'}></EvilIcons>
                <Text style={{color: '#fff', fontSize: 20,}}>Dead Cat</Text>
            </FadeInOut>
        </View>
    );
}

export default Intro;
