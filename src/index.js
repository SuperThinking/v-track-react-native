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

import Timer from './pushNotification';

import { colors } from "./theme";
import About from "./About/About";

const mockTimeTable = {
  monday: [
    ["08:00 - 08:50", "A1"],
    ["08:00 - 08:50", "L1"],
    ["08:55 - 09:45", "F1"],
    ["08:50 - 09:40", "L2"],
    ["09:50 - 10:40", "D1"],
    ["09:50 - 10:40", "L3"],
    ["10:45 - 11:35", "TB1"],
    ["10:40 - 11:30", "L4"],
    ["11:40 - 12:30", "TG1"],
    ["11:40 - 12:30", "L5"],
    ["12:30 - 01:20", "L6"],
    ["02:00 - 02:50", "A2"],
    ["02:00 - 02:50", "L31"],
    ["02:55 - 03:45", "F2"],
    ["02:50 - 03:40", "L32"],
    ["03:50 - 04:40", "D2"],
    ["03:50 - 04:40", "L33"],
    ["04:45 - 05:35", "TB2"],
    ["04:40 - 05:30", "L34"],
    ["05:40 - 06:30", "TG2"],
    ["05:40 - 06:30", "L35"],
    ["06:30 - 07:20", "L36"]
  ],

  tuesday: [
    ["08:00 - 08:50", "B1"],
    ["08:00 - 08:50", "L7"],
    ["08:55 - 09:45", "G1"],
    ["08:50 - 09:40", "L8"],
    ["09:50 - 10:40", "E1"],
    ["09:50 - 10:40", "L9"],
    ["10:45 - 11:35", "TC1"],
    ["10:40 - 11:30", "L10"],
    ["11:40 - 12:30", "TAA1"],
    ["11:40 - 12:30", "L11"],
    ["12:30 - 01:20", "L12"],
    ["02:00 - 02:50", "B2"],
    ["02:00 - 02:50", "L37"],
    ["02:55 - 03:45", "G2"],
    ["02:50 - 03:40", "L38"],
    ["03:50 - 04:40", "E2"],
    ["03:50 - 04:40", "L39"],
    ["04:45 - 05:35", "TC2"],
    ["04:40 - 05:30", "L40"],
    ["05:40 - 06:30", "TAA2"],
    ["05:40 - 06:30", "L41"],
    ["06:30 - 07:20", "L42"]
  ],

  wednesday: [
    ["08:00 - 08:50", "C1"],
    ["08:00 - 08:50", "L13"],
    ["08:55 - 09:45", "A1"],
    ["08:50 - 09:40", "L14"],
    ["09:50 - 10:40", "F1"],
    ["09:50 - 10:40", "L15"],
    ["10:45 - 11:35", "TD1"],
    ["10:40 - 11:30", "L16"],
    ["11:40 - 12:30", "L17"],
    ["12:30 - 01:20", "L18"],
    ["02:00 - 02:50", "C2"],
    ["02:00 - 02:50", "L43"],
    ["02:55 - 03:45", "A2"],
    ["02:50 - 03:40", "L44"],
    ["03:50 - 04:40", "F2"],
    ["03:50 - 04:40", "L45"],
    ["04:45 - 05:35", "TD2"],
    ["04:40 - 05:30", "L46"],
    ["05:40 - 06:30", "TBB2"],
    ["05:40 - 06:30", "L47"],
    ["06:30 - 07:20", "L48"]
  ],

  thursday: [
    ["08:00 - 08:50", "D1"],
    ["08:00 - 08:50", "L19"],
    ["08:55 - 09:45", "B1"],
    ["08:50 - 09:40", "L20"],
    ["09:50 - 10:40", "G1"],
    ["09:50 - 10:40", "L21"],
    ["10:45 - 11:35", "TE1"],
    ["10:40 - 11:30", "L22"],
    ["11:40 - 12:30", "TCC1"],
    ["11:40 - 12:30", "L23"],
    ["12:30 - 01:20", "L24"],
    ["02:00 - 02:50", "D2"],
    ["02:00 - 02:50", "L49"],
    ["02:55 - 03:45", "B2"],
    ["02:50 - 03:40", "L50"],
    ["03:50 - 04:40", "G2"],
    ["03:50 - 04:40", "L51"],
    ["04:45 - 05:35", "TE2"],
    ["04:40 - 05:30", "L52"],
    ["05:40 - 06:30", "TCC2"],
    ["05:40 - 06:30", "L53"],
    ["06:30 - 07:20", "L54"]
  ],

  friday: [
    ["08:00 - 08:50", "E1"],
    ["08:00 - 08:50", "L25"],
    ["08:55 - 09:45", "C1"],
    ["08:50 - 09:40", "L26"],
    ["09:50 - 10:40", "TA1"],
    ["09:50 - 10:40", "L27"],
    ["10:45 - 11:35", "TF1"],
    ["10:40 - 11:30", "L28"],
    ["11:40 - 12:30", "TDD1"],
    ["11:40 - 12:30", "L29"],
    ["12:30 - 01:20", "L30"],
    ["02:00 - 02:50", "E2"],
    ["02:00 - 02:50", "L55"],
    ["02:55 - 03:45", "C2"],
    ["02:50 - 03:40", "L56"],
    ["03:50 - 04:40", "TA2"],
    ["03:50 - 04:40", "L57"],
    ["04:45 - 05:35", "TF2"],
    ["04:40 - 05:30", "L58"],
    ["05:40 - 06:30", "TDD2"],
    ["05:40 - 06:30", "L59"],
    ["06:30 - 07:20", "L60"]
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
