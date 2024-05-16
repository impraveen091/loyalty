// CustomDrawerContent.js
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pending from '../components/Assets/svg/exclamation.svg';
import EditProfile from '../components/Assets/svg/editprofile.svg';
import Language from '../components/Assets/svg/language.svg';
import Cancel from '../components/Assets/svg/cancel.svg';
import UpArrow from '../components/Assets/svg/down-arrow.svg';
import DownArrow from '../components/Assets/svg/up-arrow.svg';
import {RadioButton} from 'react-native-paper';
import {deviceWidth, deviceHeight} from '../constants/Constants';

const CustomDrawerContent = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState('English');
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
            <Text style={styles.kycText}>KYC Pending</Text>
            <Pending width={25} height={25} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{
              flexDirection: 'row',
              columnGap: 5,
            }}>
            <Text style={{color: 'white'}}>Edit Profile</Text>
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

        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.menuItem}>Announcement</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
          <Text style={styles.menuItem}>Catalog</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HelpSupport')}>
          <Text style={styles.menuItem}>Help & Support</Text>
        </TouchableOpacity>

        {/* <Text style={styles.menuItem}>Take a tour</Text> */}
        <View style={{borderBottomWidth: 1, borderBottomColor: 'grey'}}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Aboutus')}>
          <Text style={styles.menuItemGrey}>About us</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Privacypolicy')}>
          <Text style={styles.menuItemGrey}>Privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Contactus')}>
          <Text style={styles.menuItemGrey}>Contact us</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Termsofuse')}>
          <Text style={styles.menuItemGrey}>Terms of use</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.menuItemGrey}>Logout</Text>
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
});

export default CustomDrawerContent;
