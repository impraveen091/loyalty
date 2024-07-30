import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

import axiosInstance from '../Auth/AxiosInstance';
import {deviceHeight, deviceWidth, noDataImage} from '../constants/Constants';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTransactions = async () => {
    setLoading(true);
    const url = 'app-user/transaction/list';
    try {
      const result = await axiosInstance.get(url);
      console.log('Transactions:', result.data.data);
      if (result.data.success) {
        setTransactions(result.data.data);
      }
    } catch (error) {
      console.error('Get request failed:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1b254c" style={styles.loader} />
      ) : (
        <>
          <Text style={styles.heading}>Transactions</Text>
          {transactions.length > 0 ? (
            transactions.map((item, index) => (
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
                      <Text style={styles.subheading}>Product:</Text> 10 L
                      bucket
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Image
              resizeMode="cover"
              source={{uri: noDataImage}}
              style={styles.image}
            />
          )}
        </>
      )}
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
  loader: {
    marginTop: deviceHeight / 2 - 20,
  },
  image: {
    resizeMode: 'contain',
    height: deviceHeight / 2,
    marginTop: deviceHeight / 5,
    width: deviceWidth - 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
