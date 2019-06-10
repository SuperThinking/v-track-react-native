import { Notifications } from "expo";
import moment from "moment";

const schedule = {
  "1": [
    [8, 0, "A1"],
    [8, 0, "L1"],
    [8, 55, "F1"],
    [8, 50, "L2"],
    [9, 50, "D1"],
    [9, 50, "L3"],
    [10, 45, "TB1"],
    [10, 40, "L4"],
    [11, 40, "TG1"],
    [11, 40, "L5"],
    [12, 30, "L6"],
    [14, 0, "A2"],
    [14, 0, "L31"],
    [14, 55, "F2"],
    [14, 50, "L32"],
    [15, 50, "D2"],
    [15, 50, "L33"],
    [16, 45, "TB2"],
    [16, 40, "L34"],
    [17, 40, "TG2"],
    [17, 40, "L35"],
    [18, 30, "L36"]
  ],
  "2": [
    [8, 0, "B1"],
    [8, 0, "L7"],
    [8, 55, "G1"],
    [8, 50, "L8"],
    [9, 50, "E1"],
    [9, 50, "L9"],
    [10, 45, "TC1"],
    [10, 40, "L10"],
    [11, 40, "TAA1"],
    [11, 40, "L11"],
    [12, 30, "L12"],
    [14, 0, "B2"],
    [14, 0, "L37"],
    [14, 55, "G2"],
    [14, 50, "L38"],
    [15, 50, "E2"],
    [15, 50, "L39"],
    [16, 45, "TC2"],
    [16, 40, "L40"],
    [17, 40, "TAA2"],
    [17, 40, "L41"],
    [18, 30, "L42"]
  ],
  "3": [
    [8, 0, "C1"],
    [8, 0, "L13"],
    [8, 55, "A1"],
    [8, 50, "L14"],
    [9, 50, "F1"],
    [9, 50, "L15"],
    [10, 45, "TD1"],
    [10, 40, "L16"],
    [11, 40, "L17"],
    [12, 30, "L18"],
    [14, 0, "C2"],
    [14, 0, "L43"],
    [14, 55, "A2"],
    [14, 50, "L44"],
    [15, 50, "F2"],
    [15, 50, "L45"],
    [16, 45, "TD2"],
    [16, 40, "L46"],
    [17, 40, "TBB2"],
    [17, 40, "L47"],
    [18, 30, "L48"]
  ],
  "4": [
    [8, 0, "D1"],
    [8, 0, "L19"],
    [8, 55, "B1"],
    [8, 50, "L20"],
    [9, 50, "G1"],
    [9, 50, "L21"],
    [10, 45, "TE1"],
    [10, 40, "L22"],
    [11, 40, "TCC1"],
    [11, 40, "L23"],
    [12, 30, "L24"],
    [14, 0, "D2"],
    [14, 0, "L49"],
    [14, 55, "B2"],
    [14, 50, "L50"],
    [15, 50, "G2"],
    [15, 50, "L51"],
    [16, 45, "TE2"],
    [16, 40, "L52"],
    [17, 40, "TCC2"],
    [17, 40, "L53"],
    [18, 30, "L54"]
  ],
  "5": [
    [8, 0, "E1"],
    [8, 0, "L25"],
    [8, 55, "C1"],
    [8, 50, "L26"],
    [9, 50, "TA1"],
    [9, 50, "L27"],
    [10, 45, "TF1"],
    [10, 40, "L28"],
    [11, 40, "TDD1"],
    [11, 40, "L29"],
    [12, 30, "L30"],
    [14, 0, "E2"],
    [14, 0, "L55"],
    [14, 55, "C2"],
    [14, 50, "L56"],
    [15, 50, "TA2"],
    [15, 50, "L57"],
    [16, 45, "TF2"],
    [16, 40, "L58"],
    [17, 40, "TDD2"],
    [17, 40, "L59"],
    [18, 30, "L60"]
  ]
};

function setReminders(tt) {
  var codes = Object.keys(schedule);
  for (let i in codes) {
    let day = parseInt(codes[i]);
    let code = codes[i];
    let nextChosenWeekday =
      day < moment().weekday()
        ? moment().weekday(day + 7)
        : moment().weekday(day);

    let date = moment(nextChosenWeekday, "ddd MMM D YYYY HH:mm:ss ZZ");

    for (let j in schedule[code]) {
      if (schedule[code][j][2] in tt) {
        let custom = date.set({
          h: schedule[code][j][0],
          m: schedule[code][j][1],
          s: 0
        });

        const localNotification = {
          title: tt[schedule[code][j][2]][0],
          body:
            "Upcoming, " +
            tt[schedule[code][j][2]][1] +
            " at " +
            tt[schedule[code][j][2]][3]
        };

        let time = new Date(custom).getTime() - 600000;

        const schedulingOptions = {
          time: time,
          repeat: "week"
        };

        Notifications.scheduleLocalNotificationAsync(
          localNotification,
          schedulingOptions
        ).catch(x => {
          console.log("Unable to set Notification", x);
        });
      }
    }
  }
}

function clearAllNotifications() {
  Notifications.cancelAllScheduledNotificationsAsync();
}

function handleNotification() {
  console.warn("ok! got your notif");
}

// function componentDidMount() {
//   // We need to ask for Notification permissions for ios devices
//   let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

//   if (Constants.isDevice && result.status === "granted") {
//     console.log("Notification permissions granted.");
//   }

//   // If we want to do something with the notification when the app
//   // is active, we need to listen to notification events and
//   // handle them in a callback
//   Notifications.addListener(this.handleNotification);
// }

export default (pushNotification = {
  setReminders: setReminders,
  clearAllNotifications: clearAllNotifications
});
