// CustomDrawerContent.js
import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
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
        <Text
          style={styles.menuItem}
          onPress={() => navigation.navigate('Dashboard')}>
          Dashboard
        </Text>
        <Text
          style={styles.menuItem}
          onPress={() => navigation.navigate('Rewards')}>
          Rewards
        </Text>
        <Text style={styles.menuItem}>Drawer Item 1</Text>
        <Text style={styles.menuItem}>Drawer Item 2</Text>
        <Text style={styles.menuItem}>Drawer Item 3</Text>
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
  },
  menuItems: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '500',
  },
  linearGradient: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawerContent;
