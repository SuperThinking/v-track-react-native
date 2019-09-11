import React, { PureComponent } from "react";
import Axios from "axios";
import pushNotification from "../pushNotification";
import {
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
  Linking
} from "react-native";
import SpinnerButton from "react-native-spinner-button";
import { connect } from "react-redux";
import SvgComponent from "./SvgComponent";
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pass: "",
      defaultLoading: false
    };
  }

  componentDidMount() {
    this.setState({ defaultLoading: false });
  }

  attemptLogin = () => {
    //Validation and Server Request
    // var data = this.state;
    this.setState({ defaultLoading: true });
    Axios.post(
      "http://ec2-18-191-70-5.us-east-2.compute.amazonaws.com:3000/login",
      // "http://192.168.43.38:9000/.netlify/functions/index/login",
      this.state
    )
      .then(x => {
        console.log("Content Arrived", JSON.stringify(x.data));
        if (x.data.Error) {
          this.setState({ defaultLoading: false });
          ToastAndroid.showWithGravityAndOffset(
            x.data.Error.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          try {
            var token = "TOKEN";
            var tt = {};
            let subs = x.data.subjects.sort();
            for (j in subs) {
              let y = subs[j];
              let tem = y[8].split("+");
              for (let i in tem) {
                tt[tem[i]] = [y[0], y[1], tem[i], y[9]];
              }
            }
            pushNotification.setReminders(tt);
            this.props.authSuccess(
              token,
              x.data.name,
              this.state.id,
              this.state.pass,
              subs,
              tt
            );
          } catch (err) {
            console.log("Unable to process this data");
          }
        }
      })
      .catch(x => {
        this.setState({ defaultLoading: false });
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
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: this.props.colors.loginBackgroundColor
        }}
        behavior="padding"
        enabled
      >
        <SvgComponent />
        <TextInput
          placeholder="Registration Number"
          onChangeText={id => this.setState({ id })}
          value={this.state.id}
          style={styles.input}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={pass => this.setState({ pass })}
          value={this.state.pass}
          style={styles.input}
        />
        <SpinnerButton
          buttonStyle={styles.button}
          isLoading={this.state.defaultLoading}
          onPress={this.attemptLogin}
          indicatorCount={10}
          spinnerType="DotIndicator"
          size={8}
        >
          <Text style={styles.buttonInput}>Login</Text>
        </SpinnerButton>
        <Text
          style={{
            color: "#e9f0ea",
            justifyContent: "center",
            alignItems: "center",
            bottom: 0,
            position: "absolute"
          }}
          onPress={() =>
            Linking.openURL("https://v-track.flycricket.io/privacy.html")
          }
        >
          Privacy Policy
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

var styles;

const mapStateToProps = (state, ownProps) => {
  styles = StyleSheet.create({
    input: {
      color: "#fff",
      fontFamily: "Lato",
      textAlign: "center",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#FFFFFF",
      borderRadius: 4,
      width: 300,
      fontSize: 20,
      padding: 10,
      marginBottom: 20
    },
    button: {
      textAlign: "center",
      backgroundColor: state.Theme.colorData.loginButtonBackgroundColor,
      width: 300,
      borderRadius: 3
    },
    buttonInput: {
      textAlign: "center",
      color: state.Theme.colorData.loginButtonTextColor,
      fontSize: 16
    }
  });
  return { colors: state.Theme.colorData };
};

export const actionCreator = (type, payload = null) => ({ type, payload });

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authSuccess: (token, name, id, pass, attendance, timeTable) => {
      AsyncStorage.multiSet([
        ["token", token],
        ["authenticated", "1"],
        ["name", name],
        ["id", id],
        ["pass", pass],
        ["attendance", JSON.stringify(attendance)],
        ["timeTable", JSON.stringify(timeTable)]
      ]).catch(x => {
        console.log("Login Auth Error", x);
      });
      dispatch(actionCreator("LOGIN_SUCCESS"));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
