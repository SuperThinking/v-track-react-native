import React, { PureComponent } from "react";
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import Axios from "axios";
import { PulseIndicator } from "react-native-indicators";

class DetailedView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: 102,
      data: "Loading Attendance",
      refreshing: true
    };
  }

  _renderSplash() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <PulseIndicator color={this.props.colors.loaderAttendance} />
      </View>
    );
  }

  queryDetails = cb => {
    var fd = this.props.navigation.getParam("fd");
    let key = fd.id + fd.cc + fd.cn + fd.ct;
    Axios.post(
      "http://ec2-18-191-70-5.us-east-2.compute.amazonaws.com:3000/detailedAttendance",
      // "http://192.168.43.38:9000/.netlify/functions/index/detailedAttendance",
      fd
    )
      .then(x => {
        if (x.data.status == 200) {
          this.setState({ status: 200, data: x.data.details });
          AsyncStorage.setItem(key, JSON.stringify(x.data.details));
        } else {
          this.setState({ status: 404, data: "Error Fetching Data" });
        }
        cb(false);
      })
      .catch(err => {
        console.log(err);
        this.setState({ status: 404, data: "Error Fetching Data" });
        cb(false);
      });
  };

  fetchDetails = cb => {
    var fd = this.props.navigation.getParam("fd");
    let key = fd.id + fd.cc + fd.cn + fd.ct;
    AsyncStorage.getItem(key).then(x => {
      if (x != null) {
        this.setState({ data: JSON.parse(x), status: 200 });
        cb(false);
      } else {
        this.queryDetails(cb);
      }
    });
  };

  componentDidMount() {
    this.fetchDetails(refresh => {
      this.setState({ refreshing: refresh });
    });
  }

  render() {
    let x =
      this.state.status == 200 ? (
        this.state.data.map(a => {
          return (
            <View
              key={a.date + a.status}
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: a.status == "Absent" ? "#ff9999" : "#99ffaa",
                margin: 4
              }}
            >
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: "#0c1d4b",
                  flexGrow: 1
                }}
              >
                <Text style={{ fontFamily: "RobotoR", fontSize: 18 }}>
                  {a.date}
                </Text>
              </View>
              <View
                style={{
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeftWidth: 1,
                  borderColor: "#0c1d4b",
                  flexGrow: 1
                }}
              >
                <Text style={{ fontFamily: "RobotoB", fontSize: 18 }}>
                  {a.status}
                </Text>
              </View>
            </View>
          );
        })
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontFamily: "RobotoB", fontSize: 20 }}>
            Unable to load data!
          </Text>
          <Text style={{ fontFamily: "RobotoR", fontSize: 18 }}>
            Try : 1) Refreshing the page. 2) Logging out and Logging in.
          </Text>
          <Text style={{ fontFamily: "RobotoR", fontSize: 15 }}>
            If the problem persists, please contact the developer.
          </Text>
        </View>
      );
    // return <Text>HEY</Text>;
    return this.state.status === 200 ? (
      <ScrollView
        style={{ backgroundColor: this.props.colors.attendanceBackground }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true });
              this.queryDetails(refresh => {
                this.setState({ refreshing: refresh });
              });
            }}
          />
        }
      >
        {x}
      </ScrollView>
    ) : (
      this._renderSplash()
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    colors: state.Theme.colorData
  };
};
export default connect(mapStateToProps)(DetailedView);
