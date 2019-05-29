import { createStackNavigator, createAppContainer } from "react-navigation";
import Dashboard from "../Login/Dashboard";
import Login from "../Login/Login";

export default (AppNavigation = authenticated =>
  createAppContainer(
    createStackNavigator(
      {
        login: {
          getScreen: () => Login,
          navigationOptions: {
            title: "Login"
          }
        },
        dashboard: {
          getScreen: () => Dashboard
          // navigationOptions:{
          //     title:'Dashboard'
          // }
        }
      },
      {
        initialRouteName: authenticated ? "dashboard" : "login"
      }
    )
  ));
