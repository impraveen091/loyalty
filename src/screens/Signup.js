import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deviceHeight, deviceWidth} from '../constants/Constants';
import Dropdown from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import axiosInstance from '../AxiosInstance';
import {postData} from '../../services/Api';
import {getUserData, saveUserData} from '../Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
  });
  const [error, setError] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profession, setProfession] = useState('Plumber');
  const [isCheckedReferral, setCheckedReferral] = useState(false);
  const [isCheckedTerm, setCheckedTerm] = useState(false);
  const professionItems = [
    {label: 'Plumber', value: 'Plumber'},
    {label: 'Painter', value: 'Painter'},
    {label: 'Carpenter', value: 'Carpenter'},
    {label: 'Architect', value: 'Architect'},
    {label: 'Designer', value: 'Designer'},
    {label: 'Electrician', value: 'Electrician'},
  ];
  useEffect(() => {
    const getData = async () => {
      const phone = await getUserData('phone');
      if (phone) {
        setFormData({...formData, phone: phone});
      }
    };
    getData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({...formData, [name]: value});
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.phone.length !== 10) {
      newErrors.phone = 'Enter a valid number';
    }
    if (formData.name.length < 4) {
      newErrors.name = 'First name should have at least 4 characters';
    }
    if (!isCheckedTerm) {
      newErrors.condition = 'Accept the T&C';
    }
    return newErrors;
  };

  const submit = async () => {
    const newErrors = validateForm();
    console.log('CLicked', Object.keys(newErrors).length);
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const url = 'auth/app-user/sign-up';
      try {
        const result = await axiosInstance.post(url, formData);
        console.log('Signup Data', result.data);
        if (result.data.success === 'success') {
          ToastAndroid.show(result.data.data.otp, ToastAndroid.SHORT);
          saveUserData('phone', formData.phone);
          setFormData({
            phone: '',
            name: '',
          });
          navigation.navigate('Otp');
        }
      } catch (error) {
        console.log('CLicked error');
        Alert.alert(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Image
        source={{
          uri: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F74b543a971c26d31eb953337ff7d64f2.cdn.bubble.io%2Ff1694581734495x451542289950882940%2Ffinal%2520icon-01.png?w=256&h=37&auto=compress&dpr=1.25&fit=max',
        }}
        style={styles.bannerImage}
      />
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?t=st=1715768500~exp=1715772100~hmac=1abdab2f0cf3b8c75543533d67ed9642d28043d29ce12b01850eebc428fd03fe&w=826',
        }}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Register</Text>
        {/* <Dropdown
          open={isDropdownOpen}
          value={profession}
          items={professionItems}
          setOpen={setDropdownOpen}
          setValue={setProfession}
          style={styles.dropdown}
        /> */}
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="grey"
          onChangeText={value => handleChange('phone', value)}
          value={formData.phone}
          maxLength={10}
        />
        {error.phone && <Text style={styles.error}>{error.phone}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="grey"
          onChangeText={value => handleChange('name', value)}
          value={formData.name}
        />
        {error.name && <Text style={styles.error}>{error.name}</Text>}

        {/* <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="grey"
          onChangeText={value => handleChange('pincode', value)}
          value={formData.pincode}
          maxLength={6}
        />
        {error.pincode && <Text style={styles.error}>{error.pincode}</Text>} */}
        {/* <TextInput
          style={styles.input}
          placeholder="State"
          placeholderTextColor="grey"
          onChangeText={value => handleChange('state', value)}
          value={formData.state}
        />
        {error.state && <Text style={styles.error}>{error.state}</Text>} */}
        {/* <View style={styles.checkboxContainer}>
          <CheckBox
            value={isCheckedReferral}
            onValueChange={setCheckedReferral}
          />
          <Text style={styles.checkboxText}>I have referral code</Text>
        </View>
        {isCheckedReferral && (
          <TextInput
            style={styles.input}
            placeholder="Referral code (if any)"
            placeholderTextColor="grey"
            onChangeText={value => handleChange('referral', value)}
            value={formData.referral}
          />
        )} */}
        <View style={styles.checkboxContainer}>
          <CheckBox value={isCheckedTerm} onValueChange={setCheckedTerm} />
          <Text style={styles.checkboxText}>
            I accept -
            <Text
              style={styles.termsText}
              onPress={() => navigation.navigate('Termsofuse')}>
              Terms & Conditions
            </Text>
          </Text>
        </View>
        {error.condition && <Text style={styles.error}>{error.condition}</Text>}
        <TouchableOpacity style={styles.submit} onPress={() => submit()}>
          <Text style={styles.registerText}> SignUp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  bannerImage: {
    width: deviceWidth - 50,
    height: 40,
  },
  image: {
    width: deviceWidth - 20,
    height: deviceWidth - 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    color: '#00308F',
    padding: 10,
    borderRadius: 10,
    fontWeight: '300',
    alignSelf: 'center',
  },
  inputContainer: {
    width: deviceWidth - 60,
    marginVertical: 10,
    height: deviceWidth - 60,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 5,
    width: deviceWidth - 40,
    color: 'black',
    marginVertical: 5,
  },
  dropdown: {
    border: 'none',
    borderColor: 'white',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: deviceWidth - 40,
  },
  submit: {
    backgroundColor: '#00308F',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
    width: deviceWidth - 40,
  },
  registerText: {
    color: 'white',
    fontSize: 20,
  },
  error: {
    fontSize: 14,
    color: 'red',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxText: {
    color: 'black',
    marginLeft: 10,
  },
  termsText: {
    fontWeight: 'bold',
    color: '#00308F',
  },
});
