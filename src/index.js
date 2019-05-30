import React from "react";

import Attendance from "./Attendance/Attendance";
import TimeTable from "./TimeTable/TimeTable";
import Subject from "./Attendance/Subject";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import { colors } from "./theme";
import About from "./About/About";

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

const Tabs = createBottomTabNavigator(
  {
    Attendance: {
      screen: Attendance,
      navigationOptions: () => ({
        tabBarIcon: () => <Icon name="line-chart" size={30} color="#000" />
      })
    },
    TimeTable: {
      screen: TimeTable,
      navigationOptions: () => ({
        tabBarIcon: () => <Icon name="table" size={30} color="#000" />
      })
    },
    About: {
      screen: About,
      navigationOptions: () => ({
        tabBarIcon: () => <Icon name="info-circle" size={30} color="#000" />
      })
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: colors.bottomNavBarBackgroundColor
      }
    }
  }
);

const AppContainer = createAppContainer(Tabs);

export default AppContainer;
