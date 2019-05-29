import React, { PureComponent } from "react";
import { AsyncStorage, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import Tabs from "./src";
import AppNavigation from "./src/shared/navigation";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { authStateReducer, actionCreator } from "./src/Login/Login";

class AppRoot extends PureComponent {
  componentDidMount() {
    this.props.checkLogin();
  }

  render() {
    const { app_started, authenticated } = this.props.authState;
    return app_started ? this._renderAppRoot(authenticated) : this._renderSplash();
  }

  _renderAppRoot(authenticated) {
    const CreateRoot = AppNavigation(authenticated);
    return <CreateRoot />;
  }
  _renderSplash() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
        <Text children="loading.." />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authState: state.authState
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    async checkLogin() {
      const isLoggedIn = await AsyncStorage.getItem("authenticated").catch(x =>
        console.log(x)
      );
      if (isLoggedIn) {
        dispatch(actionCreator("LOGIN_SUCCESS"));
      }
      dispatch(actionCreator("APP_LOADED"));
    }
  };
};

const RootApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoot);

const reducers = combineReducers({
    authState: authStateReducer
  }),
  store = createStore(reducers);

export default (appRootComponent = () => (
  <Provider store={store}>
    <RootApp />
  </Provider>
));
