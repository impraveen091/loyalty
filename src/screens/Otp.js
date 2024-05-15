import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {deviceWidth} from '../constants/Constants';
import RightArrow from '../components/Assets/svg/right-arrow.svg';
import {useNavigation} from '@react-navigation/native';

const Otp = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
    } else {
      setOtp('');
      navigation.replace('DashboardDrawer');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F74b543a971c26d31eb953337ff7d64f2.cdn.bubble.io%2Ff1694581734495x451542289950882940%2Ffinal%2520icon-01.png?w=256&h=37&auto=compress&dpr=1.25&fit=max',
        }}
        style={[styles.image, {width: deviceWidth - 50, height: 40}]}
      />
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg?t=st=1715684176~exp=1715687776~hmac=2af716be16922611ea63755e198b9b131a32cf21853c5935f4532f6699c188e5&w=740',
        }}
        style={styles.image}
      />
      <Text style={styles.heading}>OTP verification</Text>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="numeric"
          value={otp}
          style={styles.input}
          placeholder="Enter your OTP"
          placeholderTextColor="black"
          onChangeText={setOtp}
        />

        <TouchableOpacity style={styles.submit} onPress={submit}>
          <RightArrow width={30} height={30} />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 30,
    color: '#00308F',
    fontWeight: '300',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 5,
    width: deviceWidth / 1.5,
  },
  image: {
    width: deviceWidth - 20,
    height: deviceWidth - 20,
    borderRadius: 10,
    // marginTop: 50,
  },
  submit: {
    width: 'fit-content',
    backgroundColor: '#00308F',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  inputContainer: {flexDirection: 'row', columnGap: 20},
  error: {
    fontSize: 20,
    color: 'red',
  },
});
