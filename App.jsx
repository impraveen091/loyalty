import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/redux/reducer';
import MainStackNavigator from './src/Navigation/MainStackNavigator';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import requestUserPermission from '.';

const firebaseConfig = {
  projectId: 'surescanr-6d375',
  messagingSenderId: '758866544660',
  appId: '1:758866544660:android:3a0761496901129e4ebf01',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer);

const App = () => {
  const [fcmToken, setFcmTocken] = useState(null);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    console.log('fcm token', fcmToken);
  }, [fcmToken]);

  const getToken = async () => {
    try {
      const fcm = await messaging().getToken();
      if (fcm) {
        setFcmTocken(fcm);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
