import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {deviceWidth, profileImageLink} from '../constants/Constants';
import {getUserData, saveUserData} from '../Auth/Auth';
import axiosInstance from '../Auth/AxiosInstance';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Up from '../components/Assets/svg/up-arrow.svg';
import Down from '../components/Assets/svg/down-arrow.svg';
import DocumentPicker from 'react-native-document-picker';
// import {launchCamera} from 'react-native-image-picker';

const Profile = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adhar: '',
    pan: '',
    adhar_img: null,
    pan_img: null,
    selfie_img: null,
  });
  const [kyc, setKyc] = useState(null);
  const [image, setImage] = useState(profileImageLink);
  const [error, setError] = useState({});
  const [isPersonalDetailsOpen, setPersonalDetailsOpen] = useState(true);
  const [isKYCDetailsOpen, setKYCDetailsOpen] = useState(false);
  console.log('formdata', formData);

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
    getKYCdetails();
  }, []);

  const getKYCdetails = async () => {
    const url = 'app-user/get/kyc-details';
    try {
      const response = await axiosInstance.get(url);
      console.log('get KYC Response', response.data);
      if (response.data.data.status === 2) {
        setKyc(false);
        if (response.data.success === 'success' && response.data.data) {
          const {adhar, adhar_img, pan_img, pan, selfie_img} =
            response.data.data;
          setFormData(prevFormData => ({
            ...prevFormData,
            adhar: adhar || prevFormData.adhar,
            adhar_img: adhar_img || prevFormData.adhar_img,
            pan: pan || prevFormData.pan,
            pan_img: pan_img || prevFormData.pan_img,
            selfie_img: selfie_img || prevFormData.selfie_img,
          }));
        } else {
          console.log('Failed to retrieve KYC details or data is missing');
        }
      } else {
        if (response.data.success === 'success' && response.data.data) {
          const {adhar, adhar_img, pan_img, pan, selfie_img} =
            response.data.data;
          setFormData(prevFormData => ({
            ...prevFormData,
            adhar: adhar || prevFormData.adhar,
            adhar_img: adhar_img || prevFormData.adhar_img,
            pan: pan || prevFormData.pan,
            pan_img: pan_img || prevFormData.pan_img,
            selfie_img: selfie_img || prevFormData.selfie_img,
          }));
          console.log('Updated formData', formData); // Log updated formData
        } else {
          console.log('Failed to retrieve KYC details or data is missing');
        }
      }
    } catch (err) {
      console.log(
        'API call error:',
        err.response?.data?.message || err.message,
      );
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
    if (typeof value === 'string' && value.trim() !== '') {
      setError({...error, [field]: null});
    }
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
        ToastAndroid.show('Image Updated successfully', ToastAndroid.SHORT);
        setImage(response.data.data.image);
        navigation.navigate('DashboardDrawer');
      } else {
        Alert.alert('Failed to update profile');
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
      Alert.alert('Failed to update profile photo');
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const captureSelfie = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        return;
      }
    }
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const imageAsset = response.assets[0];
        handleInputChange('selfie_img', {
          uri: imageAsset.uri,
          type: imageAsset.type,
          fileName: imageAsset.fileName,
        });
      }
    });
  };

  const pickFile = async field => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(fileType)) {
        handleInputChange(field, file);
      } else {
        Alert.alert(
          'Invalid File Type',
          'Only jpg, jpeg, and png formats are allowed.',
        );
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert('File Upload Error', `${err}`);
      }
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

  const updatePersonalDetails = async () => {
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
      console.log('Update Personal Details Response', response.data);
      if (response.data.success) {
        saveUserData('data', response.data.data);
        ToastAndroid.show(
          'Personal Details Updated successfully',
          ToastAndroid.SHORT,
        );
      } else {
        Alert.alert('Failed to update personal details');
      }
    } catch (err) {
      console.log(
        'API call error:',
        err.response?.data?.message || err.message,
      );
      Alert.alert('Failed to update personal details');
    }
  };

  const updateKYCDetails = async () => {
    const {adhar, pan, pan_img, adhar_img, selfie_img} = formData;

    if (!adhar || !pan || !pan_img || !adhar_img || !selfie_img) {
      setError({
        adhar: !adhar ? 'Aadhar number is required' : '',
        pan: !pan ? 'PAN number is required' : '',
        pan_img: !pan_img ? 'PAN Image is required' : '',
        adhar_img: !adhar_img ? 'Adhar Image is required' : '',
        selfie_img: !selfie_img ? 'selfie_img is required' : '',
      });
      return;
    }

    const url = 'app-user/update/kyc-details';
    const payload = new FormData();

    payload.append('adhar', adhar);
    payload.append('pan', pan);
    payload.append('pan_img', {
      uri: pan_img.uri,
      type: pan_img.type,
      name: pan_img.name,
    });
    payload.append('adhar_img', {
      uri: adhar_img.uri,
      type: adhar_img.type,
      name: adhar_img.name,
    });
    payload.append('selfie_img', {
      uri: selfie_img.uri,
      type: selfie_img.type,
      name: selfie_img.fileName,
    });
    console.log('payload', payload);
    try {
      const response = await axiosInstance.post(url, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Update KYC Details Response', response.data);
      if (response.data.success) {
        saveUserData('KYCdata', response.data.data);
        ToastAndroid.show(
          'KYC Details Updated successfully',
          ToastAndroid.SHORT,
        );
      } else {
        Alert.alert('Failed to update KYC details');
      }
    } catch (err) {
      console.log(
        'API call error:',
        err.response?.data?.message || err.message,
      );
      Alert.alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <TouchableOpacity onPress={() => handleImagePick()}>
        <Image
          source={{
            uri: image || profileImageLink,
          }}
          style={styles.image}
          onError={() => setImage(profileImageLink)}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.collapsibleHeader}
        onPress={() => setPersonalDetailsOpen(!isPersonalDetailsOpen)}>
        <Text style={styles.collapsibleHeaderText}>Personal Details</Text>
        {isPersonalDetailsOpen ? <Up /> : <Down />}
      </TouchableOpacity>
      {isPersonalDetailsOpen && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="grey"
            onChangeText={value => handleInputChange('name', value)}
            value={formData.name}
          />
          {error.name && <Text style={styles.error}>{error.name}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            onChangeText={value => handleInputChange('email', value)}
            value={formData.email}
          />
          {error.email && <Text style={styles.error}>{error.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="grey"
            keyboardType="numeric"
            onChangeText={value => handleInputChange('phone', value)}
            value={formData.phone}
            editable={false}
          />
          {error.phone && <Text style={styles.error}>{error.phone}</Text>}

          <TouchableOpacity
            style={styles.submit}
            onPress={updatePersonalDetails}>
            <Text style={styles.submitText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.collapsibleHeader}
        onPress={() => setKYCDetailsOpen(!isKYCDetailsOpen)}>
        <Text style={styles.collapsibleHeaderText}>KYC Details</Text>
        {isKYCDetailsOpen ? <Up /> : <Down />}
      </TouchableOpacity>
      {isKYCDetailsOpen && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Aadhar Number"
            placeholderTextColor="grey"
            onChangeText={value => handleInputChange('adhar', value)}
            value={formData.adhar}
            editable={!kyc}
          />
          {error.adhar && <Text style={styles.error}>{error.adhar}</Text>}
          <TextInput
            style={styles.input}
            placeholder="PAN Number"
            placeholderTextColor="grey"
            onChangeText={value => handleInputChange('pan', value)}
            value={formData.pan}
            editable={!kyc}
          />
          {error.pan && <Text style={styles.error}>{error.pan}</Text>}

          <View style={styles.fileSection}>
            <Text style={{fontSize: 18, color: 'grey'}}>
              {formData.adhar_img
                ? formData.adhar_img.name
                  ? formData.adhar_img.name?.slice(0, 25)
                  : formData.adhar_img.slice(0, 15)
                : 'AdharCard image'}
            </Text>
            <TouchableOpacity
              disabled={kyc}
              onPress={() => pickFile('adhar_img')}
              style={styles.uploadButton}>
              <Text style={styles.upload}>Upload</Text>
            </TouchableOpacity>
          </View>

          {error.adhar_img && (
            <Text style={styles.error}>{error.adhar_img}</Text>
          )}
          <View style={styles.fileSection}>
            <Text style={{fontSize: 18, color: 'grey'}}>
              {formData.pan_img
                ? formData.pan_img.name
                  ? formData.pan_img.name.slice(0, 25)
                  : formData.pan_img.slice(0, 15)
                : 'PAN image'}
            </Text>
            <TouchableOpacity
              disabled={kyc}
              onPress={() => pickFile('pan_img')}
              style={styles.uploadButton}>
              <Text style={styles.upload}>Upload</Text>
            </TouchableOpacity>
          </View>
          {error.pan_img && <Text style={styles.error}>{error.pan_img}</Text>}

          <View style={styles.fileSection}>
            <Text style={{fontSize: 18, color: 'grey'}}>
              {formData.selfie_img
                ? formData.selfie_img.fileName
                  ? formData.selfie_img.fileName.split('.j')[0].slice(0, 15)
                  : formData.selfie_img.split('.j')[0].slice(0, 15)
                : 'selfie_img'}
            </Text>
            <TouchableOpacity
              disabled={kyc}
              onPress={captureSelfie}
              style={styles.uploadButton}>
              <Text style={styles.upload}>Capture</Text>
            </TouchableOpacity>
          </View>

          {error.selfie_img && (
            <Text style={styles.error}>{error.selfie_img}</Text>
          )}

          <TouchableOpacity style={styles.submit} onPress={updateKYCDetails}>
            <Text style={styles.submitText}>Update KYC</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
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
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 5,
    width: deviceWidth - 20,
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
    marginBottom: 15,
    marginTop: 10,
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
  collapsibleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  collapsibleHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00308F',
  },
  inputContainer: {marginTop: 10},
  fileSection: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 50,
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  uploadButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00308F',
    padding: 10,
    borderRadius: 10,
    height: 50,
    width: 100,
  },
  upload: {fontSize: 18, fontWeight: 'bold', color: 'white'},
});
