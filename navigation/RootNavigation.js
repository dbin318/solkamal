import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';
import NewHomeScreen from '../screens/NewHomeScreen'
import PlayScreen from '../screens/PlayScreen'
import ResultScreen from '../screens/ResultScreen'
import SignupScreen from '../screens/SignupScreen'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync'


export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    const { initialRouteName } = this.props

    console.log('RootNavigator.render, initialRouteName', initialRouteName)

    const RootStackNavigator = StackNavigator(
      {
        Main: {
          screen: NewHomeScreen,
        },
        Play: {
          screen: PlayScreen, 
        },
        Result: {
          screen: ResultScreen, 
        },
        Signup: {
          screen: SignupScreen,
        },
      },
      {
        navigationOptions: () => ({
          headerTitleStyle: {
            fontWeight: 'normal',
          },
        }),
        initialRouteName,
      }
    )

    return <RootStackNavigator />
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
