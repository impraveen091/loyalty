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

const Signin = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const submit = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid phone number');
    } else {
      setPhone('');
      navigation.navigate('Otp');
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
          uri: 'https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?t=st=1715683995~exp=1715687595~hmac=ab594e8d0da6ae56166a9698d3a15c9b8a42609c98e411b0d2815d334bd16408&w=740',
        }}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter your Phone number"
          placeholderTextColor="grey"
          onChangeText={setPhone}
          value={phone}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          style={[styles.submit, {width: deviceWidth - 60, height: 50}]}
          onPress={submit}>
          <Text style={styles.register}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.submit,
            {width: deviceWidth - 60, height: 50, backgroundColor: '#ff735c'},
          ]}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.register}>Register / SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signin;

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
    textAlign: 'center',
    color: '#00308F',
    padding: 10,
    borderRadius: 10,
    fontWeight: '300',
    width: 'fit-content',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 5,
    width: deviceWidth - 60,
    color: 'black',
  },
  image: {
    width: deviceWidth - 20,
    height: deviceWidth - 20,
    borderRadius: 10,
  },
  submit: {
    width: 'fit-content',
    backgroundColor: '#00308F',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  inputContainer: {
    width: deviceWidth - 60,
    justifyContent: 'space-between',
    rowGap: 10,
  },
  error: {
    fontSize: 14,
    color: 'red',
  },
  register: {color: 'white', fontSize: 20},
});
