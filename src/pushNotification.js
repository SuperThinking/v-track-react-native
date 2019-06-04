import React, { Component } from "react";
import { TextInput, View, Keyboard } from "react-native";
import { Constants, Notifications, Permissions } from "expo";

export default class Timer extends Component {
  onSubmit(e) {
    Keyboard.dismiss();

    const localNotification = {
      title: "done",
      body: "done!"
    };

    let sendAfterFiveSeconds = (new Date()-new Date(1970, 1, 1))+5000

    const schedulingOptions = {
      time: sendAfterFiveSeconds
    };

    // Notifications show only when app is not active.
    // (ie. another app being used or device's screen is locked)
    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    ).catch(x => {
      console.log(x);
    });
  }

  handleNotification() {
    console.warn("ok! got your notif");
  }

  async componentDidMount() {
    // We need to ask for Notification permissions for ios devices
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === "granted") {
      console.log("Notification permissions granted.");
    }

    // If we want to do something with the notification when the app
    // is active, we need to listen to notification events and
    // handle them in a callback
    Notifications.addListener(this.handleNotification);
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <TextInput onSubmitEditing={this.onSubmit} placeholder={"time in ms"} />
      </View>
    );
  }
}
