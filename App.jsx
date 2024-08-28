import React, {
  createContext,
  useEffect,
  useContext,
  useRef,
  useState,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/redux/reducer';
import MainStackNavigator from './src/Navigation/MainStackNavigator';
import {PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {
  notificationListner,
  requestUserPermission,
} from './src/NotificationServices/NotificationServices';

const NavigationContext = createContext();
export const useNavigationContext = () => useContext(NavigationContext);

const store = createStore(rootReducer);

const App = () => {
  const [navigationState, setNavigationState] = useState('Signin');

  const handleNavigation = screen => {
    setNavigationState(screen);
  };
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'surescanr@1',
        channelName: 'surescanr',
        channelDescription: 'A default notification channel',
        soundName: 'default',
        importance: 4,
        vibrate: true,
        vibration: 300,
      },
      created => console.log(`createChannel returned '${created}'`),
    );

    const requestNotificationPermission = async () => {
      try {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied');
          }
        } else {
          console.log(
            'Notification permission not required on this Android version',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestUserPermission();
    notificationListner();
    requestNotificationPermission();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContext.Provider value={{navigationState, handleNavigation}}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </NavigationContext.Provider>
    </Provider>
  );
};

export default App;
