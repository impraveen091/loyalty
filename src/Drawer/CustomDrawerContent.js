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

const CustomDrawerContent = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={['#00308F', '#5072A7']}
        style={styles.linearGradient}>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg',
          }}
          style={styles.profilePhoto}
        />
        <Text style={styles.username}>Big Leap </Text>
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
        <Text style={styles.menuItemGrey}>About us</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawerContent;
