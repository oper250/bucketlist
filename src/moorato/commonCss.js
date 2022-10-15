import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
    },
    mainView: {
        flex: 1,
    },
    topView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#2296f3',
    },
    contentsView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 12,
        backgroundColor: '#ffa500',
    },
    bucketItem: {
        width: 350,
        height: 120,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#ddd',
        borderRadius: 20,
        flex: 0,
        flexDirection: 'row',
    },
    bucketImg: {
        width: 100,
        height: 100,
    },
    bucketTextView: {
        marginLeft: 20,
    },
    bucketTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',

    },
    bucketDesc: {
        fontWeight: '400',
        fontSize: 15,
    }
})

export default styles;
