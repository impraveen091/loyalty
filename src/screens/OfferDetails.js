import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../constants/Constants';

const OfferDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Offer Details</Text>
      <View style={styles.offerDetailsCard}>
        <Text style={styles.head}>Offer Type</Text>
        <Text style={styles.data}>Product Offers</Text>
        <Text style={styles.head}>Offer Name</Text>
        <Text style={styles.data}>1% Painter</Text>
        <Text style={styles.head}>Description</Text>
        <Text style={styles.data}>
          Customer will get 1.00% points on the total sales. Maximum Loyality
          ponits for this rule are 15 points. The rule is applicable for Painter
          Group, Architecture/Builders. The rule is applicableon Premium Pints
          only. Validity for this rule is from June to December 2024
        </Text>
        <Text style={styles.head}>From Date</Text>
        <Text style={styles.data}>15, Jun 2024</Text>
        <Text style={styles.head}>To Date </Text>
        <Text style={styles.data}>15, Dec 2024</Text>
        <Text style={styles.head}>Offer Points</Text>
        <Text style={styles.data}>1.00 (% Percent)</Text>
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
