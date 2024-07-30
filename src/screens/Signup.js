import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {deviceWidth} from '../constants/Constants';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import axiosInstance from '../Auth/AxiosInstance';
import {getUserData, saveUserData} from '../Auth/Auth';

const Signup = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
  });
  const [error, setError] = useState({});
  const [isProfessionDropdownOpen, setProfessionDropdownOpen] = useState(false);
  const [profession, setProfession] = useState(null);
  const [isStateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [state, setState] = useState(null);
  const [stateItems, setStateItems] = useState([]);
  const [isCheckedTerm, setCheckedTerm] = useState(false);
  const [professionItems, setProfessionItems] = useState([]);

  const formattedProfessionItems = professionItems.map(prof => ({
    label: prof.name,
    value: prof.id,
  }));
  const formattedStateItems = stateItems.map(st => ({
    label: st.name,
    value: st.name,
  }));

  useEffect(() => {
    const getProfession = async () => {
      const url = 'app-user/profession/list';
      try {
        const result = await axiosInstance.get(url);
        setProfessionItems(result.data.data);
      } catch (error) {
        Alert.alert(error.response?.data?.message || 'An error occurred');
      }
    };

    const getStates = async () => {
      const url = 'https://countriesnow.space/api/v0.1/countries/states';
      const payload = {country: 'India'};
      try {
        const response = await axiosInstance.post(url, payload);
        setStateItems(response.data.data.states);
      } catch (error) {
        console.log('Error fetching states', error);
      }
    };

    const getData = async () => {
      const phone = await getUserData('phone');
      console.log(phone);

      if (phone) {
        setFormData({...formData, phone});
      }
    };

    getProfession();
    getStates();
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
    if (!profession) {
      newErrors.profession = 'Select a profession';
    }
    if (!state) {
      newErrors.state = 'Please select your state';
    }
    if (!isCheckedTerm) {
      newErrors.condition = 'Accept the T&C';
    }
    return newErrors;
  };

  const submit = async () => {
    const newErrors = validateForm();
    setError(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const url = 'auth/app-user/sign-up';
      const payload = {...formData, profession_id: profession, state};
      try {
        const result = await axiosInstance.post(url, payload);
        console.log('signup Data', result.data);
        if (result.data.success === 'success') {
          ToastAndroid.show(result.data.data.otp, ToastAndroid.SHORT);
          saveUserData('data', result.data.data);
          setFormData({phone: '', name: ''});
          setProfession(null);
          setState(null);
          navigation.navigate('Otp');
        }
      } catch (error) {
        Alert.alert(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const renderItem = ({item}) => item;

  const formContent = [
    <Image
      key="banner"
      source={{
        uri: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F74b543a971c26d31eb953337ff7d64f2.cdn.bubble.io%2Ff1694581734495x451542289950882940%2Ffinal%2520icon-01.png?w=256&h=37&auto=compress&dpr=1.25&fit=max',
      }}
      style={styles.bannerImage}
    />,
    <Image
      key="mainImage"
      source={{
        uri: 'https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7865.jpg?t=st=1715768500~exp=1715772100~hmac=1abdab2f0cf3b8c75543533d67ed9642d28043d29ce12b01850eebc428fd03fe&w=826',
      }}
      style={styles.image}
    />,
    <View key="form" style={styles.inputContainer}>
      <Text style={styles.heading}>Register</Text>
      <DropDownPicker
        open={isProfessionDropdownOpen}
        value={profession}
        items={formattedProfessionItems}
        setOpen={setProfessionDropdownOpen}
        setValue={setProfession}
        style={styles.dropdown}
        placeholder="Select Your Profession"
        dropDownContainerStyle={{
          maxHeight: 200,
          zIndex: 9999,
        }}
      />
      {error.profession && <Text style={styles.error}>{error.profession}</Text>}

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

      <DropDownPicker
        open={isStateDropdownOpen}
        value={state}
        items={formattedStateItems}
        setOpen={setStateDropdownOpen}
        setValue={setState}
        style={styles.dropdown}
        placeholder="Select Your State"
        dropDownContainerStyle={{
          minHeight: 400,
          width: deviceWidth - 60,
          zIndex: 9999,
        }}
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
        listMode="SCROLLVIEW"
        containerStyle={{
          height: 150,
          marginBottom: 20,
        }}
      />
      {error.state && <Text style={styles.error}>{error.state}</Text>}

      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isCheckedTerm}
          onValueChange={setCheckedTerm}
          style={{backgroundColor: 'lightgrey'}}
        />
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

      <TouchableOpacity style={styles.submit} onPress={submit}>
        <Text style={styles.registerText}> SignUp</Text>
      </TouchableOpacity>
    </View>,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <FlatList
        data={formContent}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollViewContainer}
      />
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    alignItems: 'center',
    padding: 20,
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
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 5,
    width: deviceWidth - 60,
    color: 'black',
    marginVertical: 5,
  },
  dropdown: {
    border: 'none',
    borderColor: 'white',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: deviceWidth - 60,
  },
  submit: {
    backgroundColor: '#00308F',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
    width: deviceWidth - 60,
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
    marginTop: -100,
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
