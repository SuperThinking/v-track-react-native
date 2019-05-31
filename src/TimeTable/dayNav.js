import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";
import Day from "./day";

const Days = createMaterialTopTabNavigator(
  {
    Monday: {
      screen: Day("Monday")
    }
    // Tuesday: {
    //   screen: Day
    // },
    // Wednesday: {
    //   screen: Day
    // },
    // Thursday: {
    //   screen: Day
    // },
    // Friday: {
    //   screen: Day
    // }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#fff"
      }
    }
  }
);

const AppContainer = createAppContainer(Days);

export default AppContainer;
