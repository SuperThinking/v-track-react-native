import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Days from './dayNav'
import { ScrollView } from 'react-native-gesture-handler';

export default class TimeTable extends React.Component {
    render() {
        return (
            <ScrollView>
                <Days />
            </ScrollView>
        )
    }
}