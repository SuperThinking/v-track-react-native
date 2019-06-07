import React, { PureComponent } from "react";
import { AsyncStorage, View } from "react-native";
import { WaveIndicator } from "react-native-indicators";
import AppNavigation from "./src/shared/navigation";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { actionCreator } from "./src/Login/Login";
import * as Font from "expo-font";
import { toggleTheme } from "./src/actions";
import store from "./src/store/index";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

class AppRoot extends PureComponent {
  state = {
    fontsLoaded: 0,
    themeLoaded: 0
  };

  componentDidMount() {
    console.disableYellowBox = true;
    this.props.checkLogin();
    Font.loadAsync({
      RobotoB: require("./assets/fonts/Roboto-Black.ttf"),
      RobotoR: require("./assets/fonts/Roboto-Regular.ttf"),
      Tinos: require("./assets/fonts/Tinos-Bold.ttf"),
      Playfair: require("./assets/fonts/PlayfairDisplay-Black.ttf"),
      Lato: require("./assets/fonts/Lato-Black.ttf")
    }).then(() => {
      this.setState({ fontsLoaded: 1 });
    });
    AsyncStorage.getItem("THEME")
      .then(x => {
        console.log("THEME : !" + x);
        this.props.toggleTheme(x);
        this.setState({ themeLoaded: 1 });
      })
      .catch(x => {
        this.setState({ themeLoaded: 1 });
      });
  }

  async allowNotifications() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
    }
  }

  render() {
    const { app_started, authenticated } = this.props.authState;
    return app_started && this.state.fontsLoaded && this.state.themeLoaded
      ? this._renderAppRoot(authenticated)
      : this._renderSplash();
  }

  _renderAppRoot(authenticated) {
    const CreateRoot = AppNavigation(authenticated);
    return <CreateRoot />;
  }
  _renderSplash() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: this.props.colors.loginBackgroundColor
        }}
        behavior="padding"
        enabled
      >
        <WaveIndicator color={this.props.colors.loaderMain} size={50} />
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authState: state.authState,
    colors: state.Theme.colorData
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
    },
    toggleTheme: color => {
      dispatch(toggleTheme(color));
    }
  };
};

const RootApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRoot);

export default (appRootComponent = () => (
  <Provider store={store}>
    <RootApp />
  </Provider>
));
