import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import axiosInstance from '../AxiosInstance';
import {useNavigation} from '@react-navigation/native';
import {deviceWidth} from '../constants/Constants';

const Scan = () => {
  const [code, setCode] = useState('');
  const [showScanner, setShowScanner] = useState(true);
  const navigation = useNavigation();

  const submit = async () => {
    if (!code) {
      ToastAndroid.show('Please enter a code', ToastAndroid.SHORT);
      return;
    }
    try {
      const url = 'qr-code/verify/unique-code';
      const payload = {uniqueId: code};
      const response = await axiosInstance.post(url, payload);
      if (response.data.success) {
        ToastAndroid.show(
          'Code Verified,Points will be added shortly',
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
      const response = await axiosInstance.get(`qr-code/${url}`);
      if (response.data.success) {
        ToastAndroid.show(
          'Scan done,Points will be added shortly',
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
