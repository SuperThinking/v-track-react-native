import React, { PureComponent } from "react";

import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Button,
  TouchableHighlight,
  Linking
} from "react-native";
import { PulseIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import { colors } from "../theme";

import Icon from "react-native-vector-icons/FontAwesome";

class About extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    this.getName().then(name => {
      this.setState({ name });
    });
  }

  getName = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("name")
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };

  attemptLogout = () => this.props.authlogout();

  _renderSplash() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <PulseIndicator color={colors.loaderAttendance} />
      </View>
    );
  }

  render() {
    return this.state.name ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "300",
            fontSize: 20,
            margin: 20
          }}
          children={
            "Hello " +
            this.state.name +
            ", for any suggestions/queries you can contact us on superthinkingdev@gmail.com"
          }
        />
        <Icon
          style={{ marginBottom: 20 }}
          name="envelope"
          size={30}
          color="#000"
          onPress={() => Linking.openURL("mailto:superthinkingdev@gmail.com")}
        />
        <Button
          style={{ margin: 20 }}
          color={colors.logoutButtonBackgroundColor}
          title="Logout"
          onPress={this.attemptLogout}
        />
      </View>
    ) : (
      this._renderSplash()
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

export const actionCreator = (type, payload = null) => ({ type, payload });

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authlogout: () => {
      AsyncStorage.multiRemove([
        "token",
        "authenticated",
        "name",
        "id",
        "pass",
        "attendance",
        "timeTable"
      ]);
      dispatch(actionCreator("LOGOUT"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
