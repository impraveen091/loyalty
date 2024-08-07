import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import axiosInstance from '../Auth/AxiosInstance';
import {useNavigation} from '@react-navigation/native';
import {deviceWidth} from '../constants/Constants';

Geocoder.init('AIzaSyAkikZ_PfaF6DnsfiTMQktBUBXcHD43pTI');

const Scan = () => {
  const [code, setCode] = useState('');
  const [showScanner, setShowScanner] = useState(true);
  // const [location, setLocation] = useState(null);
  const [city, setCity] = useState('');
  const navigation = useNavigation();

  console.log('city', city);
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'We need access to your location to show your position on the map',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted');
      getCurrentLocation();
    } else {
      console.log('Location permission denied');
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // setLocation(position.coords);
        getCityFromCoordinates(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      error => {
        console.log(error);
        alert('Failed to get location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const addressComponent = response.results[0].address_components.find(
        component => component.types.includes('locality'),
      );
      setCity(addressComponent ? addressComponent.long_name : '');
    } catch (error) {
      console.log('Error in geocoding:', error);
      alert('Failed to get city from coordinates');
    }
  };

  const submit = async () => {
    if (!code) {
      ToastAndroid.show('Please enter a code', ToastAndroid.SHORT);
      return;
    }
    try {
      const url = `qr-code/verify/unique-code?location=${city}`;
      const payload = {uniqueId: code};
      const response = await axiosInstance.post(url, payload);
      if (response.data.success) {
        ToastAndroid.show(
          'Code Verified, Points will be added shortly',
          ToastAndroid.SHORT,
        );
        navigation.navigate('DashboardDrawer', {screen: 'Dashboard'});
      } else {
        alert('Failed to redeem code');
      }
    } catch (err) {
      console.log('API call error:', err.response?.data.message || err.message);
      alert(err.response?.data.message || err.message);
    }
  };

  const handleScan = async data => {
    const url = data.split('api/')[1];
    try {
      const response = await axiosInstance.get(
        `qr-code/${url}?location=${city.toLocaleLowerCase()}`,
      );
      if (response.data.success) {
        ToastAndroid.show(
          'Scan done, Points will be added shortly',
          ToastAndroid.SHORT,
        );
        navigation.navigate('DashboardDrawer', {screen: 'Dashboard'});
      } else {
        alert('Failed QR scan');
      }
    } catch (err) {
      console.log('API call error:', err.response?.data.message || err.message);
      alert(err.response?.data.message || err.message);
    }
  };

  return (
    <View style={styles.container}>
      {showScanner ? (
        <QRCodeScanner
          onRead={({data}) => handleScan(data)}
          flashMode={RNCamera.Constants.FlashMode.auto}
          reactivate={true}
          reactivateTimeout={500}
          showMarker={true}
          topContent={<Text style={styles.topText}>QR Scanner</Text>}
          bottomContent={
            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => setShowScanner(false)}>
              <Text style={styles.switchText}>Enter Code Manually</Text>
            </TouchableOpacity>
          }
        />
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={'Enter QR Code'}
            placeholderTextColor="grey"
            onChangeText={setCode}
            value={code}
            onFocus={() => setShowScanner(false)}
          />
          <TouchableOpacity style={styles.submit} onPress={submit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setShowScanner(true)}>
            <Text style={styles.switchText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: deviceWidth - 60,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submit: {
    backgroundColor: '#00308F',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
  },
  switchButton: {
    backgroundColor: '#007BFF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  switchText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Scan;
