import React, {Component, useEffect, useState} from 'react';
import {Alert, Button, Image, Platform, StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import * as sub1 from './sub';
import * as cu from './commonUtil';
import styles from './commonCss';
import {Header} from './Header.js';

function MooratoMain() {
    const [bucketList, setBucketList] = useState([]);

    useEffect(() => {
        getBucketItems();
    },[]);

    const getBucketItems = () => {
        const param = {
            stNo: 0
        }

        cu.callApi('https://j-devs.net/bucket/getBucketItems', param, 'post', ( data ) => {
            setBucketList(data);
        });
    }

    return (
        <View style={styles.mainView}>
            <Header title={'버킷리스트1'}/>
            <View style={styles.contentsView}>

                <ViewBucketList2 rsList={bucketList} />

            </View>
        </View>
    );
}

function ViewBucketList2(props) {
    function aa(param) {
        Alert.alert(param);
        console.log("!!!!!!!!!!!!!!!", props.rsList.items);
    }

    return (
        <FlatList keyExtractor={item => item.bucketSeqno}
                  data={props.rsList.items}
                  renderItem={({item}) =>
                      <TouchableOpacity
                          style={styles.bucketItem}
                          activeOpacity={0.9}
                          onPress={() => {aa(item.bucketNm)}}
                          >
                          <Image
                              style={styles.bucketImg}
                              source={{uri: item.repImgUrl}}
                          />
                          <View style={styles.bucketDescView}>
                              <Text style={styles.bucketTitle}>{item.bucketNm}</Text>
                              <Text style={styles.bucketDesc}>{item.bucketDscr}</Text>
                          </View>
                      </TouchableOpacity>
        }

        />
    );
}

// API 호출
function login() {
    const param = {
        svcGb: 'B',
        userId: 'oper250',
        pwd: 'Camac250#',
    }

    cu.callApi('https://j-devs.net/bucket/login', param, 'post');
}

export default MooratoMain;
