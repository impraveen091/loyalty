import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deviceWidth} from '../constants/Constants';
import {getUserData} from '../Auth';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserData('data');
        console.log('DataProfile', data);
        setFormData({
          name: data.data.name,
          email: data.data.email,
          phone: data.data.phone,
        });
      } catch (err) {
        console.log(err);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const handleSubmit = async () => {
    const {name, email, phone} = formData;

    if (!name || !email || !phone) {
      setError({
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : '',
        phone: !phone ? 'Phone is required' : '',
      });
      return;
    }

    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('phone', phone);
      alert('Profile updated successfully');
    } catch (err) {
      console.log(err);
      alert('Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <View>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/workman-with-ax-white-background_1368-5733.jpg?t=st=1715750000~exp=1715753600~hmac=8f953c61efbed903517fa0085ac44577018c6b2ec4e27c46290a8848f2cc0fe7&w=826',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="grey"
          onChangeText={value => handleChange('name', value)}
          value={formData.name}
        />
        {error.name && <Text style={styles.error}>{error.name}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          keyboardType="email-address"
          onChangeText={value => handleChange('email', value)}
          value={formData.email}
        />
        {error.email && <Text style={styles.error}>{error.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="grey"
          keyboardType="numeric"
          onChangeText={value => handleChange('phone', value)}
          value={formData.phone}
          editable={false}
        />
        {error.phone && <Text style={styles.error}>{error.phone}</Text>}
      </View>
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: 'white'},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
    marginBottom: 20,
  },
  image: {
    width: deviceWidth - 20,
    height: deviceWidth - 20,
    borderRadius: (deviceWidth - 20) / 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 5,
    width: deviceWidth - 40,
    color: 'black',
    alignSelf: 'center',
    marginVertical: 10,
  },
  submit: {
    backgroundColor: '#00308F',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: deviceWidth - 40,
    alignSelf: 'center',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
  },
  error: {
    fontSize: 14,
    color: 'red',
    alignSelf: 'center',
  },
});
