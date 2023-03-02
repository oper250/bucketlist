import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',     // 디폴트 = column
        width: '100%',
    },
    topView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
    },
    contentsView: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    bucketItem: {
        width: 360,
        height: 115,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#fffcf2',
        flex: 0,
        flexDirection: 'row',
        marginTop: 15,
        elevation: 2,
        borderWidth: 0.1,
        borderColor: '#ddd',
        borderRadius: 25
    },
    bucketImg: {
        width: 100,
        height: 95,
        resizeMode: 'cover',
        borderRadius: 20,
    },
    bucketDescView: {
        flex: 2,
        marginLeft: 20,
    },
    bucketTitle: {
        marginVertical: 5,
        fontWeight: 'bold',
        fontSize: 13,
        color: '#0c6cd3',
    },
    bucketDesc: {
        fontWeight: '400',
        fontSize: 13,
        height: 45,
    },
    bucketRepBg: {
        flex: 1.5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    bucketRepBg2: {
        flex: 3,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    bucketRepContent: {
        width: '85%',
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, .8)',
        borderBottomLeftRadius: 50,
        borderTopLeftRadius: 50,
        flex: 0,
        bottom: 20,
        flexDirection: 'row',
    },
    userFace: {
        width: '20%',
        height: '100%',
        backgroundColor: 'red',
    },
    bucketRepTitle: {
        width: '80%',
        height: '100%',
        fontStyle: 'italic',
        paddingHorizontal: 5,
        paddingTop: 5,
        textAlign: 'justify',
        color: '#333',
    },
    storysDiv: {
        flex: 1, backgroundColor: '#eeeee', flexDirection: 'column'
    },
    storyBox: {
        backgroundColor: '#fff', width: '31%', height: 130, marginVertical: 5, alignItems: 'center', marginHorizontal: 4, elevation: 7,
    },
    storyImg: {
        height: 100, width: '90%',marginTop: 5,
    },
    profileImg: {
        height: 75, width: 75, borderRadius: 50,
    },
    storyDscr: {
        width: '90%',
        height: 20,
        fontSize: 12,
        fontStyle: 'italic',
    },
    lottie: {
        width: 100,
        height: 100,
    },
    btnWrite: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        height: 50,
        width: 50,
        backgroundColor: '#0c6cd3',
        borderRadius: 30,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15,
    },
    btnWriteOverModal: {
        position: 'absolute',
        bottom: 79,
        right: 30,
        height: 50,
        width: 50,
        borderRadius: 25,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15,
    },
    btnPhotoOverModal: {
        position: 'absolute',
        bottom: 79,
        right: 40,
        height: 30,
        width: 30,
        backgroundColor: '#0c6cd3',
        borderRadius: 25,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15,
    },
    btnCameraOverModal: {
        position: 'absolute',
        bottom: 79,
        right: 40,
        height: 30,
        width: 30,
        backgroundColor: '#0c6cd3',
        borderRadius: 25,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15,
    },
    introLogo: {
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
    },
    btnWriteText: {
        color: '#fff',
        fontSize: 15,
    },
    spinner: {
        justifyContent: 'space-around',
        position: 'relative',
        flex: 1,
        height: 100,
    },
    indicatorWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 12,
    },
    indicatorText: {
        fontSize: 18,
        marginTop: 12,
    },
    modalWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalWhiteWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    modalSpinnerWrap: {
        width: 100,
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        elevation: 7,
    },
    uploadFileWrap: {
        flex:2,
        backgroundColor: '#fff',
        padding: 30,
    },
    uploadDscrWrap: {
        flex:1,
        backgroundColor: '#fff',
        padding: 30,
    },
    writePhotoDiv: {
        backgroundColor: '#e1e9f2',
        width: '100%',
        height: '100%',
        borderWidth: 5,
        borderColor: '#c0d3e8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bucketWritePhotoText: {
        color: '#4b5666',
        fontSize: 20,
    },
    imgPreview: {
        width: '100%',
        height: '100%',
    },
    bucketDscr: {
        backgroundColor: '#c0d3e8',
        height: '100%',
        width: '100%',
        textAlignVertical: 'top',
    },
    writeBucketNm: {
        fontSize: 13,
        fontWeight: 'bold',
        backgroundColor: 'red',
        paddingVertical: 0,
    },
    writeBucketDscr: {
        fontSize: 13,
        paddingVertical: 0,
    },
    writeTextWrap: {
        flex: 1,
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBucketNm: {
        width: '80%',
        height: '25%',
        backgroundColor: '#fff',
        textDecorationLine: "underline line-through",
        textAlignVertical: 'top',
        fontSize: 15,
        elevation: 3,
    },
    inputBucketDscr: {
        marginTop: '5%',
        width: '80%',
        height: '40%',
        backgroundColor: '#fff',
        textDecorationLine: "underline line-through",
        textAlignVertical: 'top',
        fontSize: 15,
        padding: 5,
        elevation: 3,
    },
    storyItemBig: {
        width: '100%',
        height: 600,
        paddingHorizontal: 15,
        paddingTop: 10,
        backgroundColor: '#fff',
        flex: 0,
        flexDirection: 'column',
        marginTop: 30,
        elevation: 2,
        borderWidth: 0.1,
        borderColor: '#ddd',
    },
    storyImgBig: {
        width: '100%',
        height: '93%',
        resizeMode: 'cover',
    },
    profileImg2: {
        height: 60, width: 60, borderRadius: 50, alignItems: 'center',
    },
})

export default styles;
