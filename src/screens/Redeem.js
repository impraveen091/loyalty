import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {deviceWidth} from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';

const Redeem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Redeem Points</Text>

      <TouchableOpacity>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#EE4B2B', '#DE3163']}
          style={styles.linearGradient}>
          <Text style={styles.subheading}> Point Transfer</Text>
          <Text style={styles.data}>
            You can transfer loyality points to your friend or family member.
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#FFAC1C', '#CC5500']}
          style={styles.linearGradient}>
          <Text style={styles.subheading}> On-request Cashback</Text>
          <Text style={styles.data}>
            Loyalty points can be redeemed to your bank account by sending a
            request to the admin.
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Redeem;
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
  },
  linearGradient: {
    padding: 10,
    width: deviceWidth - 20,
    height: 130,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-around',
  },
  subheading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  },
  data: {color: 'white', marginLeft: 5},
});
