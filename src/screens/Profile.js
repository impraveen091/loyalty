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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Up from '../components/Assets/svg/up-arrow.svg';
import Down from '../components/Assets/svg/down-arrow.svg';
import DocumentPicker from 'react-native-document-picker';

const Profile = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
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
  const [kycid, setKycId] = useState('');
  const [isPersonalDetailsOpen, setPersonalDetailsOpen] = useState(true);
  const [isKYCDetailsOpen, setKYCDetailsOpen] = useState(false);

  useEffect(() => {
    if (isFocused) {
      loadProfile();
      getKYCdetails();
    }
  }, [isFocused]);

  const loadProfile = async () => {
    try {
      const data = await getUserData('data');
      const kyc = await getUserData('kyc');
      console.log('DataProfile', data, kyc);
      setFormData(prevFormData => ({
        ...prevFormData,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        adhar: kyc?.adhar,
        adhar_img: kyc?.adhar_img,
        pan: kyc?.pan,
        pan_img: kyc?.pan_img,
        selfie_img: kyc?.selfie_img,
        id: kyc?.id,
      }));

      if (data.image) {
        setImage(data.image);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
            id: response.data.data.id,
          }));
        } else {
          console.log('Failed to retrieve KYC details or data is missing');
        }
      } else {
        if (response.data.success === 'success' && response.data.data) {
          const {adhar, adhar_img, pan_img, pan, selfie_img} =
            response.data.data;
          setKyc(true);
          setFormData(prevFormData => ({
            ...prevFormData,
            adhar: adhar || prevFormData.adhar,
            adhar_img: adhar_img || prevFormData.adhar_img,
            pan: pan || prevFormData.pan,
            pan_img: pan_img || prevFormData.pan_img,
            selfie_img: selfie_img || prevFormData.selfie_img,
            id: response.data.data.id,
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
    console.log('update fields', field, value);
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value,
    }));
    if (typeof value === 'string' && value.trim() !== '') {
      setError(prevError => ({
        ...prevError,
        [field]: null,
      }));
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
      }
    } catch (err) {
      console.log(
        'API call error:',
        err.response?.data?.message || err.message,
      );
      if (
        err.response?.data?.message ||
        err.message === 'Request failed with status code 413'
      ) {
        Alert.alert('file is too large');
      }
      Alert.alert('Profile photo not updated');
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
        navigation.navigate('DashboardDrawer');
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
    const {adhar, pan, adhar_img, pan_img, selfie_img} = formData;

    if (!adhar || !pan) {
      setError({
        adhar: !adhar ? 'Aadhar number is required' : '',
        pan: !pan ? 'PAN number is required' : '',
      });
      return;
    }

    const url = 'app-user/update/kyc-details';
    const payload = new FormData();

    payload.append('adhar', adhar);
    payload.append('pan', pan);

    if (adhar_img) {
      payload.append('adhar_img', {
        uri: adhar_img.uri,
        type: adhar_img.type,
        name: adhar_img.name,
      });
    }
    if (pan_img) {
      payload.append('pan_img', {
        uri: pan_img.uri,
        type: pan_img.type,
        name: pan_img.name,
      });
    }
    if (selfie_img) {
      payload.append('selfie_img', {
        uri: selfie_img.uri,
        type: selfie_img.type,
        name: selfie_img.name || 'selfie_img.jpg',
      });
    }

    try {
      const response = await axiosInstance.post(url, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Update KYC Details Response', response.data);
      if (response.data.success) {
        saveUserData('kyc', response.data.data);
        ToastAndroid.show(
          'KYC details updated successfully',
          ToastAndroid.SHORT,
        );
        navigation.navigate('DashboardDrawer');
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
    <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImagePick}>
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text style={styles.text}>Edit Profile Photo</Text>
      </View>
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={() => setPersonalDetailsOpen(!isPersonalDetailsOpen)}>
          <Text style={styles.title}>Personal Details</Text>
          {isPersonalDetailsOpen ? <Up /> : <Down />}
        </TouchableOpacity>
        {isPersonalDetailsOpen && (
          <View style={styles.container}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            {error.name && <Text style={styles.error}>{error.name}</Text>}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
            />
            {error.email && <Text style={styles.error}>{error.email}</Text>}

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              editable={false}
            />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={updatePersonalDetails}>
          <Text style={styles.buttonText}>Update Personal Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.toggleContainer}
          onPress={() => setKYCDetailsOpen(!isKYCDetailsOpen)}>
          <Text style={styles.title}>KYC Details</Text>
          {isKYCDetailsOpen ? <Up /> : <Down />}
        </TouchableOpacity>
        {isKYCDetailsOpen && (
          <View style={styles.container}>
            <Text style={styles.label}>Adhar</Text>
            <TextInput
              style={styles.input}
              value={formData.adhar}
              onChangeText={text => handleInputChange('adhar', text)}
            />
            {error.adhar && <Text style={styles.error}>{error.adhar}</Text>}

            <Text style={styles.label}>Adhar Image</Text>
            <TouchableOpacity
              style={styles.fileButton}
              onPress={() => pickFile('adhar_img')}>
              <Text style={styles.buttonText}>Upload Adhar Image</Text>
            </TouchableOpacity>
            {formData.adhar_img && (
              <Image
                source={{uri: formData.adhar_img.uri || formData.adhar_img}}
                style={styles.uploadedImage}
                resizeMode="cover"
              />
            )}

            <Text style={styles.label}>PAN</Text>
            <TextInput
              style={styles.input}
              value={formData.pan}
              onChangeText={text => handleInputChange('pan', text)}
            />
            {error.pan && <Text style={styles.error}>{error.pan}</Text>}

            <Text style={styles.label}>PAN Image</Text>
            <TouchableOpacity
              style={styles.fileButton}
              onPress={() => pickFile('pan_img')}>
              <Text style={styles.buttonText}>Upload PAN Image</Text>
            </TouchableOpacity>
            {formData.pan_img && (
              <Image
                source={{uri: formData.pan_img.uri || formData.pan_img}}
                style={styles.uploadedImage}
                resizeMode="cover"
              />
            )}

            <Text style={styles.label}>Selfie Image</Text>
            <TouchableOpacity style={styles.fileButton} onPress={captureSelfie}>
              <Text style={styles.buttonText}>Capture Selfie</Text>
            </TouchableOpacity>
            {formData.selfie_img && (
              <Image
                source={{uri: formData.selfie_img.uri || formData.selfie_img}}
                style={styles.uploadedImage}
                resizeMode="cover"
              />
            )}
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={updateKYCDetails}>
          <Text style={styles.buttonText}>Update KYC Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  form: {
    padding: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Profile;
