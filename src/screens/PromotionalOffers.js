import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {deviceWidth} from '../constants/Constants';
import Tag from '../components/Assets/svg/tag.svg';
import RightArrow from '../components/Assets/svg/right-arrow.svg';
import {useNavigation} from '@react-navigation/native';

const PromotionalOffers = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Offers & Promotions</Text>
      <Text style={styles.subheading}>Product Offers</Text>
      <TouchableOpacity onPress={() => navigation.navigate('OfferDetails')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#FFAC1C', '#CC5500']}
          style={styles.linearGradient}>
          <View style={styles.data}>
            <Tag width={20} height={20} />
            <Text style={styles.offername}>1% Painter</Text>
          </View>
          <View style={styles.viewContainer}>
            <Text style={styles.viewMore}>View More</Text>
            <RightArrow width={18} height={18} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default PromotionalOffers;
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
  },
  linearGradient: {
    padding: 15,
    width: deviceWidth - 20,
    height: 130,
    borderRadius: 10,
    marginTop: 15,
  },
  subheading: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  data: {flexDirection: 'row', columnGap: 10},
  offername: {fontSize: 15, color: 'white', fontWeight: 'bold'},
  viewContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMore: {color: 'white'},
});
