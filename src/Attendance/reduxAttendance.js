import React, { PureComponent } from "react";

import { View, Text, StyleSheet, AsyncStorage, Button } from "react-native";
import { connect } from "react-redux";

class ReduxAttendance extends PureComponent {
  constructor(props) {
    super(props);
  }

  attemptLogout = () => {
    //Validation and Server Request
    this.props.authlogout();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text children="Click on Logout to Exit" />
        <Button color="#901000" title="Logout" onPress={this.attemptLogout} />
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
      console.log("logout");
      AsyncStorage.multiRemove(["token", "authenticated"]);
      dispatch(actionCreator("LOGOUT"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxAttendance);
