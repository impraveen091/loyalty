import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const Scan = () => {
  const [scannedData, setScannedData] = useState(null);

  const handleScan = async data => {
    console.log('Scan Data', data);
    const url = data;
    try {
      const response = await axiosInstance.post(url);
      console.log('Update Profile Response', response.data);
      if (response.data.success) {
        saveUserData('data', response.data.data);
        ToastAndroid.show('Image Updated successfully', ToastAndroid.SHORT);
        navigation.navigate('Dashboard');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      console.log('API call error:', err.response?.data);
      alert('Scan Data Failed');
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={({data}) => handleScan(data)}
        flashMode={RNCamera.Constants.FlashMode.auto}
        reactivate={true}
        reactivateTimeout={500}
        showMarker={true}
        cameraTimeout={10000}
        topContent={
          <View>
            <Text>{scannedData}</Text>
          </View>
        }
        bottomContent={<Text style={styles.buttonText}>QR Code Scanner</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedData: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Scan;
