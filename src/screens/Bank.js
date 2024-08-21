import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deviceWidth} from '../constants/Constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import axiosInstance from '../Auth/AxiosInstance';
import Loader from '../components/Loader/Loader';

const Bank = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [bank, setBank] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBankDetails = async () => {
    setLoading(true);
    const url = 'app-user/bank-details/get';
    try {
      const result = await axiosInstance.get(url);
      console.log('bank details:', result.data);
      if (result.data.success) {
        setBank(result.data.data);
      }
    } catch (error) {
      console.error('Get request failed1:', error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (isFocused) {
      getBankDetails();
    }
  }, [isFocused]);

  console.log('bank', bank);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <>
          <Text style={styles.heading}>Bank Management</Text>
          {bank ? (
            <>
              <View style={styles.imageContainer}>
                <View style={styles.box}>
                  <Text style={styles.bankText}>Account Name:</Text>
                  <Text style={styles.mainText}>{bank.account_name}</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.bankText}>Bank Name:</Text>
                  <Text style={styles.mainText}>{bank.bank_name}</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.bankText}>Account Number:</Text>
                  <Text style={styles.mainText}>{bank.acc_no}</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.bankText}>IFSC Code:</Text>
                  <Text style={styles.mainText}>{bank.ifsc_code}</Text>
                </View>
                <View style={styles.box}>
                  <Text style={styles.bankText}>UPI-Id:</Text>
                  <Text style={styles.mainText}>{bank.upi_id}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.submit}
                onPress={() =>
                  navigation.navigate('AddBankDetails', {data: bank})
                }>
                <Text style={styles.registerText}> Edit</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: 'https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127829.jpg?t=st=1715689358~exp=1715692958~hmac=6aeb7ad150adb056a4fa3ffef69ca163e18e4e6f09c44d844792aeca4a114899&w=740',
                }}
                style={styles.image}
              />
              <TouchableOpacity
                style={styles.addbankbutton}
                onPress={() => navigation.navigate('AddBankDetails')}>
                <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                  + Add Bank
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default Bank;

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
    marginTop: '10%',
    width: deviceWidth - 20,
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    borderRadius: 10,
  },
  addbankbutton: {
    width: 120,
    height: 50,
    backgroundColor: '#00308F',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
  bankText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  mainText: {
    color: 'grey',
    fontSize: 20,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  submit: {
    backgroundColor: '#00308F',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
    width: deviceWidth - 20,
  },
  registerText: {
    color: 'white',
    fontSize: 20,
  },
  loader: {
    marginTop: deviceWidth,
  },
});
