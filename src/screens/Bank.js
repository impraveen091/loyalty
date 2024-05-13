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

const Bank = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bank Management</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require('../components/Assets/Images/noData.jpg')}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        style={{
          width: 120,
          height: 50,
          backgroundColor: '#00308F',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          position: 'absolute',
          right: 10,
          bottom: 20,
        }}>
        <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
          + Add Bank
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Bank;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: 'white'},
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
