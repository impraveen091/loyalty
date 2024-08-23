import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../constants/Constants';
import {useRoute} from '@react-navigation/native';

const OfferDetails = () => {
  const route = useRoute();
  const data = route.params.data;
  console.log('dataOffer', data);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Offer Details</Text>
      <View style={styles.offerDetailsCard}>
        <Text style={styles.head}>Offer Type</Text>
        <Text style={styles.data}>
          {data.value_type === 2 ? 'Offer by Product %' : 'Offer by Value '}
        </Text>
        <Text style={styles.head}>Offer Name</Text>
        <Text style={styles.data}>{data.name}</Text>
        <Text style={styles.head}>Description</Text>
        <Text style={styles.data}>{data.Product.description}</Text>
        {/* <Text style={styles.head}>From Date</Text>
        <Text style={styles.data}>15, Jun 2024</Text>
        <Text style={styles.head}>To Date </Text>
        <Text style={styles.data}>15, Dec 2024</Text> */}
        <Text style={styles.head}>Offer Points</Text>
        <Text style={styles.data}>{data.total_amount}</Text>
      </View>
    </View>
  );
};

export default OfferDetails;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
  },
  offerDetailsCard: {
    marginTop: 20,
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    borderRadius: 10,
    width: deviceWidth - 20,
    height: 'auto',
    rowGap: 5,
  },
  head: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  data: {
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
    marginBottom: 10,
  },
});
