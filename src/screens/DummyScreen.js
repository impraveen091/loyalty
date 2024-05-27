import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Imagesvg from '../components/Assets/svg/login.svg';
import {COLORS, deviceWidth} from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';

const DummyScreen = ({tenant}) => {
  const tenantData = {
    tenant1: {
      color: '#3498db',
    },
    tenant2: {
      color: '#e74c3c',
    },
    tenant3: {
      color: '#2ecc71',
    },
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={[COLORS.primary, '#ffffff']}
      style={styles.container}>
      <Imagesvg
        style={{borderRadius: 10}}
        width={deviceWidth - 20}
        height={deviceWidth - 20}
        fill={'red'}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DummyScreen;
