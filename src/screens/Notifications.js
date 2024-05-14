import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {deviceWidth} from '../constants/Constants';

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1715689358~exp=1715692958~hmac=6aeb7ad150adb056a4fa3ffef69ca163e18e4e6f09c44d844792aeca4a114899&w=740',
          }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: 'white'},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
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
