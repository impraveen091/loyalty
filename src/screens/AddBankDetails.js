import {
  Alert,
  Button,
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
        bank_name: editData.bank_name,
        ifsc_code: editData.ifsc_code,
        passbook_img: null,
        account_name: editData.account_name,
        upi_id: editData.upi_id,
      });
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
    if (typeof value === 'string' && value.trim() !== '') {
      setErrors({...errors, [field]: null});
    }
  };

  const validateFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = async () => {
    console.log('formdatabank', formData);
    if (validateFields()) {
      try {
        const response = await axiosInstance.post(
          'app-user/bank-details/update',
          formData,
        );
        console.log('bank details', response.data);
        if (response.data.success === 'success') {
          ToastAndroid.show('Details Added', ToastAndroid.SHORT);
          navigation.navigate('Dashboard');
        }
      } catch (error) {
        Alert.alert(
          'Submission Error',
          error.response.data.message || error.message,
        );
      }
    } else {
      ToastAndroid.show(
        'Please fill in all required fields',
        ToastAndroid.SHORT,
      );
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
          {formData.passbook_img
            ? `${formData.passbook_img.name.slice(0, 25)}`
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
});
