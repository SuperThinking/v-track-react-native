import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  RefreshControl,
  ToastAndroid
} from "react-native";

import ProgressCircle from "react-native-progress-circle";

import { PulseIndicator } from "react-native-indicators";
import { colors } from "../theme";
import Axios from "axios";

export default class Attendance extends React.Component {
  state = {
    items: "",
    refreshing: false,
    id: "",
    pass: ""
  };

  componentDidMount() {
    this.getAttendance().then(([items, id, pass]) => {
      this.setState({ items, id, pass });
    });
  }

  getAttendance = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.multiGet(["attendance", "id", "pass"])
        .then(res => {
          resolve([JSON.parse(res[0][1]), res[1][1], res[2][1]]);
        })
        .catch(err => reject(err));
    });
  };

  xHelper = x => {
    return (
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          borderLeftWidth: 2,
          borderColor: "#1B367C"
        }}
      >
        <Text numberOfLines={1} style={styles.textItemKey}>
          {x[0]}
        </Text>
        <Text numberOfLines={1} style={styles.textItemValue}>
          {x[1]}
        </Text>
        <Text numberOfLines={1} style={styles.textItemValue}>
          {"Out of " + x[2] + " classes, " + x[3] + " attended"}
        </Text>
      </View>
    );
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    Axios.post("http://192.168.43.38:5000/", {
      id: this.state.id,
      pass: this.state.pass
    })
      .then(x => {
        if (x.data.Error) {
          ToastAndroid.showWithGravityAndOffset(
            x.data.Error.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          var setAtt = new Promise((resolve, reject) => {
            AsyncStorage.setItem("attendance", JSON.stringify(x.data.subjects))
              .then(x => {
                console.log("Attendance Updated : 1 ");
                resolve(true);
              })
              .catch(err => {
                console.log(err);
                ToastAndroid.showWithGravityAndOffset(
                  "Unable to update attendance",
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM,
                  25,
                  50
                );
                reject(err);
              });
          });
          setAtt.then(x => {
            if (x) {
              this.getAttendance().then(([items, id, pass]) => {
                console.log("Attendance Updated : 2");
                this.setState({ items, id, pass, refreshing: false });
              });
            }
          });
        }
      })
      .catch(x => {
        this.setState({ defaultLoading: false });
        ToastAndroid.showWithGravityAndOffset(
          "Network Error",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
        console.log("Login Server Error", x);
      });
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
              <ProgressCircle
                percent={parseInt(x[5])}
                radius={35}
                borderWidth={8}
                color={
                  x[5] > 80 ? "#24bc1c" : x[5] >= 75 ? "#bca61c" : "#bc1c1c"
                }
                shadowColor="#cecccc"
                bgColor="#fff"
                outerCircleStyle={{
                  margin: 5
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {x[5] + "%"}
                </Text>
              </ProgressCircle>
              {this.xHelper([x[1], x[0], x[4], x[3]])}
            </View>
          );
        })
      : this._renderSplash();

    return (
      <ScrollView
        style={{ backgroundColor: "#000" }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {x}
      </ScrollView>
    );
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
    padding: 2,
    margin: 4,
    borderColor: "#d68080",
    backgroundColor: "#fc9797",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row"
  },
  warning: {
    padding: 2,
    margin: 4,
    borderColor: "#e5e389",
    backgroundColor: "#fcfa97",
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: "row"
  },
  safe: {
    padding: 2,
    margin: 4,
    backgroundColor: "#97fcae",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#86e09b",
    flexDirection: "row"
  },
  textItemKey: {
    margin: 5,
    fontFamily: "RobotoB",
    flex: 1,
    fontSize: 17
  },
  textItemValue: {
    margin: 5,
    fontFamily: "RobotoR",
    flex: 1,
    fontSize: 16
  }
});
