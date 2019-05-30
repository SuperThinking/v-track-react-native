import { createStackNavigator, createAppContainer } from "react-navigation";
import Dashboard from "../Login/Dashboard";
import Login from "../Login/Login";
import { colors } from "../theme";

export default (AppNavigation = authenticated =>
  createAppContainer(
    createStackNavigator(
      {
        login: {
          getScreen: () => Login,
          navigationOptions: {
            title: "V-TRACK",
            headerStyle: { backgroundColor: colors.headerBackgroundColor },
            headerTintColor: colors.headerTextColor,
            headerTitleStyle: {
              fontFamily: "Playfair",
              fontWeight: "200"
            }
          }
        },
        dashboard: {
          getScreen: () => Dashboard,
          navigationOptions: {
            title: "V-TRACK",
            headerStyle: { backgroundColor: colors.headerBackgroundColor },
            headerTintColor: colors.headerTextColor,
            headerTitleStyle: {
              fontFamily: "Playfair",
              fontWeight: "200"
            }
          }
        }
      },
      {
        initialRouteName: authenticated ? "dashboard" : "login"
      }
    )
  ));
