import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {deviceWidth} from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';

const Transactions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transactions</Text>

      <TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.insideCard}>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Date:</Text> 28, may 2024
            </Text>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Points:</Text> 20
            </Text>
          </View>
          <View style={styles.insideCard}>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Code:</Text> 2xwxmwhxuwg
            </Text>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Product:</Text> 10 L bucket
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.insideCard}>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Date:</Text> 29, may 2024
            </Text>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Points:</Text> 20
            </Text>
          </View>
          <View style={styles.insideCard}>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Code:</Text> 2xwxmwhxuwg
            </Text>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Product:</Text> 10 L bucket
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.card}>
          <View style={styles.insideCard}>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Date:</Text> 27, may 2024
            </Text>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Points:</Text> 20
            </Text>
          </View>
          <View style={styles.insideCard}>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Code:</Text> 2xwxmwhxuwg
            </Text>
            <Text style={styles.data}>
              <Text style={styles.subheading}>Product:</Text> 10 L bucket
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Transactions;
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
  },
  card: {
    marginTop: 10,
    backgroundColor: 'white',
    height: 100,
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subheading: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  data: {color: 'black', fontSize: 16, marginBottom: 10},
  insideCard: {},
});
