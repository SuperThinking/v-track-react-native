import { createStackNavigator, createAppContainer } from "react-navigation";
import Dashboard from "../Login/Dashboard";
import Login from "../Login/Login";
import { colors } from "../theme";
import store from "../store";

export default (AppNavigation = authenticated =>
  createAppContainer(
    createStackNavigator(
      {
        login: {
          getScreen: () => Login,
          navigationOptions: {
            header: null
            // title: "V-TRACK",
            // headerStyle: { backgroundColor: colors.headerBackgroundColor },
            // headerTintColor: colors.headerTextColor,
            // headerTitleStyle: {
            //   fontFamily: "Lato",
            //   fontWeight: "200"
            // }
          }
        },
        dashboard: {
          getScreen: () => Dashboard,
          navigationOptions: {
            title: "V-TRACK",
            headerTitleStyle: {
              fontFamily: "Lato",
              fontWeight: "200",
              alignSelf: "center"
            },
            headerStyle: {
              backgroundColor: store.getState().Theme.colorData
                .headerBackgroundColor
            },
            headerTintColor: store.getState().Theme.colorData.headerTextColor
          }
        }
      },
      {
        initialRouteName: authenticated ? "dashboard" : "login"
      }
    )
  ));
