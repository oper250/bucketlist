import React, {Component, useEffect, useState, useLayoutEffect, useRef} from 'react';
import {
    Pressable,
    Modal,
    TextInput,
    Alert,
    Button,
    Image,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    LayoutAnimation,
    BackHandler,
    ImageBackground
} from 'react-native';
import * as cu from './commonUtil';
import styles from './commonCss';
import {Header} from './Header.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';


function WriteBucket({navigation, route}) {
    const [isRegModalVisible, setIsRegModalVisible] = useState(false);    // 삭제 모달여부
    const [bucketNm, setBucketNm] = useState('');                   // 버킷 대표제목
    const [bucketDscr, setBucketDscr] = useState('');               // 버킷 대표설명
    const [profileImg, setProfileImg] = useState('');               // 프로필 이미지
    const [imgPath, setImgPath] = useState('');                     // 선택한 이미지
    const [bucketSeqno, setBucketSeqno] = useState('');             // 버킷시퀀스
    const writeBucketDscrRef = useRef();

    useEffect(() => {
        // 이미지 하드코딩
        setProfileImg('https://img.j-devs.net/study-app/bucket/rep/202211/V87Xnvho2022112823xI1t5t.jpg');

        if( route.params.writeGubun == 'camera' ) {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true
            }).then(image => {
                setImgPath(image.path);
            }).catch(function( e ){
                navigation.goBack();
                console.log(e.message);
            });
        } else if ( route.params.writeGubun == 'photo' ) {
            ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                //cropperCircleOverlay: true
            }).then(image => {
                setImgPath(image.path);
            }).catch(function( e ){
                navigation.goBack();
                console.log(e.message);
            });
        }
    }, []);

    useEffect(() => {
        if(bucketSeqno != '') {
            navigation.navigate('DetailView', {'bucketSeqno': bucketSeqno, 'callerIsWrite': true});
        }
    }, [bucketSeqno]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '버킷 글쓰기',
            headerRight: () => (
                <View style={{marginRight: 20,}}>
                    <AntDesign
                        onPress={onPressWrite}
                        name="check" color={'black'} size={25}/>
                </View>
            ),
        });
    },[navigation, imgPath, bucketNm, bucketDscr]);

    // 삭제중 모달 스피너 팝업
    function DeleteModalView() {
        return (
            <Modal
                style={styles.modalContainer}
                animationType={"fade"}
                transparent={true}
                visible={isRegModalVisible}
            >
                <View style={styles.modalWrap}>
                    <View style={styles.modalSpinnerWrap}>
                        <ActivityIndicator style={styles.aa} size="small" color={'#fa8e81'} />
                        <Text style={styles.bb}>등록중</Text>
                    </View>
                </View>
            </Modal>
        );
    }

    function onPressWrite() {
        setIsRegModalVisible(true);

        var photo = {
            uri: imgPath,
            type: 'image/jpeg',
            name: 'photo.jpg',
        };

        var param = new FormData();

        param.append('file', photo);
        param.append('bucketNm', bucketNm);
        param.append('bucketDscr', bucketDscr);

        axios({
            method: 'post',
            url: 'https://j-devs.net/bucket/regBucket',
            data : param,
            responseType: "json",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(function (response) {
            setTimeout(() => {
                setIsRegModalVisible(false);
            }, 1000);
            console.log( '-------------------RESULT-------------------' );
            setBucketSeqno(response.data.bucketSeqno);
            console.log( '--------------------------------------------' );
        }).catch(function( e ){
            setTimeout(() => {
                setIsRegModalVisible(false);
            }, 1000);
            console.log( '-------------------ERROR!-------------------' );
            console.log(e.message);
            console.log( '--------------------------------------------' );
        });
    }

    return (
        <View style={styles.mainView}>
            <DeleteModalView/>
            <View style={styles.writeTextWrap}>
                <TextInput
                    placeholder={'버킷의 제목을 작성하세요,,,'}
                    autoFocus={true}
                    onChangeText={(text) => setBucketNm(text)}
                    style={styles.inputBucketNm}>
                </TextInput>
                <TextInput
                    placeholder={'추가 설명을 작성하세요,,,'}
                    multiline={true}
                    onChangeText={(text) => setBucketDscr(text)}
                    numberOfLines={2}
                    style={styles.inputBucketDscr}>
                </TextInput>
            </View>
            <ImageBackground style={styles.bucketRepBg2}
                             source={imgPath ? {uri: imgPath } : null}
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
        </View>
    )
}

export default WriteBucket;
