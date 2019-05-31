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
import { connect } from "react-redux";
import { colors } from "../theme";

import Icon from "react-native-vector-icons/FontAwesome";

class About extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "user"
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

  render() {
    return (
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
            // ", We would like to tell you that application is not developed/maintained by Vellore Institute of Technology but by an independent body. Hence, VIT is not to be blamed for any mistake this application does. You can still login to https://academicscc.vit.ac.in/student/home.asp for checking your attendance and time-table."
          }
        />
        <Icon
          style={{ marginBottom: 20 }}
          name="envelope"
          size={30}
          color="#000"
          onPress={() =>
            Linking.openURL("mailto:superthinkingdev@gmail.com")
          }
        />
        <Button
          style={{ margin: 20 }}
          color={colors.logoutButtonBackgroundColor}
          title="Logout"
          onPress={this.attemptLogout}
        />
      </View>
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
