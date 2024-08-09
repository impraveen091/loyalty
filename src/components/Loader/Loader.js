import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants/Constants';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="x-large" color={COLORS.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
