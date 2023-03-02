import React, {Component, useEffect, useState, useLayoutEffect, useRef} from 'react';
import {UIManager, Animated, Pressable, Modal, Alert, Button, Image, Platform, StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, LayoutAnimation} from 'react-native';
import * as cu from './commonUtil';
import styles from './commonCss';
import Login from './Login';
import {Header} from './Header.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function MyBucket({navigation, route}) {
    const [loding, setLoding] = useState(false);                            // 메인 로딩바
    const [btmLoding, setBtmLoding] = useState(false);                      // 바닥 더보기 로딩바
    const [bucketList, setBucketList] = useState('');                       // 버킷리스트
    const [stNo, setStNo] = useState(0);                                    // 조회시작번호
    const [bucketMoreYn, setBucketMoreYn] = useState("N")                   // 더보기 여부
    const flatListRef = useRef(FlatList);                                   // FLATLIST 접근 객체
    const [isDelModalVisible, setIsDelModalVisible] = useState(false);      // 삭제 모달여부
    const [isPlusModalVisible, setIsPlusModalVisible] = useState(false);    // 플러스 모달여부
    const isFocused = useIsFocused();                                       // isFoucesd Define
    const animaOpacityFlag = useRef(new Animated.Value(0)).current;         // 애니메이션 fade효과
    const animaSizeFlag = useRef(new Animated.Value(1)).current;            // 애니메이션 크기변경효과
    const animaLocationXFlag = useRef(new Animated.Value(0)).current;        // 애니메이션 위치변경효과
    const animaLocationYFlag = useRef(new Animated.Value(0)).current;        // 애니메이션 위치변경효과
    const animaLocationYFlag2 = useRef(new Animated.Value(0)).current;        // 애니메이션 위치변경효과

    useEffect(() => {
        getBucketItems();
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    },[]);

    useLayoutEffect(() => {
        navigation.getParent().setOptions({
            title: 'DeadCat',
        });
        navigation.setOptions({
            title: '나의 버킷',
        });
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" }});
    },[]);

    useLayoutEffect(() => {
        // 로그아웃 이모티콘
        navigation.getParent().setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={onPressGoLogin}
                    style={{marginRight: 20, }}>
                    <AntDesign name="login" color={'black'} size={25}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    // 로그인화면 이동
    function onPressGoLogin() {
        navigation.navigate('Login');
    }

    // 버킷 클릭이벤트 => 버킷 상세화면 이동
    function onPressBucket(bucketSeqno) {
        // flatListRef?.current?.scrollToEnd();
        // flatListRef?.current?.scrollToItem(85);
        navigation.navigate('DetailView', {'bucketSeqno': bucketSeqno});
    }

    const getBucketItems = (moreFlag) => {
        const param = {
            stNo: stNo
        }

        let setLodingFlag = setLoding;

        if(moreFlag) {
            setLodingFlag = setBtmLoding;
        }

        cu.callApi('https://j-devs.net/bucket/getBucketItems', param, 'post', setLodingFlag, ( data ) => {
            setStNo(data.nextStNo);                             // 다음조회시작번호 set
            setBucketMoreYn(data.moreYn);                       // 더보기여부 set
            setBucketList([...bucketList, ...data.items]);      // 버킷리스트 set
        });
    }

    const layoutAniConfig = {
        duration: 300,
        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
        },
        delete: {
            duration: 100,
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
        },
    };

    // 쓰레기통 아이콘 클릭이벤트 => 버킷 제거
    function onDeleteBucket(bucketSeqno) {
        const param = {
            bucketSeqno: bucketSeqno
        }

        cu.confirm(() => {
            cu.callApi('https://j-devs.net/bucket/delBucket', param, 'post', setIsDelModalVisible, ( data ) => {
                if(data.delYn == "Y") {         // 정상적으로 삭제된 경우
                    // bucketList state에서 해당데이터 삭제
                    setBucketList(prevBucketList => {
                        return prevBucketList.filter(item => {
                            return item.bucketSeqno != bucketSeqno
                        });
                    });

                    LayoutAnimation.configureNext(layoutAniConfig);
                }
            });
        })
    }

    function onEndReached() {
        if(bucketMoreYn == "Y") {          // 더보기여부
            getBucketItems(bucketMoreYn);
        }
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

    // 삭제중 모달 스피너 팝업
    function DeleteModalView() {
        return (
            <Modal
                style={styles.modalContainer}
                animationType={"fade"}
                transparent={true}
                visible={isDelModalVisible}
            >
                <View style={styles.modalWrap}>
                    <View style={styles.modalSpinnerWrap}>
                        <ActivityIndicator style={styles.aa} size="small" color={'#fa8e81'} />
                        <Text style={styles.bb}>삭제중</Text>
                    </View>
                </View>
            </Modal>
        );
    }

    // 플러스버튼 모달 액션
    function PlusModalView() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={isPlusModalVisible}
                onRequestClose={onClosePlusBtn}
            >
                <Pressable
                    onPressOut={() => {onClosePlusBtn()}}
                    style={styles.modalWhiteWrap}>
                    <TouchableOpacity
                        onPress={onPressCameraBtn}
                        activeOpacity={0.9} style={[styles.btnCameraOverModal, {opacity: animaOpacityFlag, transform: [{translateY: animaLocationYFlag2}, {scale: animaSizeFlag}]}]}>
                        <AntDesign name="camerao" color={'#fff'} size={15} backgroundColor={'#0c6cd3'}>
                        </AntDesign>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressPhotoBtn}
                        activeOpacity={0.9} style={[styles.btnPhotoOverModal, {opacity: animaOpacityFlag, transform: [{translateX: animaLocationXFlag}, {translateY: animaLocationYFlag}, {scale: animaSizeFlag}]}]}>
                        <FontAwesome name="photo" color={'#fff'} size={15} backgroundColor={'#0c6cd3'}>
                        </FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressPlusBtn}
                        activeOpacity={1} style={styles.btnWriteOverModal}>
                        <Ionicons name="add" color={'#fff'} size={25} backgroundColor={'#0c6cd3'} />
                    </TouchableOpacity>
                </Pressable>
            </Modal>
        );
    }

    function onPressCameraBtn() {
        setIsPlusModalVisible(false);
        navigation.navigate('WriteBucket', {'writeGubun': 'camera'});
    }

    function onPressPhotoBtn() {
        setIsPlusModalVisible(false);
        navigation.navigate('WriteBucket', {'writeGubun': 'photo'});
    }

    function onClosePlusBtn() {
        Animated.timing(animaLocationYFlag2, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(animaLocationXFlag, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(animaLocationYFlag, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(animaOpacityFlag, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(animaSizeFlag, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start(() => setIsPlusModalVisible(false));
    }
    // 플러스 버튼 클릭
    function onPressPlusBtn() {
        Animated.timing(animaLocationYFlag2, {
            toValue: -130,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(animaLocationXFlag, {
            toValue: -60,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(animaLocationYFlag, {
            toValue: -70,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(animaOpacityFlag, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
        Animated.timing(animaSizeFlag, {
            toValue: 2,
            duration: 100,
            useNativeDriver: true,
        }).start();
        setIsPlusModalVisible(true);
    }

    function ItemView({item}) {
        return(
            <TouchableOpacity
                style={styles.bucketItem}
                activeOpacity={0.7}
                onPress={() => {onPressBucket(item.bucketSeqno)}}
            >
                <Image
                    style={styles.bucketImg}
                    source={item.repImgUrl ? {uri: item.repImgUrl } : null}
                />
                <View style={styles.bucketDescView}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.bucketTitle}>{item.bucketNm}</Text>
                        <Entypo name="dots-three-vertical" color={'#b7b7b7'} size={20}/>
                    </View>
                    <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.bucketDesc}>{item.bucketDscr}</Text>
                    <View style={{textAlign: 'right', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <AntDesign name="hearto" color={'black'} size={20}/>
                            <Text style={{marginLeft: 3, fontSize: 10, color: 'red'}}>3</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <AntDesign name="message1" color={'black'} size={20}/>
                            <Text style={{marginLeft: 3, fontSize: 10, color: 'red'}}>11</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <AntDesign name="filetext1" color={'black'} size={20}/>
                            <Text style={{marginLeft: 3, fontSize: 10, color: 'red'}}>25</Text>
                        </View>
                        <Ionicons name="trash-outline" color={'black'} size={20} onPress={() => {onDeleteBucket(item.bucketSeqno)}} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainView}>
            <DeleteModalView/>
            <PlusModalView/>
            { loding ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color={'#fa8e81'} />
                </View>
            ) : (
                <View style={styles.contentsView}>
                    <FlatList ref={flatListRef}
                              keyExtractor={item => item.bucketSeqno}       // 키값
                              data={bucketList}                             // 대상 리스트
                              contentContainerStyle={{paddingBottom: 25}}   // flatlist style
                              disableVirtualization={false}                 // 비정상적인 스크롤 동작을 방지하려고
                              renderItem={ItemView}                         // 반복 View
                              ListFooterComponent={showBottomSpinner}      // 바닥 view
                              onEndReached={onEndReached}                   // 바닥에 닿았을때 이벤트
                              onEndReachedThreshold={0.7}                   // 바닥이벤트 발생 퍼센트
                    />
                    <TouchableOpacity
                        onPress={onPressPlusBtn}
                        activeOpacity={0.9} style={styles.btnWrite}>
                        <Ionicons name="add" color={'#fff'} size={25} backgroundColor={'#0c6cd3'}>
                        </Ionicons>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default MyBucket;
