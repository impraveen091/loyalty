import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {deviceWidth} from '../constants/Constants';

const PurchaseReceipt = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>PurchaseReceipt</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../components/Assets/Images/noData.jpg')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default PurchaseReceipt;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 20,
    textAlign: 'center',
    color: '#00308F',
    backgroundColor: '#E3963E',
    padding: 10,
    borderRadius: 10,
    fontWeight: '600',
    width: deviceWidth / 2,
    alignSelf: 'center',
  },
  image: {
    width: deviceWidth - 20,
    height: deviceWidth - 20,
    borderRadius: 10,
  },
  imageContainer: {
    marginTop: '30%',
  },
});
