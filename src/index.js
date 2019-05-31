import React from "react";

import Attendance from "./Attendance/Attendance";
import TimeTable from "./TimeTable/TimeTable";
import Subject from "./Attendance/Subject";
import Icon from "react-native-vector-icons/FontAwesome";
import Day from "./TimeTable/day";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createMaterialTopTabNavigator
} from "react-navigation";

import { colors } from "./theme";
import About from "./About/About";

const mockTimeTable = {
  monday: [
    ["8:00-8:50", "A1"],
    ["8:00-8:50", "L1"],
    ["8:55-9:45", "F1"],
    ["8:50-9:40", "L2"],
    ["9:50-10:40", "D1"],
    ["9:50-10:40", "L3"],
    ["10:45-11:35", "TB1"],
    ["10:40-11:30", "L4"],
    ["11:40-12:30", "TG1"],
    ["11:40-12:30", "L5"],
    ["12:30-1:20", "L6"],
    ["2:00-2:50", "A2"],
    ["2:00-2:50", "L31"],
    ["2:55-3:45", "F2"],
    ["2:50-3:40", "L32"],
    ["3:50-4:40", "D2"],
    ["3:50-4:40", "L33"],
    ["4:45-5:35", "TB2"],
    ["4:40-5:30", "L34"],
    ["5:40-6:30", "TG2"],
    ["5:40-6:30", "L35"],
    ["6:30-7:20", "L36"]
  ],

  tuesday: [
    ["8:00-8:50", "B1"],
    ["8:00-8:50", "L7"],
    ["8:55-9:45", "G1"],
    ["8:50-9:40", "L8"],
    ["9:50-10:40", "E1"],
    ["9:50-10:40", "L9"],
    ["10:45-11:35", "TC1"],
    ["10:40-11:30", "L10"],
    ["11:40-12:30", "TAA1"],
    ["11:40-12:30", "L11"],
    ["12:30-1:20", "L12"],
    ["2:00-2:50", "B2"],
    ["2:00-2:50", "L37"],
    ["2:55-3:45", "G2"],
    ["2:50-3:40", "L38"],
    ["3:50-4:40", "E2"],
    ["3:50-4:40", "L39"],
    ["4:45-5:35", "TC2"],
    ["4:40-5:30", "L40"],
    ["5:40-6:30", "TAA2"],
    ["5:40-6:30", "L41"],
    ["6:30-7:20", "L42"]
  ],

  wednesday: [
    ["8:00-8:50", "C1"],
    ["8:00-8:50", "L13"],
    ["8:55-9:45", "A1"],
    ["8:50-9:40", "L14"],
    ["9:50-10:40", "F1"],
    ["9:50-10:40", "L15"],
    ["10:45-11:35", "TD1"],
    ["10:40-11:30", "L16"],
    ["11:40-12:30", "L17"],
    ["12:30-1:20", "L18"],
    ["2:00-2:50", "C2"],
    ["2:00-2:50", "L43"],
    ["2:55-3:45", "A2"],
    ["2:50-3:40", "L44"],
    ["3:50-4:40", "F2"],
    ["3:50-4:40", "L45"],
    ["4:45-5:35", "TD2"],
    ["4:40-5:30", "L46"],
    ["5:40-6:30", "TBB2"],
    ["5:40-6:30", "L47"],
    ["6:30-7:20", "L48"]
  ],

  thursday: [
    ["8:00-8:50", "D1"],
    ["8:00-8:50", "L19"],
    ["8:55-9:45", "B1"],
    ["8:50-9:40", "L20"],
    ["9:50-10:40", "G1"],
    ["9:50-10:40", "L21"],
    ["10:45-11:35", "TE1"],
    ["10:40-11:30", "L22"],
    ["11:40-12:30", "TCC1"],
    ["11:40-12:30", "L23"],
    ["12:30-1:20", "L24"],
    ["2:00-2:50", "D2"],
    ["2:00-2:50", "L49"],
    ["2:55-3:45", "B2"],
    ["2:50-3:40", "L50"],
    ["3:50-4:40", "G2"],
    ["3:50-4:40", "L51"],
    ["4:45-5:35", "TE2"],
    ["4:40-5:30", "L52"],
    ["5:40-6:30", "TCC2"],
    ["5:40-6:30", "L53"],
    ["6:30-7:20", "L54"]
  ],

  friday: [
    ["8:00-8:50", "E1"],
    ["8:00-8:50", "L25"],
    ["8:55-9:45", "C1"],
    ["8:50-9:40", "L26"],
    ["9:50-10:40", "TA1"],
    ["9:50-10:40", "L27"],
    ["10:45-11:35", "TF1"],
    ["10:40-11:30", "L28"],
    ["11:40-12:30", "TDD1"],
    ["11:40-12:30", "L29"],
    ["12:30-1:20", "L30"],
    ["2:00-2:50", "E2"],
    ["2:00-2:50", "L55"],
    ["2:55-3:45", "C2"],
    ["2:50-3:40", "L56"],
    ["3:50-4:40", "TA2"],
    ["3:50-4:40", "L57"],
    ["4:45-5:35", "TF2"],
    ["4:40-5:30", "L58"],
    ["5:40-6:30", "TDD2"],
    ["5:40-6:30", "L59"],
    ["6:30-7:20", "L60"]
  ]
};

const Days = createMaterialTopTabNavigator(
  {
    Monday: {
      screen: Day(mockTimeTable.monday),
      navigationOptions: {
        tabBarLabel: "Mon"
      }
    },
    Tuesday: {
      screen: Day(mockTimeTable.tuesday),
      navigationOptions: {
        tabBarLabel: "Tue"
      }
    },
    Wednesday: {
      screen: Day(mockTimeTable.wednesday),
      navigationOptions: {
        tabBarLabel: "Wed"
      }
    },
    Thursday: {
      screen: Day(mockTimeTable.thursday),
      navigationOptions: {
        tabBarLabel: "Thu"
      }
    },
    Friday: {
      screen: Day(mockTimeTable.friday),
      navigationOptions: {
        tabBarLabel: "Fri"
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: "#4286f4"
      }
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
      screen: Days,
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
