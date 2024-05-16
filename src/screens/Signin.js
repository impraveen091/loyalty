import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {deviceHeight, deviceWidth} from '../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import Language from '../components/Assets/svg/language.svg';
import Cancel from '../components/Assets/svg/cancel.svg';
import UpArrow from '../components/Assets/svg/down-arrow.svg';
import DownArrow from '../components/Assets/svg/up-arrow.svg';

const Signin = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState('English');

  const submit = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid phone number');
    } else {
      setPhone('');
      navigation.navigate('Otp');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F74b543a971c26d31eb953337ff7d64f2.cdn.bubble.io%2Ff1694581734495x451542289950882940%2Ffinal%2520icon-01.png?w=256&h=37&auto=compress&dpr=1.25&fit=max',
        }}
        style={[styles.image, {width: deviceWidth - 50, height: 40}]}
      />
      <TouchableOpacity
        style={styles.languageSection}
        onPress={() => setModalVisible(!modalVisible)}>
        <Language width={20} height={20} />
        <Text style={{fontSize: 18}}>{checked}</Text>

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
                setChecked(newValue);
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
              </ScrollView>
            </RadioButton.Group>
          </View>
        </View>
      </Modal>

      <Image
        source={{
          uri: 'https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7863.jpg?t=st=1715683995~exp=1715687595~hmac=ab594e8d0da6ae56166a9698d3a15c9b8a42609c98e411b0d2815d334bd16408&w=740',
        }}
        style={styles.image}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter your Phone number"
          placeholderTextColor="grey"
          onChangeText={setPhone}
          value={phone}
        />
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity
          style={[styles.submit, {width: deviceWidth - 60, height: 50}]}
          onPress={submit}>
          <Text style={styles.register}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.submit,
            {width: deviceWidth - 60, height: 50, backgroundColor: '#ff735c'},
          ]}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.register}>Register / SignUp</Text>
        </TouchableOpacity>
      </View>
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
});
