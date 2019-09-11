import { createStackNavigator, createAppContainer } from "react-navigation";
import Attendance from "./Attendance/Attendance";
import DetailedView from "./Attendance/DetailedView";

export default (AppNavigation = () =>
  createAppContainer(
    createStackNavigator(
      {
        attendance: {
          getScreen: () => Attendance,
          navigationOptions: {
            header: null
          }
        },
        detail: {
          getScreen: () => DetailedView,
          navigationOptions: {
            header: null
          }
        }
      },
      {
        initialRouteName: "attendance"
      }
    )
  ));
