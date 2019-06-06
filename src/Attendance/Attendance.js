import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  RefreshControl,
  ToastAndroid
} from "react-native";

import { connect } from "react-redux";

import ProgressCircle from "react-native-progress-circle";
import Icon from "react-native-vector-icons/FontAwesome";
import { PulseIndicator } from "react-native-indicators";
import Axios from "axios";

class Attendance extends PureComponent {
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
          borderColor: "#000"
        }}
      >
        <Text numberOfLines={1} style={styles.textItemKey}>
          {x[0]}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text numberOfLines={1} style={styles.textItemValue}>
            {x[1]}
          </Text>
          <Text numberOfLines={1} style={styles.textItemValue}>
            {x[4]}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text numberOfLines={1} style={styles.textItemValue}>
            {x[3] + " of " + x[2] + " attended"}
          </Text>
          {x[5][0] === "L" ? (
            <Icon
              style={styles.textItemValue}
              name="flask"
              size={16}
              color="#000"
            />
          ) : (
            <Icon
              style={styles.textItemValue}
              name="book"
              size={16}
              color="#000"
            />
          )}
        </View>
      </View>
    );
  };

  stopRefreshAnimation = () => {
    this.setState({ refreshing: false });
  };
  _onRefresh = () => {
    this.setState({ refreshing: true });
    Axios.post(
      "http://192.168.43.38:9000/.netlify/functions/index/attendance",
      {
        id: this.state.id,
        pass: this.state.pass
      }
    )
      .then(x => {
        if (x.data.Error) {
          this.stopRefreshAnimation();
          ToastAndroid.showWithGravityAndOffset(
            x.data.Error.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          try {
            var setAtt = new Promise((resolve, reject) => {
              try {
                let updatedAtt = this.state.items;
                for (i in updatedAtt) {
                  let temp = x.data[updatedAtt[i][6]];
                  if (temp[0] && temp[1] && temp[2]) {
                    updatedAtt[i][3] = temp[0];
                    updatedAtt[i][4] = temp[1];
                    updatedAtt[i][5] = temp[2];
                  }
                }
                AsyncStorage.setItem("attendance", JSON.stringify(updatedAtt))
                  .then(x => {
                    console.log("Attendance Updated : 1 ");
                    resolve(true);
                  })
                  .catch(err => {
                    this.stopRefreshAnimation();
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
              } catch (err) {
                this.stopRefreshAnimation();
                console.log(err);
                alert(
                  "Unable to update attendance. Contact Dev if the problem persists."
                );
              }
            });
            setAtt.then(x => {
              if (x) {
                this.getAttendance().then(([items, id, pass]) => {
                  console.log("Attendance Updated : 2");
                  this.setState({ items, id, pass, refreshing: false });
                });
              }
            });
          } catch (err) {
            console.log("Unable to process data");
          }
        }
      })
      .catch(x => {
        this.stopRefreshAnimation();
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
          try {
            return (
              <View
                key={x[0] + x[8]}
                style={
                  x[5] > 80
                    ? styles.safe
                    : x[5] >= 75
                    ? styles.warning
                    : styles.danger
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ProgressCircle
                    percent={parseInt(x[5])}
                    radius={35}
                    borderWidth={4}
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
                </View>
                {this.xHelper([x[1], x[0], x[4], x[3], x[9], x[8]])}
              </View>
            );
          } catch (err) {
            return (
              <View>
                <Text>
                  Maybe your attendance data is not loaded yet. (Contact Dev)
                </Text>
              </View>
            );
          }
        })
      : this._renderSplash();

    return (
      <ScrollView
        style={{ backgroundColor: this.props.colors.attendanceBackground }}
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
        <PulseIndicator color={this.props.colors.loaderAttendance} />
        <Text children="People : Nothing is more difficult than one-sided love." />
        <Text children="Engineers : 75% attendance maintain karke dikhao!" />
      </View>
    );
  }
}

var styles;

const mapStateToProps = (state, ownProps) => {
  styles = StyleSheet.create({
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
      borderColor: state.Theme.colorData.dangerBorder,
      backgroundColor: state.Theme.colorData.dangerBack,
      borderRadius: 3,
      borderWidth: 1,
      flexDirection: "row"
    },
    warning: {
      padding: 2,
      margin: 4,
      borderColor: state.Theme.colorData.warningBorder,
      backgroundColor: state.Theme.colorData.warningBack,
      borderRadius: 3,
      borderWidth: 1,
      flexDirection: "row"
    },
    safe: {
      padding: 2,
      margin: 4,
      backgroundColor: state.Theme.colorData.safeBack,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: state.Theme.colorData.safeBorder,
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
  return { colors: state.Theme.colorData };
};

export default connect(mapStateToProps)(Attendance);
