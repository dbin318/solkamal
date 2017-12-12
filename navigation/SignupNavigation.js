import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import SignupScreen from '../screens/SignupScreen'

const SignupStackNavigator = StackNavigator(
  {
    Main: {
      screen: SignupScreen,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class SignupNavigator extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return <SignupStackNavigator />;
  }
}
