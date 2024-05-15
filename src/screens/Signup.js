import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {deviceWidth} from '../constants/Constants';
import Dropdown from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const Signup = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pincode, setPincode] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [referral, setReferral] = useState('');
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('Plumber');
  const [items, setItems] = useState([
    {label: 'Plumber', value: 'Plumber'},
    {label: 'Painter', value: 'Painter'},
    {label: 'Carpenter', value: 'Carpenter'},
    {label: 'Architect', value: 'Architect'},
    {label: 'Designer', value: 'Designer'},
    {label: 'Electrician', value: 'Electrician'},
  ]);
  const [isCheckedReferral, setIsCheckedReferral] = useState(false);
  const [isCheckedTerm, setIsCheckedTerm] = useState(false);

  const submit = () => {
    let newErrors = {};
    if (phone.length !== 10) {
      newErrors.phone = 'Enter a valid number';
    } else if (firstName.length < 4) {
      newErrors.firstName = 'first name should have atleast 4 characters';
    } else if (lastName.length < 4) {
      newErrors.lastName = 'last name should have atleast 4 characters';
    } else if (pincode.length < 6) {
      newErrors.pincode = 'pincode should have atleast 6 digits';
    } else if (district.length === 0) {
      newErrors.district = "district can't be empty";
    } else if (city.length === 0) {
      newErrors.city = "city can't be empty";
    } else if (state.length === 0) {
      newErrors.state = "state can't be empty";
    } else if (!isCheckedTerm) {
      newErrors.condition = 'accept the T&C';
    }

    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      ToastAndroid.show('Registration Successfull', ToastAndroid.SHORT);
      navigation.navigate('Signin');
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
        style={[styles.image, {width: deviceWidth - 50, height: 40}]}
      />
      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?t=st=1715768500~exp=1715772100~hmac=1abdab2f0cf3b8c75543533d67ed9642d28043d29ce12b01850eebc428fd03fe&w=826',
        }}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Register</Text>
        <Dropdown
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={[
            styles.input,
            {border: 'none', borderColor: 'white', elevation: 5},
          ]}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="grey"
          onChangeText={setPhone}
          value={phone}
          maxLength={10}
        />
        {error.phone && <Text style={styles.error}>{error.phone}</Text>}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="grey"
          onChangeText={setFirstName}
          value={firstName}
        />
        {error.firstName && <Text style={styles.error}>{error.firstName}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="grey"
          onChangeText={setLastName}
          value={lastName}
        />
        {error.lastName && <Text style={styles.error}>{error.lastName}</Text>}
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Pincode"
          placeholderTextColor="grey"
          onChangeText={setPincode}
          value={pincode}
          maxLength={6}
        />
        {error.pincode && <Text style={styles.error}>{error.pincode}</Text>}
        <TextInput
          style={styles.input}
          placeholder="District"
          placeholderTextColor="grey"
          onChangeText={setDistrict}
          value={district}
        />
        {error.district && <Text style={styles.error}>{error.district}</Text>}
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="grey"
          onChangeText={setCity}
          value={city}
        />
        {error.city && <Text style={styles.error}>{error.city}</Text>}
        <TextInput
          style={styles.input}
          placeholder="State"
          placeholderTextColor="grey"
          onChangeText={setState}
          value={state}
        />
        {error.state && <Text style={styles.error}>{error.state}</Text>}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CheckBox
            value={isCheckedReferral}
            onValueChange={() => setIsCheckedReferral(!isCheckedReferral)}
          />
          <Text style={styles.checkboxText}>I have referral code</Text>
        </View>
        {isCheckedReferral && (
          <TextInput
            style={styles.input}
            placeholder="Referral code (if any)"
            placeholderTextColor="grey"
            onChangeText={setReferral}
            value={referral}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CheckBox
            value={isCheckedTerm}
            onValueChange={() => setIsCheckedTerm(!isCheckedTerm)}
          />
          <Text style={styles.checkboxText}>
            I accept
            <Text
              style={{fontWeight: 'bold'}}
              onPress={() => navigation.navigate('Termsofuse')}>
              {' '}
              Terms & Conditions
            </Text>
          </Text>
        </View>
        {error.condition && <Text style={styles.error}>{error.condition}</Text>}
        <TouchableOpacity
          style={[
            styles.submit,
            {width: deviceWidth - 60, height: 50, marginBottom: 20},
          ]}
          onPress={submit}>
          <Text style={styles.register}> SignUp</Text>
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
    width: deviceWidth - 40,
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
    rowGap: 10,
  },
  error: {
    fontSize: 14,
    color: 'red',
  },
  register: {color: 'white', fontSize: 20},
  checkboxText: {color: 'black'},
});
