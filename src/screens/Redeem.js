import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Button,
  Modal,
  ToastAndroid,
} from 'react-native';
import {deviceHeight, deviceWidth} from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import axiosInstance from '../Auth/AxiosInstance';

const Redeem = () => {
  const isFocused = useIsFocused();
  const [points, setPoints] = useState('');
  const [pointLimit, setPointLimit] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const url = 'app-user/points-available';
    try {
      const result = await axiosInstance.get(url);
      // console.log('Points:', result.data);
      setPoints(result.data.data);
    } catch (error) {
      console.error('Get request failed:', error);
    }
    const urllimit = 'tenant/redemption/get';
    try {
      const result = await axiosInstance.get(urllimit);
      // console.log('Points limit:', result.data);
      setPointLimit(result.data.data);
    } catch (error) {
      console.error('Get request failed:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleInputChange = text => {
    setInputValue(text);
  };

  const handleSubmit = async maxRedeemValue => {
    if (inputValue < maxRedeemValue) {
      const value = inputValue % 10;
      if (value > 0) {
        Alert.alert('Input should be in multiple of 10 only');
      } else {
        const url = 'app-user/redemption/request';
        const payload = {points: inputValue.toString()};
        try {
          const result = await axiosInstance.post(url, payload);
          console.log('redeption request', result.data);
          if (result.data.success === 'success') {
            setModalVisible(false);
            ToastAndroid.show('Redeemption Request Sent', ToastAndroid.SHORT);
          }
        } catch (error) {
          console.error('Get request failed:', error);
          Alert.alert(error.response.data.message || error.message);
        }
      }
    } else {
      Alert.alert("Input value can't be more than balance points");
    }
  };

  const notifyUser = () => {
    if (points > pointLimit) {
      const value = points % 10;
      const maxRedeemValue = points - value;
      setModalVisible(true);
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <Text>Please Add points in multiple of 10 only</Text>
          <View style={styles.modalContent}>
            <Text>Please enter a value:</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={handleInputChange}
              keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit(maxRedeemValue)} />
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>;
    } else {
      Alert.alert('Your points balance is less than the Redeem limit');
      return;
    }
  };

  return (
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1b254c" style={styles.loader} />
      ) : (
        <View>
          <Text style={styles.heading}>Redeem Points</Text>
          {/* <TouchableOpacity>
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
      </TouchableOpacity> */}
          <TouchableOpacity onPress={notifyUser}>
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
      )}
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
  loader: {
    marginTop: deviceHeight / 2 - 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
