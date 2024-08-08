import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from 'react-native';
import axiosInstance from '../Auth/AxiosInstance';
import {deviceHeight, deviceWidth, noDataImage} from '../constants/Constants';
import Loader from '../components/Loader/Loader';

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

  function formatDate(dateString) {
    const parts = dateString.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <>
          <Text style={styles.heading}>Transactions</Text>
          {transactions.length > 0 ? (
            transactions.map((item, index) => (
              <View style={styles.card} key={index.toString()}>
                <View style={styles.insideCard}>
                  <Text style={styles.data}>
                    <Text style={styles.subheading}>Date:</Text>
                    <Text style={[styles.subheading, {fontWeight: '300'}]}>
                      {formatDate(item.scan_date)}
                    </Text>
                  </Text>
                  <Text style={styles.data}>
                    <Text style={styles.subheading}>Points:</Text>
                    <Text style={[styles.subheading, {fontWeight: '300'}]}>
                      {item.points}
                    </Text>
                  </Text>
                </View>
                <View style={styles.insideCard}>
                  <Text style={styles.data}>
                    <Text style={styles.subheading}>Product:</Text>
                    <Text style={[styles.subheading, {fontWeight: '300'}]}>
                      {item.Product.name}
                    </Text>
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Image
              resizeMode="contain"
              source={{uri: noDataImage}}
              style={styles.image}
            />
          )}
        </>
      )}
    </ScrollView>
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
