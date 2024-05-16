import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const Scan = () => {
  const [scannedData, setScannedData] = useState(null);

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={({data}) => setScannedData(data)}
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
