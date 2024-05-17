// CustomDrawerContent.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pending from '../components/Assets/svg/exclamation.svg';
import EditProfile from '../components/Assets/svg/editprofile.svg';
import Language from '../components/Assets/svg/language.svg';
import Cancel from '../components/Assets/svg/cancel.svg';
import UpArrow from '../components/Assets/svg/down-arrow.svg';
import DownArrow from '../components/Assets/svg/up-arrow.svg';
import Announcement from '../components/Assets/svg/announcement.svg';
import Catalog from '../components/Assets/svg/catalog.svg';
import Support from '../components/Assets/svg/support.svg';
import {RadioButton} from 'react-native-paper';
import {deviceWidth, deviceHeight} from '../constants/Constants';
import {useTranslation} from 'react-i18next';
import i18next from '../../services/i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const CustomDrawerContent = ({navigation}) => {
  const {t} = useTranslation();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState('');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedData = await AsyncStorage.getItem('language');
        if (storedData) {
          setChecked(JSON.parse(storedData));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadLanguage();
  }, [isFocused, checked]);

  const changeLang = async language => {
    await AsyncStorage.setItem('language', JSON.stringify(language));
    ToastAndroid.show(`${language} selected`, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#00308F', '#5072A7']}
        style={styles.linearGradient}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/workman-with-ax-white-background_1368-5733.jpg?t=st=1715750000~exp=1715753600~hmac=8f953c61efbed903517fa0085ac44577018c6b2ec4e27c46290a8848f2cc0fe7&w=826',
            }}
            style={styles.profilePhoto}
          />
          <Text style={styles.username}>Mohan Bhargav </Text>
        </View>
        <View style={styles.kycSection}>
          <View style={styles.pending}>
            <Text style={styles.kycText}>{t('KYC Pending')}</Text>
            <Pending width={25} height={25} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{
              flexDirection: 'row',
              columnGap: 5,
            }}>
            <Text style={{color: 'white'}}>{t('Edit Profile')}</Text>
            <EditProfile width={20} height={20} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.menuItems}>
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
                </ScrollView>
              </RadioButton.Group>
            </View>
          </View>
        </Modal>

        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}></View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={styles.section}>
          <Announcement width={25} height={25} />
          <Text style={styles.menuItem}>{t('Announcement')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Catalog')}
          style={styles.section}>
          <Catalog width={25} height={25} />
          <Text style={styles.menuItem}>{t('Catalog')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('HelpSupport')}
          style={styles.section}>
          <Support width={25} height={25} />
          <Text style={styles.menuItem}>{t('Help & Support')}</Text>
        </TouchableOpacity>

        {/* <Text style={styles.menuItem}>Take a tour</Text> */}
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Aboutus')}>
          <Text style={styles.menuItemGrey}>{t('About us')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Privacypolicy')}>
          <Text style={styles.menuItemGrey}>{t('Privacy Policy')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contactus')}>
          <Text style={styles.menuItemGrey}>{t('Contact us')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Termsofuse')}>
          <Text style={styles.menuItemGrey}>{t('Terms of use')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.menuItemGrey}>{t('Logout')}</Text>
        </TouchableOpacity>
        <Text style={styles.menuItemGrey}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  menuItems: {
    marginTop: 10,
    paddingHorizontal: 30,
    rowGap: 20,
  },
  menuItem: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '500',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 10,
  },
  menuItemGrey: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '300',
    color: 'grey',
  },
  linearGradient: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  imageContainer: {flexDirection: 'row', alignItems: 'center'},
  kycSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 10,
  },
  pending: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 'fit-content',
    padding: 3,
    marginVertical: 10,
    borderRadius: 5,
    width: 130,
  },
  kycText: {fontSize: 14, fontWeight: '600', color: '#00308F'},
  languageSection: {
    flexDirection: 'row',
    columnGap: 10,
    marginTop: 10,
    alignItems: 'center',
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
  section: {flexDirection: 'row', columnGap: 10},
});

export default CustomDrawerContent;
