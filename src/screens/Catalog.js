import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {deviceWidth} from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';

const Catalog = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Catalog</Text>

      <TouchableOpacity>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#EE4B2B', '#DE3163']}
          style={styles.linearGradient}>
          <Text style={styles.subheading}>Catalog 2024(updated)</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#FFAC1C', '#CC5500']}
          style={styles.linearGradient}>
          <Text style={styles.subheading}>Catalog 2023</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Catalog;
const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
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
    marginBottom: 30,
  },
  linearGradient: {
    padding: 10,
    width: deviceWidth - 40,
    height: 80,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-around',
  },
  subheading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
});
