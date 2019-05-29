import React, { PureComponent } from "react";
import Axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Button,
  AsyncStorage,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView
} from "react-native";
import { Provider, connect, MergeProps } from "react-redux";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "16BCE1111",
      pass: "#23Oct1970#"
    };
  }

  attemptLogin = () => {
    //Validation and Server Request
    // var data = this.state;
    Axios.post("http://192.168.43.38:5000/", this.state)
      .then(x => {
        console.log("Content Arrived", JSON.stringify(x.data));
        if (x.data.Error) {
          ToastAndroid.showWithGravityAndOffset(
            x.data.Error.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          var token = "SomeToken";
          this.props.authSuccess(token);
        }
      })
      .catch(x => {
        console.log("Login Server Error", x);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        behavior="padding"
        enabled
      >
        <TextInput
          placeholder="Registration Number"
          onChangeText={id => this.setState({ id })}
          value={this.state.id}
          style={{ textAlign: "center" }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={pass => this.setState({ pass })}
          value={this.state.pass}
          style={{ textAlign: "center" }}
        />
        <Button color="#901000" title="Login" onPress={this.attemptLogin} />
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {};
};

export const actionCreator = (type, payload = null) => ({ type, payload });

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authSuccess: token => {
      AsyncStorage.multiSet([["token", token], ["authenticated", 1]]).catch(
        x => {
          console.log("Login Auth", x);
        }
      );
      dispatch(actionCreator("LOGIN_SUCCESS"));
    }
  };
};

export const authStateReducer = (
  state = { app_started: false, authenticated: false },
  { type, payload }
) => {
  switch (type) {
    case "LOGIN_SUCCESS":
      return { ...state, authenticated: true };
    case "LOGOUT":
      return { ...state, authenticated: false };
    case "APP_LOADED":
      return { ...state, app_started: true };
    default:
      return state;
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
