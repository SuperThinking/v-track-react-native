import { Notifications } from "expo";

const schedule = {
  A1: "6/5/2019 08:55:00",
  L1: "6/3/2019 08:00:00",
  F1: "6/5/2019 09:50:00",
  L2: "6/3/2019 08:50:00",
  D1: "6/6/2019 08:00:00",
  L3: "6/3/2019 09:50:00",
  TB1: "6/3/2019 10:45:00",
  L4: "6/3/2019 10:40:00",
  TG1: "6/3/2019 11:40:00",
  L5: "6/3/2019 11:40:00",
  L6: "6/3/2019 12:30:00",
  A2: "6/5/2019 14:55:00",
  L31: "6/3/2019 14:00:00",
  F2: "6/5/2019 15:50:00",
  L32: "6/3/2019 14:50:00",
  D2: "6/6/2019 14:00:00",
  L33: "6/3/2019 15:50:00",
  TB2: "6/3/2019 16:45:00",
  L34: "6/3/2019 16:40:00",
  TG2: "6/3/2019 17:40:00",
  L35: "6/3/2019 17:40:00",
  L36: "6/3/2019 18:30:00",
  B1: "6/6/2019 08:55:00",
  L7: "6/4/2019 08:00:00",
  G1: "6/6/2019 09:50:00",
  L8: "6/4/2019 08:50:00",
  E1: "6/7/2019 08:00:00",
  L9: "6/4/2019 09:50:00",
  TC1: "6/4/2019 10:45:00",
  L10: "6/4/2019 10:40:00",
  TAA1: "6/4/2019 11:40:00",
  L11: "6/4/2019 11:40:00",
  L12: "6/4/2019 12:30:00",
  B2: "6/6/2019 14:55:00",
  L37: "6/4/2019 14:00:00",
  G2: "6/6/2019 15:50:00",
  L38: "6/4/2019 14:50:00",
  E2: "6/7/2019 14:00:00",
  L39: "6/4/2019 15:50:00",
  TC2: "6/4/2019 16:45:00",
  L40: "6/4/2019 16:40:00",
  TAA2: "6/4/2019 17:40:00",
  L41: "6/4/2019 17:40:00",
  L42: "6/4/2019 18:30:00",
  C1: "6/7/2019 08:55:00",
  L13: "6/5/2019 08:00:00",
  L14: "6/5/2019 08:50:00",
  L15: "6/5/2019 09:50:00",
  TD1: "6/5/2019 10:45:00",
  L16: "6/5/2019 10:40:00",
  L17: "6/5/2019 11:40:00",
  L18: "6/5/2019 12:30:00",
  C2: "6/7/2019 14:55:00",
  L43: "6/5/2019 14:00:00",
  L44: "6/5/2019 14:50:00",
  L45: "6/5/2019 15:50:00",
  TD2: "6/5/2019 16:45:00",
  L46: "6/5/2019 16:40:00",
  TBB2: "6/5/2019 17:40:00",
  L47: "6/5/2019 17:40:00",
  L48: "6/5/2019 18:30:00",
  L19: "6/6/2019 08:00:00",
  L20: "6/6/2019 08:50:00",
  L21: "6/6/2019 09:50:00",
  TE1: "6/6/2019 10:45:00",
  L22: "6/6/2019 10:40:00",
  TCC1: "6/6/2019 11:40:00",
  L23: "6/6/2019 11:40:00",
  L24: "6/6/2019 12:30:00",
  L49: "6/6/2019 14:00:00",
  L50: "6/6/2019 14:50:00",
  L51: "6/6/2019 15:50:00",
  TE2: "6/6/2019 16:45:00",
  L52: "6/6/2019 16:40:00",
  TCC2: "6/6/2019 17:40:00",
  L53: "6/6/2019 17:40:00",
  L54: "6/6/2019 18:30:00",
  L25: "6/7/2019 08:00:00",
  L26: "6/7/2019 08:50:00",
  TA1: "6/7/2019 09:50:00",
  L27: "6/7/2019 09:50:00",
  TF1: "6/7/2019 10:45:00",
  L28: "6/7/2019 10:40:00",
  TDD1: "6/7/2019 11:40:00",
  L29: "6/7/2019 11:40:00",
  L30: "6/7/2019 12:30:00",
  L55: "6/7/2019 14:00:00",
  L56: "6/7/2019 14:50:00",
  TA2: "6/7/2019 15:50:00",
  L57: "6/7/2019 15:50:00",
  TF2: "6/7/2019 16:45:00",
  L58: "6/7/2019 16:40:00",
  TDD2: "6/7/2019 17:40:00",
  L59: "6/7/2019 17:40:00",
  L60: "6/7/2019 18:30:00"
};

function setReminders(tt) {
  var codes = Object.keys(tt);
  for (let i in codes) {
    const localNotification = {
      title: tt[codes[i]][0],
      body: "Upcoming, " + tt[codes[i]][1] + " at " + tt[codes[i]][3]
    };

    let time = new Date(schedule[codes[i]]).getTime() - 600000;

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

function clearAllNotifications() {
  Notifications.dismissAllNotificationsAsync().catch(x => {
    console.log("Error clearing all notifications", x);
  });
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
