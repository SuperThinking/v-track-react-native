import React from "react";

import Attendance from "./Attendance/Attendance";
import TimeTable from "./TimeTable/TimeTable";
import Subject from "./Attendance/Subject";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { colors } from "./theme";
import ReduxAttendance from "./Attendance/reduxAttendance";

const AttendanceNav = createStackNavigator(
  {
    Attendance: { screen: Attendance },
    Subject: { screen: Subject }
  },
  {
    navigationOptions: {
      headerStyle: {
          backgroundColor: colors.primary
      },
      headerTintColor: "#fff"
    }
  }
);

const TimeTableNav = createStackNavigator(
  {
    TimeTable: { screen: TimeTable }
  },
  {
    navigationOptions: {
      headerStyle: {
          backgroundColor: colors.primary
      },
      headerTintColor: "#fff"
    }
  }
);

const Tabs = createBottomTabNavigator({
    Attendance: {screen: Attendance},
    TimeTable: {screen: TimeTable},
    Redux_Attendance: {screen: ReduxAttendance}
})

const AppContainer = createAppContainer(Tabs);

export default AppContainer;
