import {StyleSheet} from 'react-native';

export const loginStyle = StyleSheet.create({

    blankFlexView20percent: { flex: 2, padding: 0, margin: 0 },
    blankFlexView30percent: { flex: 3, padding: 0, margin: 0 },
    blankFlexView50percent: { flex: 5, padding: 0, margin: 0 },
    blankFlexView60percent: { flex: 6, padding: 0, margin: 0 },
    blankFlexView70percent: { flex: 7, padding: 0, margin: 0 },
    blankFlexView100percent: { flex: 1, padding: 0, margin: 0},

    safeAreaView: { flex: 1 },
    loginFormView: { flex: 4, height: 20, justifyContent: 'center', alignItems: 'center' },
    loginTtlView: {
        backgroundColor: 'orange'
    },
    loginInputView: {
        flex: 1,
        width: 200,
        flexDirection: 'row',
        backgroundColor: 'green'
    },
    loginInputTrView: {
        flexDirection: 'column'
    },
    loginInputThView: {
        flexDirection: 'row',
        backgroundColor: 'red'
    },
    loginInputTdView: {
        flexDirection: 'row',
        backgroundColor: 'blue'
    },
    loginBtnView: {
        backgroundColor: 'blue'
    },
    loginTtlText: { textAlign: 'center', paddingBottom: 8, width: 200, color: '#3C3C3C', borderBottomWidth: 1, borderBottomColor: '#3C3C3C' },
    loginThText: { flex: 1, textAlign: 'right' },
    loginTdText: { flex: 1, textAlign: 'left' }
});

export const style = StyleSheet.create({

    blankFlexView1of3: {
        flex: 3
    },

    safeArea: {
        flex: 1

    },
    loginForm: {
        flex: 4,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTtl: {
        textAlign: 'center',
        paddingBottom: 10,
        width: 200,
        color: '#3C3C3C',
        borderBottomWidth: 1,
        borderBottomColor: '#3C3C3C'
    }
});
