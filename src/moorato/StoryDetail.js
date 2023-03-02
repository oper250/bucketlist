import React, {useState, Component, useEffect, useLayoutEffect, useRef} from 'react';
import {Alert,Button,Image,Platform,StyleSheet,Text,View,TouchableOpacity,ImageBackground,FlatList,BackHandler,ActivityIndicator} from 'react-native';
import {Header} from './Header.js';
import styles from './commonCss';
import * as cu from './commonUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused } from '@react-navigation/native';


function StoryDetail({navigation, route}) {
    const [loding, setLoding] = useState(false);
    const [storyList, setStoryList] = useState([]);         // 스토리리스트
    const [profileImg, setProfileImg] = useState('');       // 프로필 이미지
    const [storyMoreYn, setStoryMoreYn] = useState(0);      // 스토리조회 더보기여부
    const [stNo, setStNo] = useState(0);                    // 조회시작번호
    const [nextStNo, setNextStNo] = useState(0);            // 조회시작번호
    const [btmLoding, setBtmLoding] = useState(false);      // 바닥 더보기 로딩바
    const flatListRef = useRef(FlatList);                   // FLATLIST 접근 객체
    const isFocused = useIsFocused();

    useEffect(() => {
        // 프로필사진 set 하드코딩
        //setProfileImg('https://img.j-devs.net/study-app/bucket/rep/202211/V87Xnvho2022112823xI1t5t.jpg');
        setProfileImg('https://img.j-devs.net/study-app/bucket/rep/202211/9H0JCIvC202211132Ra91lJU.jpg');

    },[]);

    useEffect(() => {
        if(isFocused && route.params.no <= stNo) {      // 포커스 상태 and 넘어온 stno값이 더 작은 경우
            flatListRef?.current?.scrollToIndex({animated: false, index: route.params.no - 1});
        }

        if(isFocused && route.params.no > stNo) {     // 포커스 상태 and 넘어온 stno값이 더 큰 경우
            const param = {
                bucketSeqno: '7',
                stNo: 0,
                searchCnt: route.params.no + 30,
            }

            setStNo(route.params.no);

            let setLodingFlag = setLoding;

            cu.callApi('https://j-devs.net/bucket/getStoryItems2', param, 'post', setLodingFlag, ( data ) => {
                setNextStNo(data.nextStNo);                             // 다음조회시작번호 set
                setStoryMoreYn(data.moreYn);                            // 더보기여부 set
                setStoryList([...data.items])
            });
        }
    },[isFocused, route]);

    function getStoryItems(moreFlag) {
        const param = {
            bucketSeqno: '7',
            stNo: nextStNo,
        }

        let setLodingFlag = setLoding;

        if(moreFlag) {
            setLodingFlag = setBtmLoding;
        }

        cu.callApi('https://j-devs.net/bucket/getStoryItems', param, 'post', setLodingFlag, ( data ) => {
            setNextStNo(data.nextStNo);                             // 다음조회시작번호 set
            setStoryMoreYn(data.moreYn);                       // 더보기여부 set
            setStoryList([...storyList, ...data.items])
        });
    }

    // 바닥 로딩바 구현
    function showBottomSpinner() {
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

    // 스크롤이 바닥에 근접했을 경우 이벤트
    function onEndReached() {
        if(storyMoreYn == "Y") {          // 더보기여부
            getStoryItems(storyMoreYn);
        }
    }

    // 스토리 클릭 이벤트
    function onPressStory() {

    }

    // 화면 랜더링 완료 후 실행되는 이벤트
    function onLayout(e) {
        if(isFocused && storyList.length > 0) {
            flatListRef?.current?.scrollToIndex({animated: false, index: route.params.no - 1});
        }
    }

    function getItemLayout(data, index) {
        return {
            length: storyList.length,
            offset: 680.1777954101562 * index,
            index,
        }
    }

    // 스토리 아이템뷰
    function ItemView({item}) {
        console.log("~~~~~~~~~~~~~~~", item);

        return(
            <TouchableOpacity
                onPress={() => {onPressStory()}}
                activeOpacity={0.9}
                style={styles.storyItemBig}
            >
                <View style={{width: '100%', height: '75%', }}>
                    <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', height: '5%'}}>
                        <Entypo
                            onPress={() => {onPressThreeDot(item.sotryDscr)}}
                            name="dots-three-horizontal" color={'#7a7a7a'} size={25} backgroundColor={'#0c6cd3'}/>
                    </View>
                    <Image
                        style={styles.storyImgBig}
                        source={item.imgUrl ? {uri: item.imgUrl } : null}
                    />
                </View>
                <View style={{flexDirection: 'column', width: '100%', height: '25%', }}>
                    <View style={{flexDirection: 'row', width: '100%', height: '40%', }}>
                        <View style={{width: '20%',}}>
                            <Image
                                style={styles.profileImg2}
                                source={profileImg ? {uri: profileImg} : null}
                            />
                        </View>
                        <View style={{width: '70%', paddingVertical: 7,}}>
                            <Text style={{fontSize: 15, fontWeight: '600',}}>{item.name}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#999999'}}>{item.userId}</Text>
                                <Text style={{color: '#7cb4f8', fontWeight: 'bold'}}> - FOLLOW</Text>
                            </View>
                        </View>
                        <Text style={{alignSelf: 'flex-start',}}>4일전</Text>
                    </View>
                    <View style={{height: '50%', marginTop: 5,}}>
                        <Text style={{fontSize: 17, color: '#1c1c1c'}}>{item.sotryDscr}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainView}>
            { loding ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color={'#fa8e81'} />
                </View>
            ) : (
                <View style={styles.contentsView}>
                    <FlatList ref={flatListRef}
                              style={{width: '100%'}}
                              onLayout={onLayout}
                              keyExtractor={item => item.no}                // 키값
                              data={storyList}                              // 대상 리스트
                              contentContainerStyle={{paddingBottom: 25}}   // flatlist style
                              disableVirtualization={false}                 // 비정상적인 스크롤 동작을 방지하려고
                              renderItem={ItemView}                         // 반복 View
                              ListFooterComponent={showBottomSpinner}       // 바닥 view
                              onEndReached={onEndReached}                   // 바닥에 닿았을때 이벤트
                              onEndReachedThreshold={0.7}                   // 바닥이벤트 발생 퍼센트
                              getItemLayout={getItemLayout}                 // 아이템 크기 셋팅
                    />
                </View>
            )}
        </View>
    );
}

export default StoryDetail;
