/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {notify} from './src/NotificationServices/NotificationServices';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (remoteMessage) {
    notify(remoteMessage.notification);
  }
});

AppRegistry.registerComponent(appName, () => App);
