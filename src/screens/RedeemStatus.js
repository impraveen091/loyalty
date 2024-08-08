import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import axiosInstance from '../Auth/AxiosInstance';
import {deviceHeight, deviceWidth, noDataImage} from '../constants/Constants';
import Loader from '../components/Loader/Loader';

const RedeemStatus = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    const url = 'app-user/redemption/list';
    try {
      const result = await axiosInstance.get(url);
      console.log('RedeemStatus:', result.data.data);
      if (result.data.success === 'success') {
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

  const formatDate = dateString => {
    const parts = dateString.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.insideCard}>
        <Text style={styles.data}>
          <Text style={styles.subheading}>Date:</Text>
          <Text style={[styles.subheading, {fontWeight: '300', color: 'grey'}]}>
            {formatDate(item.request_date)}
          </Text>
        </Text>
        <Text style={styles.data}>
          <Text style={styles.subheading}>Points:</Text>
          <Text style={[styles.subheading, {fontWeight: '300', color: 'grey'}]}>
            {item.points}
          </Text>
        </Text>
      </View>
      <View style={styles.insideCard}>
        <Text style={styles.data}>
          <Text style={styles.subheading}>Amount:</Text>
          <Text style={[styles.subheading, {fontWeight: '300', color: 'grey'}]}>
            {item.amount}
          </Text>
        </Text>
        <Text style={styles.data}>
          <Text style={styles.subheading}>Status:</Text>
          <Text style={[styles.subheading, {fontWeight: '300', color: 'grey'}]}>
            {item.status === 2
              ? 'Hold'
              : item.status === 3
              ? 'Approved'
              : item.status === 4
              ? 'Completed'
              : item.status === 5
              ? 'Rejected'
              : 'Pending'}
          </Text>
        </Text>
      </View>
      <View style={styles.insideCard}>
        <Text style={styles.data}>
          <Text style={styles.subheading}>Mode:</Text>
          <Text style={[styles.subheading, {fontWeight: '300', color: 'grey'}]}>
            {item.mode ? item.mode : 'NA'}
          </Text>
        </Text>
        <Text style={styles.data}>
          <Text style={styles.subheading}>Transaction ID:</Text>
          <Text style={[styles.subheading, {fontWeight: '300', color: 'grey'}]}>
            {item.transaction_id ? item.transaction_id : 'NA'}
          </Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <>
          <Text style={styles.heading}>RedeemStatus</Text>
          {transactions.length > 0 ? (
            <FlatList
              data={transactions.reverse()}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Image
              resizeMode="contain"
              source={{uri: noDataImage}}
              style={styles.image}
            />
          )}
        </>
      )}
    </View>
  );
};

export default RedeemStatus;

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
    height: 'auto',
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  subheading: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  data: {color: 'black', fontSize: 16, marginBottom: 10},
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
