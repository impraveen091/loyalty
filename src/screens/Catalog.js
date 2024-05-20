import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {deviceWidth} from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

const Catalog = () => {
  const {t} = useTranslation();
  const handlePress = async () => {
    await Linking.openURL(
      'https://www.asianpaints.com/content/dam/asianpaints/landing-pages/delhi-beautiful-homes/Royale-Book-of-Colours.pdf',
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('Catalog')}</Text>

      <TouchableOpacity onPress={handlePress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#EE4B2B', '#DE3163']}
          style={styles.linearGradient}>
          <Text style={styles.subheading}>{t('Catalog')} 2024</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#FFAC1C', '#CC5500']}
          style={styles.linearGradient}>
          <Text style={styles.subheading}>{t('Catalog')} 2023</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Catalog;
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
  },
  linearGradient: {
    padding: 10,
    width: deviceWidth - 20,
    height: 80,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'space-around',
  },
  subheading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
  },
});
