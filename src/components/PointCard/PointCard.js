import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {deviceWidth} from '../../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Coin from '../Assets/svg/coin.svg';
import {useTranslation} from 'react-i18next';

const PointCard = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#00308F', '#5072A7']}
      style={styles.linearGradient}>
      <View style={styles.cardView}>
        <View>
          <View>
            <View style={styles.coinIcon}>
              <Text style={styles.text}>{t('Available Points')}</Text>
              <Coin width={25} height={25} />
            </View>

            <Text style={styles.text}>0.00</Text>
          </View>

          <View style={{marginTop: 20}}>
            <View style={styles.coinIcon}>
              <Text style={styles.text}>{t('Redemption limit')}</Text>
              <Coin width={25} height={25} />
            </View>

            <Text style={styles.text}>250</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/workman-with-ax-white-background_1368-5733.jpg?t=st=1715750000~exp=1715753600~hmac=8f953c61efbed903517fa0085ac44577018c6b2ec4e27c46290a8848f2cc0fe7&w=826',
            }}
            style={styles.profilePhoto}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.borderBottom}></View>
      <View style={styles.cardBottom}>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={[styles.text, {fontSize: 16}]}>{t('Transactions')}</Text>
        </TouchableOpacity>
        <View style={styles.borderRight}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Bank')}>
          <Text style={[styles.text, {fontSize: 16}]}>{t('Bank')}</Text>
        </TouchableOpacity>
        <View style={styles.borderRight}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Redeem')}>
          <Text style={[styles.text, {fontSize: 16}]}>{t('Redeem')}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default PointCard;

const styles = StyleSheet.create({
  linearGradient: {
    padding: 15,
    width: deviceWidth - 40,
    height: 200,
    borderRadius: 10,
    marginTop: 15,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomWidth: 0.8,
    borderColor: '#000130',
    marginTop: 22,
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: '#000130',
    height: 15,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 5,
  },
  coinIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: 10,
  },
});
