import React, { PureComponent } from "react";

import { View, Text, StyleSheet, AsyncStorage, Button } from "react-native";
import { connect } from "react-redux";
import { colors } from "../theme";

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

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          children={
            "Hello " +
            this.state.name +
            ", We would like to tell you that application is not developed/maintained by Vellore Institute of Technology but by an independent body. Hence, VIT is not to be blamed for any mistake this application does. You can still login to https://academicscc.vit.ac.in/student/home.asp for checking your attendance and time-table."
          }
        />
        <Button color={colors.logoutButtonBackgroundColor} title="Logout" onPress={this.attemptLogout} />
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
      AsyncStorage.multiRemove(["token", "authenticated", "name", "id", "pass", "attendance", "timeTable"]);
      dispatch(actionCreator("LOGOUT"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
