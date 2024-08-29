import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {defaultImage, deviceWidth} from '../constants/Constants';
import {getToken} from '../Auth/Auth';

const Splash = () => {
  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          setInitialRoute('DashboardDrawer');
        } else {
          setInitialRoute('Signin');
        }
      } catch (error) {
        console.error('Error checking token', error);
        setInitialRoute('Signin');
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    if (initialRoute) {
      const timer = setTimeout(() => {
        navigation.replace(initialRoute);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [initialRoute, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MyApp</Text>
      <Image
        source={{uri: defaultImage}}
        style={{
          width: deviceWidth - 20,
          height: deviceWidth - 20,
          resizeMode: 'contain',
        }}
      />
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Splash;
