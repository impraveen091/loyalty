import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {deviceWidth} from '../../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
// import Coin from '../Assets/svg/coin.svg';

const PointCard = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#00308F', '#5072A7']}
      style={styles.linearGradient}>
      <View style={styles.cardView}>
        <View>
          {/* <Coin width={25} height={25} /> */}
          <View>
            <Text style={styles.text}>Available Points</Text>
            <Text style={styles.text}>0.00</Text>
          </View>

          <View style={{marginTop: 20}}>
            <Text style={styles.text}>Redemption limit</Text>
            <Text style={styles.text}>250</Text>
          </View>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_1280.jpg',
            }}
            style={styles.profilePhoto}
          />
        </View>
      </View>
      <View style={styles.borderBottom}></View>
      <View style={styles.cardBottom}>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
          <Text style={[styles.text, {fontSize: 16}]}>Transaction</Text>
        </TouchableOpacity>
        <View style={styles.borderRight}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Bank')}>
          <Text style={[styles.text, {fontSize: 16}]}>Bank</Text>
        </TouchableOpacity>
        <View style={styles.borderRight}></View>
        <TouchableOpacity onPress={() => navigation.navigate('Redeem')}>
          <Text style={[styles.text, {fontSize: 16}]}>Redeem</Text>
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
});
