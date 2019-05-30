import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import { PulseIndicator } from "react-native-indicators";
import { colors } from "../theme";

export default class Attendance extends React.Component {
  state = {
    items: ""
  };

  componentDidMount() {
    this.getAttendance().then(items => {
      this.setState({ items });
    });
  }

  getAttendance = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("attendance")
        .then(res => {
          resolve(JSON.parse(res));
        })
        .catch(err => reject(err));
    });
  };

  xHelper = x => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text numberOfLines={1} style={styles.textItemKey}>
          {x[0]} :{" "}
        </Text>
        <Text numberOfLines={1} style={styles.textItemValue}>
          {x[1]}
        </Text>
      </View>
    );
  };

  render() {
    var x = this.state.items
      ? this.state.items.map(x => {
          return (
            <View
              key={x[0]}
              style={
                x[5] > 80
                  ? styles.safe
                  : x[5] >= 75
                  ? styles.warning
                  : styles.danger
              }
            >
              {this.xHelper(["Course Code", x[0]])}
              {this.xHelper(["Course Name", x[1]])}
              {this.xHelper(["Classes Attended", x[3]])}
              {this.xHelper(["Total Classes", x[4]])}
              {this.xHelper(["Attendance %", x[5] + "%"])}
            </View>
          );
        })
      : this._renderSplash();

    return <ScrollView>{x}</ScrollView>;
  }

  _renderSplash() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PulseIndicator color={colors.loaderAttendance} />
        <Text children="People : Nothing is more difficult than one-sided love." />
        <Text children="Engineers : 75% attendance maintain karke dikhao!" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
  danger: {
    backgroundColor: "#fc9797",
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#fff"
  },
  warning: {
    backgroundColor: "#fcfa97",
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#fff"
  },
  safe: {
    backgroundColor: "#97fcae",
    borderRadius: 1,
    borderWidth: 1,
    borderColor: "#fff"
  },
  textItemKey: {
    fontSize: 15
  },
  textItemValue: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 15
  }
});
