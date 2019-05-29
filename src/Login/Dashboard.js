import React, { PureComponent } from "react";

import { View, Text, StyleSheet, Button, AsyncStorage } from "react-native";
import { Provider, connect, MergeProps } from  'react-redux';
import Tabs from '../index'

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs logout={this.attemptLogout}/>
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
)(Dashboard);
