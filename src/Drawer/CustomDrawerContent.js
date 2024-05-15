// CustomDrawerContent.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pending from '../components/Assets/svg/exclamation.svg';
import EditProfile from '../components/Assets/svg/editprofile.svg';

const CustomDrawerContent = ({navigation}) => {
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
});

export default CustomDrawerContent;
