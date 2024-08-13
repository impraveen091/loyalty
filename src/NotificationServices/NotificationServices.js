import messaging from '@react-native-firebase/messaging';
import {getUserData, saveUserData} from '../Auth/Auth';
import {Alert} from 'react-native';
import PushNotification from 'react-native-push-notification';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

export const getFcmToken = async () => {
  let fcmToken = await getUserData('fcmToken');
  console.log(fcmToken, 'fcmToken old');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, ' new generated fcmToken');
        await saveUserData('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('error raised in fcm token', error);
      Alert.alert(error.message);
    }
  }
};

export const notificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('FCM message in forground!', remoteMessage.notification);
    if (remoteMessage.notification) {
      notify(remoteMessage.notification);
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state',
          remoteMessage.notification,
        );
      }
    });
};

export const notify = data => {
  if (data) {
    const {title, body} = data;
    const imageUrl = data.android?.imageUrl; // Fetch the image URL if present
    PushNotification.localNotification({
      channelId: 'surescanr@1',
      title: title || 'Default Title',
      message: body || 'Default Message',
      bigPictureUrl: imageUrl, // Display the image in the notification
      bigLargeIcon: imageUrl, // Show a large icon if needed
      largeIconUrl: imageUrl, // Show the image as an icon
      priority: 'high', // High priority for immediate display
    });
  }
};
