import React from 'react'
import { 
  Platform, 
  StatusBar, 
  StyleSheet, 
  View, 
  AsyncStorage 
} from 'react-native'
import { AppLoading, Asset, Font } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import RootNavigation from './navigation/RootNavigation'
import Moment from 'moment'
import 'moment/locale/ko'
import * as firebase from 'firebase'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    Moment.locale('ko')
    
    this.state = {
      isLoadingComplete: false,
    }
  }

  render() {
    const {isLoadingComplete, skipLoadingScreen, user} = this.state
    const initialRouteName = user ? 'Main':'Signup'

    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && 
            <StatusBar barStyle="default" />
          }
          {Platform.OS === 'android' &&
            <View style={styles.statusBarUnderlay} />
          }
          <RootNavigation initialRouteName={initialRouteName} />
        </View>
      )                  
    }
  }

  _getUser = async () => {
    try {
      // @TBD
      // AsyncStorage.removeItem('@poll:user')

      const user = await AsyncStorage.getItem('@poll:user')
      if (user) {
        this.setState({user: JSON.parse(user)})
      }
    } catch (err) {
      console.log(err)
    }
  }

  _loadResourcesAsync = async () => {
    // bad fix for yellow box https://github.com/facebook/react-native/issues/12981#issuecomment-303552090
    console.ignoredYellowBox = [
      'Setting a timer'
    ]

    this._initFirebase()

    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync([
        // This is the font that we are using for our tab bar
        Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
      ]),
      this._getUser(),
    ]);
  };

  _initFirebase = () => {
    console.log('_initFirebase')

    // Set the configuration for your app
    // TODO: Replace with your project's config object
    var config = {
      apiKey: "AIzaSyD7GDF1pwxQYUbXXM1FEN9DTwBCglunXBs",
      authDomain: "poll-e8f6a.firebaseapp.com",
      databaseURL: "https://poll-e8f6a.firebaseio.com",
      storageBucket: "poll-e8f6a.appspot.com"
    }
    firebase.initializeApp(config)

    // Get a reference to the database service
    const database = firebase.database()
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
})
