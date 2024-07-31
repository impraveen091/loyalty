import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  COLORS,
  deviceHeight,
  deviceWidth,
  username,
} from '../constants/Constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import Language from '../components/Assets/svg/language.svg';
import Cancel from '../components/Assets/svg/cancel.svg';
import UpArrow from '../components/Assets/svg/up-arrow.svg';
import DownArrow from '../components/Assets/svg/down-arrow.svg';
import {useTranslation} from 'react-i18next';
import i18next from '../../services/i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../Auth/AxiosInstance';
import {saveUserData} from '../Auth/Auth';
import {Base_url} from '../../services/Api';
import axios from 'axios';
import Signup from './Signup';
import timeout from '../components/Assets/Images/timeout.jpg';

const Signin = () => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState('');
  const [signin, setSignin] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(checked);

  useEffect(() => {
    const makeApiCall = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${Base_url}app-user/tenant/app-data`,
          {
            headers: {
              'x-username': username,
              'x-tenant-id': '1',
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.data.success === 'success') {
          const data = response.data.data;
          setLogo(data.logo);
          setSignin(data.login_img);
          const screenImages = {
            signup: data.singup_img,
            otp: data.otp_img,
            logo: data.logo,
          };
          await saveUserData('images', screenImages);
        } else {
          console.error('Unexpected response format', response.data);
          setError({error: 'Unexpected response format'});
        }
      } catch (error) {
        console.log(
          'There was a problem with the fetch operation:',
          error.message,
        );
        setError({error: error.message});
      } finally {
        setLoading(false);
      }
    };

    makeApiCall();
  }, []);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedData = await AsyncStorage.getItem('language');
        if (storedData) {
          setChecked(JSON.parse(storedData));
          i18next.changeLanguage(JSON.parse(storedData));
        } else {
          i18next.changeLanguage('English');
          setChecked('English');
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadLanguage();
  }, [isFocused, checked]);

  // console.log('error', error);

  const submit = async phone => {
    if (phone.length !== 10) {
      setError({...error, phone: 'Please enter a valid phone number'});
    } else {
      const url = 'auth/app-user/login';
      const formData = {phone};
      try {
        const result = await axiosInstance.post(url, formData);
        console.log('SignIn Data', result.data);
        if (result.data.success === 'success') {
          ToastAndroid.show(result.data.data.otp, ToastAndroid.LONG);
          setPhone('');
          saveUserData('data', result.data.data);
          navigation.navigate('Otp');
        }
      } catch (error) {
        if (error.response.status === 400) {
          ToastAndroid.show('User not found, please signup', ToastAndroid.LONG);
          saveUserData('phone', phone);
          navigation.navigate('Signup');
        } else {
          Alert.alert('Something bad happened, please try again later');
        }
        console.log('API call error:', error.response.status);
      }
    }
  };

  const changeLang = async language => {
    await AsyncStorage.setItem('language', JSON.stringify(language));
    ToastAndroid.show(`${language} ${t('Selected')}`, ToastAndroid.SHORT);
  };
  return (
    <View showsVerticalScrollIndicator={false} style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1b254c" style={styles.loader} />
      ) : error !== null && error.error === 'Network Error' ? (
        <View>
          <Image
            source={timeout}
            style={styles.errorimage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View s>
          <Image
            source={{
              uri: logo
                ? logo
                : 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F74b543a971c26d31eb953337ff7d64f2.cdn.bubble.io%2Ff1694581734495x451542289950882940%2Ffinal%2520icon-01.png?w=256&h=37&auto=compress&dpr=1.25&fit=max',
            }}
            style={[styles.image, {width: deviceWidth - 50, height: 40}]}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.languageSection}
            onPress={() => setModalVisible(!modalVisible)}>
            <Language width={20} height={20} />
            <Text style={{fontSize: 18, color: '#5072A7'}}>{checked}</Text>

            {modalVisible ? (
              <UpArrow width={10} height={10} />
            ) : (
              <DownArrow width={10} height={10} />
            )}
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Cancel
                  width={20}
                  height={20}
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => setModalVisible(false)}
                />
                <RadioButton.Group
                  onValueChange={newValue => {
                    changeLang(newValue);
                    setChecked(newValue);
                    i18next.changeLanguage(newValue);
                    setModalVisible(false);
                  }}
                  value={checked}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <RadioButton.Item label="English" value="English" />
                    <RadioButton.Item label="हिंदी" value="हिंदी" />
                    <RadioButton.Item label="اردو" value="اردو" />
                    <RadioButton.Item label="ਪੰਜਾਬੀ" value="ਪੰਜਾਬੀ" />
                    <RadioButton.Item label="தமிழ்" value="தமிழ்" />
                    <RadioButton.Item label="తెలుగు" value="తెలుగు" />
                    <RadioButton.Item label="বাংলা" value="বাংলা" />
                    <RadioButton.Item label="മലയാളം" value="മലയാളം" />
                    <RadioButton.Item label="ಕನ್ನಡ" value="ಕನ್ನಡ" />
                    <RadioButton.Item label="ગુજરાતી" value="ગુજરાતી" />
                    <RadioButton.Item label="ଓଡ଼ିଆ" value="ଓଡ଼ିଆ" />
                    <RadioButton.Item label="मराठी" value="मराठी" />
                    <RadioButton.Item label="অসমীয়া" value="অসমীয়া" />
                  </ScrollView>
                </RadioButton.Group>
              </View>
            </View>
          </Modal>
          <Image
            source={{
              uri: signin
                ? signin
                : 'https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?t=st=1719399088~exp=1719402688~hmac=bd4cede27ddfb952516560f019051da5594dc9b8c576ae8b69708fdb53cc2957&w=826',
            }}
            style={styles.image}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.heading}>{t('Login')}</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder={t('Enter your phone Number')}
              placeholderTextColor="grey"
              onChangeText={setPhone}
              value={phone}
            />
            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
              style={[styles.submit, {width: deviceWidth - 60, height: 50}]}
              onPress={() => submit(phone)}>
              <Text style={styles.register}>{t('Login')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.submit,
                {
                  width: deviceWidth - 60,
                  height: 50,
                  backgroundColor: '#ff735c',
                },
              ]}
              onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.register}>{t('Signup')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  shadowColor: '#000',
  languageSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: deviceWidth / 2,
    height: deviceHeight - 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loader: {
    marginTop: deviceHeight / 2 - 20,
  },
  errorimage: {
    resizeMode: 'contain',
    height: deviceHeight / 2,
    marginTop: deviceHeight / 5,
    width: deviceWidth - 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
