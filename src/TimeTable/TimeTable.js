import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Days from './dayNav'

export default class TimeTable extends React.Component {
    render() {
        return (
            <View>
                <Days />
            </View>
        )
    }
}