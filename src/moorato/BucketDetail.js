import React, {useState, Component, useEffect, useLayoutEffect} from 'react';
import {Alert,Button,Image,Platform,StyleSheet,Text,View,TouchableOpacity,ImageBackground,FlatList,BackHandler,ActivityIndicator} from 'react-native';
import {Header} from './Header.js';
import styles from './commonCss';
import * as cu from './commonUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';


function BucketDetail({ navigation, route }) {
    const [loding, setLoding] = useState(false);
    const [repImgUrl, setRepImgUrl] = useState('');         // 버킷 대표이미지
    const [bucketNm, setBucketNm] = useState('');           // 버킷 대표제목
    const [bucketDscr, setBucketDscr] = useState('');       // 버킷 대표설명
    const [profileImg, setProfileImg] = useState('');       // 프로필 이미지
    const [storyList, setStoryList] = useState([]);         // 스토리리스트
    const [stNo, setStNo] = useState(0);                    // 조회시작번호
    const [storyMoreYn, setStoryMoreYn] = useState(0);      // 스토리조회 더보기여부
    const [btmLoding, setBtmLoding] = useState(false);      // 바닥 더보기 로딩바
    const [storyNo, setStoryNo] = useState(false);          // 선택한 스토리

    useEffect(() => {
        getBucketDetail();      // 버킷 상세정보 가져오기
        getStoryItems();        // 스토리 리스트 가져오기

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        // 프로필사진 set 하드코딩
        setProfileImg('https://img.j-devs.net/study-app/bucket/rep/202211/V87Xnvho2022112823xI1t5t.jpg');

        return () => backHandler.remove();
    },[]);

    // 헤더 타이틀 SET
    useLayoutEffect(() => {
        navigation.getParent().setOptions({
            title: '상세화면',
            headerLeft: () => (
                <View style={{marginLeft: 20, }}>
                    <Ionicons
                        onPress={backAction}
                        name="arrow-back" color={'black'} size={25}/>
                </View>
            ),
        });
    },[navigation]);

    const backAction = () => {
        if(route.params.callerIsWrite) {
            navigation.reset({routes: [{name: "BucketMain"}]});
        } else {
            navigation.goBack();
        }
        return true;
    }

    // 버킷 디테일 정보 가져오기
    function getBucketDetail() {
        const param = {
            bucketSeqno: route?.params.bucketSeqno,
        }

        let setLodingFlag = setLoding;

        cu.callApi('https://j-devs.net/bucket/getBucketDtlItem', param, 'post', setLodingFlag, ( data ) => {
            setRepImgUrl(data.item.repImgUrl);
            setBucketNm(data.item.bucketNm);
            setBucketDscr(data.item.bucketDscr);
        });
    }

    function getStoryItems(moreFlag) {
        const param = {
            bucketSeqno: '7',
            stNo: stNo,
        }

        let setLodingFlag = setLoding;

        if(moreFlag) {
            setLodingFlag = setBtmLoding;
        }

        cu.callApi('https://j-devs.net/bucket/getStoryItems', param, 'post', setLodingFlag, ( data ) => {
            setStNo(data.nextStNo);                             // 다음조회시작번호 set
            setStoryMoreYn(data.moreYn);                       // 더보기여부 set
            setStoryList([...storyList, ...data.items])
        });
    }

    // 스토리 클릭 이벤트
    function onPressStory(no) {
        // flatListRef?.current?.scrollToEnd();
        // flatListRef?.current?.scrollToItem(85);
        navigation.jumpTo('StoryDetail', { no: no });
    }

    function onEndReached() {
        if(storyMoreYn == "Y") {          // 더보기여부
            getStoryItems(true);
        }
    }

    function storyView({item}) {
        return (
            <TouchableOpacity
                style={styles.storyBox}
                activeOpacity={0.9}
                onPress={() => {
                    onPressStory(item.no);
                }}
            >
                <Image
                    style={styles.storyImg}
                    source={item.imgUrl ? {uri: item.imgUrl} : null}
                />
                <Text numberOfLines={1} style={styles.storyDscr}>
                    {item.sotryDscr}
                </Text>
            </TouchableOpacity>
        );
    }

    function moreGetStoryItems() {
        return (
            <>
                { btmLoding ? (
                    <View style={styles.spinner}>
                        <ActivityIndicator size="large" color={'#fa8e81'} />
                    </View>
                ): (<View style={styles.spinner}/>)
                }
            </>
        )
    }

    return (
        <View style={styles.mainView}>
            <ImageBackground style={styles.bucketRepBg}
                             source={repImgUrl ? {uri: repImgUrl } : null}
            >
                <View style={styles.bucketRepContent}>
                    <Image
                        style={styles.profileImg}
                        source={profileImg ? {uri: profileImg} : null}
                    />
                    <View style={styles.bucketRepTitle}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{fontSize: 18, fontWeight: 'bold'}}>{bucketNm}</Text>
                        <Text numberOfLines={2} ellipsizeMode={'tail'} style={{fontSize: 15}}>{bucketDscr}</Text>
                    </View>
                </View>
            </ImageBackground>
            <View style={styles.storysDiv}>
                <FlatList keyExtractor={item => item.no}
                          data={storyList}
                          horizontal={false}
                          contentContainerStyle={{marginHorizontal: '2%', marginTop: '2%', paddingBottom: 20,}}
                          disableVirtualization={false}                 // 비정상적인 스크롤 동작을 방지하려고
                          onEndReached={onEndReached}                   // 바닥에 닿았을때 이벤트
                          onEndReachedThreshold={0.8}                   // 바닥이벤트 발생 퍼센트
                          ListFooterComponent={moreGetStoryItems}      // 바닥 view
                          numColumns={3}
                          renderItem={storyView}
                />
            </View>
        </View>
    );
}

export default BucketDetail
