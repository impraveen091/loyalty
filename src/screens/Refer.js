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

const Refer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Join me on Loyalty Program</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-vector/refer-friend-concept-illustration_114360-7039.jpg?t=st=1715601794~exp=1715605394~hmac=bad3847dd82dc3c1c6cc22f9a7745f4abed916f0daf8488ac48577419e7d4472&w=826',
          }}
          style={styles.image}
        />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Text style={styles.refer}>Referal Code: </Text>
          <Text style={styles.refer}>2d9066</Text>
        </View>

        <TouchableOpacity
          style={{
            width: 150,
            height: 50,
            backgroundColor: '#00308F',
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 50,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
            Invite friends
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Refer;

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
    width: deviceWidth - 100,
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
  refer: {fontSize: 20, fontWeight: '500'},
});
