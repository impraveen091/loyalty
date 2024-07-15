import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {deviceWidth, profileImageLink} from '../constants/Constants';
import {getUserData, saveUserData} from '../Auth/Auth';
import axiosInstance from '../Auth/AxiosInstance';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

const Profile = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [image, setImage] = useState(profileImageLink);

  const [error, setError] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserData('data');
        console.log('DataProfile', data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
        if (data.image) {
          setImage(data.image);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };

  const updateImage = async image => {
    const url = 'app-user/upload-profile-image';
    const payload = new FormData();
    payload.append('profile', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });

    try {
      const response = await axiosInstance.post(url, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update Profile Response', response.data);
      if (response.data.success) {
        saveUserData('data', response.data.data);
        ToastAndroid.show('Image Updated successfully', ToastAndroid.SHORT);
        setImage(response.data.data.image);
        navigation.navigate('DashboardDrawer');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      console.log(
        'API call error:',
        err.response?.data?.message || err.message,
      );
      if (err.response) {
        console.log('Response data:', err.response.data);
        console.log('Response status:', err.response.status);
        console.log('Response headers:', err.response.headers);
      }
      alert('Failed to update profile photo');
    }
  };

  const handleImagePick = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const imageAsset = response.assets[0];
        console.log('image link', imageAsset.uri);
        setImage(imageAsset.uri);
        updateImage(imageAsset);
      }
    });
  };

  const handleSubmit = async () => {
    const {name, email} = formData;
    if (!name) {
      setError({
        name: !name ? 'Name is required' : '',
      });
      return;
    }

    const url = 'app-user/update';
    const payload = {
      name: name,
      email: email === null ? '' : email,
    };
    try {
      const response = await axiosInstance.put(url, payload);
      console.log('Update Profile Response', response.data);
      if (response.data.success) {
        saveUserData('data', response.data.data);
        ToastAndroid.show('Profile Updated successfully', ToastAndroid.SHORT);
        navigation.navigate('DashboardDrawer');
      } else {
        alert('Failed to update profile');
      }
    } catch (err) {
      console.log(
        'API call error:',
        err.response?.data?.message || err.message,
      );
      alert('Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <TouchableOpacity onPress={handleImagePick}>
        <Image
          source={{
            uri: image || profileImageLink,
          }}
          style={styles.image}
          onError={() => setImage(profileImageLink)}
        />
      </TouchableOpacity>
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
