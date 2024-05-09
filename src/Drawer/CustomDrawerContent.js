// CustomDrawerContent.js
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CustomDrawerContent = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{uri: 'https://picsum.photos/200/300'}}
          style={styles.profilePhoto}
        />
        <Text style={styles.username}>John Doe</Text>
      </View>
      <View style={styles.menuItems}>
        <Text style={styles.menuItem}>Menu Item 1</Text>
        <Text style={styles.menuItem}>Menu Item 2</Text>
        {/* Add more menu items as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItems: {
    marginTop: 10,
  },
  menuItem: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default CustomDrawerContent;
