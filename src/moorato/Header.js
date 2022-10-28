import React, {Component, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import styles from './commonCss';

export function Header({title}) {
    return(
        <View style={styles.topView}>
            <Text
                style={styles.title}
            >{title}
            </Text>
        </View>
    )
}
