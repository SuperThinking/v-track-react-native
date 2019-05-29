import React from 'react'

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class Attendance extends React.Component {

    componentDidMount()
    {
        console.log('Attendance Mounted');
    }

    render() {
        return (
            <View>
                <Text>Hello from Attendance</Text>
            </View>
        )
    }
}