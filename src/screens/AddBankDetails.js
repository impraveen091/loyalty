import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';

import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../Auth/AxiosInstance';
import {deviceWidth} from '../constants/Constants';

const AddBankDetails = ({route}) => {
  const navigation = useNavigation();
  const editData = route.params.data;
  const [formData, setFormData] = useState({
    acc_no: '',
    bank_name: '',
    ifsc_code: '',
    passbook_img: null,
    account_name: '',
    upi_id: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        acc_no: editData.acc_no,
        bank_name: editData.bank_name?.toUpperCase(),
        ifsc_code: editData.ifsc_code?.toUpperCase(),
        passbook_img: editData.passbook_img,
        account_name: editData.account_name?.toUpperCase(),
        upi_id: editData.upi_id?.toUpperCase(),
      });
    }
  }, []);

  console.log('formData', formData);

  const handleInputChange = (field, value) => {
    let sanitizedValue = value;

    // Check if the value is a string before converting to uppercase
    if (typeof sanitizedValue === 'string') {
      sanitizedValue = sanitizedValue.toUpperCase();

      if (field === 'ifsc_code') {
        // Only allow alphanumeric characters
        sanitizedValue = sanitizedValue.replace(/[^a-zA-Z0-9]/g, '');
      }
    }

    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: sanitizedValue,
    }));

    // Check for errors and clear them if input is valid
    if (typeof sanitizedValue === 'string' && sanitizedValue.trim() !== '') {
      setErrors(prevError => ({
        ...prevError,
        [field]: null,
      }));
    }
  };

  const pickFile = async field => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(fileType)) {
        const fileData = {
          uri: file.uri,
          type: file.type,
          name: file.name,
        };
        handleInputChange(field, fileData);
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

  const handleSubmit = async () => {
    const {acc_no, account_name, bank_name, ifsc_code, passbook_img, upi_id} =
      formData;
    if (
      !acc_no ||
      !account_name ||
      !bank_name ||
      !ifsc_code ||
      !passbook_img ||
      !upi_id
    ) {
      setErrors({
        acc_no: !acc_no ? 'Account Number is required' : '',
        account_name: !account_name ? 'Account Name is required' : '',
        bank_name: !bank_name ? 'Bank Name is required' : '',
        ifsc_code: !ifsc_code ? 'IFSC Code is required' : '',
        passbook_img: !passbook_img ? 'Passbook Image is required' : '',
        upi_id: !upi_id ? 'UPI ID is required' : '',
      });
      return;
    }

    const payload = new FormData();

    payload.append('acc_no', acc_no);
    payload.append('account_name', account_name);
    payload.append('bank_name', bank_name);
    payload.append('ifsc_code', ifsc_code);
    payload.append('upi_id', upi_id);

    if (passbook_img && typeof passbook_img.uri === 'string') {
      payload.append('passbook_img', {
        uri: passbook_img.uri,
        type: passbook_img.type,
        name: passbook_img.name,
      });
    }

    console.log('payload', payload);
    try {
      const response = await axiosInstance.post(
        'app-user/bank-details/update',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('update bank Details', response.data);
      if (response.data.success === 'success') {
        ToastAndroid.show('Details Added', ToastAndroid.SHORT);
        navigation.navigate('Dashboard');
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
      <Text style={styles.heading}>Add Bank Details</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Bank Name"
          placeholderTextColor={'grey'}
          value={formData.bank_name}
          style={styles.input}
          onChangeText={value => handleInputChange('bank_name', value)}
        />
        {errors.bank_name && (
          <Text style={styles.errorText}>{errors.bank_name}</Text>
        )}

        <TextInput
          placeholder="Account Number"
          placeholderTextColor={'grey'}
          keyboardType="numeric"
          value={formData.acc_no}
          style={styles.input}
          onChangeText={value => handleInputChange('acc_no', value)}
        />
        {errors.acc_no && <Text style={styles.errorText}>{errors.acc_no}</Text>}

        <TextInput
          placeholder="Account holder's name"
          placeholderTextColor={'grey'}
          value={formData.account_name}
          style={styles.input}
          onChangeText={value => handleInputChange('account_name', value)}
        />
        {errors.account_name && (
          <Text style={styles.errorText}>{errors.account_name}</Text>
        )}

        <TextInput
          placeholder="Enter IFSC code"
          placeholderTextColor={'grey'}
          value={formData.ifsc_code}
          style={styles.input}
          onChangeText={value => handleInputChange('ifsc_code', value)}
        />
        {errors.ifsc_code && (
          <Text style={styles.errorText}>{errors.ifsc_code}</Text>
        )}

        <TextInput
          placeholder="UPI ID"
          placeholderTextColor={'grey'}
          value={formData.upi_id}
          style={styles.input}
          onChangeText={value => handleInputChange('upi_id', value)}
        />
        {errors.upi_id && <Text style={styles.errorText}>{errors.upi_id}</Text>}
      </View>
      <View style={styles.fileSection}>
        <Text style={{fontSize: 18, color: 'grey'}}>
          {formData.passbook_img?.name
            ? formData.passbook_img.name?.slice(0, 25)
            : formData.passbook_img
            ? formData.passbook_img.slice(0, 29.5)
            : 'Bank Passbook First Page'}
        </Text>
        <TouchableOpacity
          onPress={() => pickFile('passbook_img')}
          style={styles.uploadButton}>
          <Text style={styles.upload}>Upload</Text>
        </TouchableOpacity>
      </View>
      {errors.passbook_img && (
        <Text style={styles.errorText}>{errors.passbook_img}</Text>
      )}
      {formData.passbook_img && (
        <Image
          source={{uri: formData.passbook_img.uri || formData.passbook_img}}
          style={styles.imageStyle}
          resizeMode="contain"
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddBankDetails;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    elevation: 5,
    color: 'black',
  },
  inputContainer: {marginTop: 20, rowGap: 20},
  button: {
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 15,
    width: 120,
    height: 50,
    backgroundColor: '#00308F',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  imageStyle: {
    marginTop: 15,
    width: deviceWidth - 10,
    height: deviceWidth - 10,
  },
});
