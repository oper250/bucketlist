import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {loginStyle} from "./css.js";

function JDevsMain() {
    return (
        <SafeAreaView style={loginStyle.safeAreaView}>
            {/* blank view */}
            <View style={loginStyle.blankFlexView30percent}></View>

            {/* login-form */}
            <View style={loginStyle.loginFormView}>

                {/* login-title */}
                <View style={[loginStyle.loginTtlView,loginStyle.blankFlexView20percent]}>
                    <Text style={loginStyle.loginTtlText}>로그인</Text>
                </View>

                {/* login-input */}
                <View style={[loginStyle.loginInputView,loginStyle.blankFlexView60percent]}>

                    {/* login-input tr 1 : 아이디 */}
                    <View style={[loginStyle.loginInputTrView,loginStyle.blankFlexView30percent]}>

                        {/* login-input th */}
                        <View style={[loginStyle.loginInputThView,loginStyle.blankFlexView30percent]}>
                            <Text style={loginStyle.loginThText}>아이디 :</Text>
                        </View>
                        <View style={[loginStyle.loginInputTdView,loginStyle.blankFlexView70percent]}>
                            <Text style={loginStyle.loginTdText}>비밀번호</Text>
                        </View>
                    </View>

                    {/* login-input tr 2 : 비밀번호 */}
                    <View style={loginStyle.blankFlexView50percent}>
                        <Text style={loginStyle.loginTtlText}>버튼</Text>
                    </View>
                </View>

                {/* login-button */}
                <View style={[loginStyle.loginBtnView,loginStyle.blankFlexView20percent]}>

                </View>
            </View>

            {/* blank view */}
            <View style={loginStyle.blankFlexView30percent}></View>
        </SafeAreaView>
    );
}

export default JDevsMain;
