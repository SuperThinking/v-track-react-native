import React, { PureComponent } from "react";

import { View, Text, AsyncStorage } from "react-native";

import { PulseIndicator } from "react-native-indicators";

import { colors } from "../theme";
import { ScrollView } from "react-native-gesture-handler";

export default (Day = x =>
  class Day extends PureComponent {
    state = {
      subjects: []
    };
    componentDidMount() {
      this.loadSubjects().then(subs => {
        var subjects = [];
        for (i in x) {
          if (x[i][1] in subs) {
            let temp = subs[x[i][1]];
            temp.push(x[i][0]);
            subjects.push(temp);
          }
        }
        this.setState({ subjects: subjects });
      });
    }
    loadSubjects = () => {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem("timeTable").then(subs => {
          resolve(JSON.parse(subs));
        });
      });
    };
    render() {
      var ttLoader = this.state.subjects.map(z => {
        return (
          <View
            key={z[4]}
            style={{
              flexDirection: "row",
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#db3030",
              borderStyle: "solid",
              margin: 5,
              padding: 5
            }}
          >
            <Text
              style={{
                margin: 5,
                fontWeight: "bold",
                fontSize: 15,
                color: "#fff"
              }}
            >
              {z[4]}
            </Text>
            <View style={{ flex: 1, borderLeftWidth: 1, borderColor: "#fff" }}>
              <Text
                numberOfLines={1}
                style={{ fontSize: 17, color: "#fff", marginLeft: 5 }}
              >
                {z[1]}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#fff",
                    flex: 1,
                    marginLeft: 5
                  }}
                >
                  {z[0]}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#fff",
                    flex: 1,
                    marginLeft: 5
                  }}
                >
                  {z[2]}
                </Text>
              </View>
              <Text style={{ fontSize: 10, color: "#fff", marginLeft: 5 }}>
                {z[3]}
              </Text>
            </View>
          </View>
        );
      });
      return this.state.subjects.length ? (
        <ScrollView
          style={{
            backgroundColor: "#000"
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center"
            }}
          >
            {ttLoader}
          </View>
        </ScrollView>
      ) : (
        this._renderSplash()
      );
    }
    _renderSplash() {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000"
          }}
        >
          <PulseIndicator color={colors.loaderAttendance} />
        </View>
      );
    }
  });
