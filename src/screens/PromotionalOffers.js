import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {deviceHeight, deviceWidth, noDataImage} from '../constants/Constants';
import Tag from '../components/Assets/svg/tag.svg';
import RightArrow from '../components/Assets/svg/right-arrow.svg';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../Auth/AxiosInstance';
import {getUserData} from '../Auth/Auth';

const PromotionalOffers = () => {
  const navigation = useNavigation();
  const [pColor, setPColor] = useState('');
  const [sColor, setSColor] = useState('');
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCatalog = async () => {
    setLoading(true);
    const url = 'app-user/promotion/list';
    try {
      const result = await axiosInstance.get(url);
      console.log('offers:', result.data.data);
      if (result.data.success) {
        setOffers(result.data.data);
      }
    } catch (error) {
      console.error('Get request failed:', error);
    }

    try {
      const result = await getUserData('images');
      // console.log('Points limit:', result.data);
      setPColor(result.primary_color);
      setSColor(result.secondary_color);
    } catch (error) {
      console.error('Get request failed:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCatalog();
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1b254c" style={styles.loader} />
      ) : (
        <>
          <Text style={styles.heading}>Offers & Promotions</Text>
          <Text style={styles.subheading}>Product Offers</Text>
          {offers.length > 0 ? (
            offers.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('OfferDetails', {data: item})
                }
                key={index}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[pColor, sColor]}
                  style={styles.linearGradient}>
                  <View style={styles.data}>
                    <Tag width={20} height={20} />
                    <Text style={styles.offername}>{item.name}</Text>
                  </View>
                  <View style={styles.viewContainer}>
                    <Text style={styles.viewMore}>View More</Text>
                    <RightArrow width={18} height={18} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))
          ) : (
            <Image
              resizeMode="cover"
              source={{uri: noDataImage}}
              style={styles.image}
            />
          )}
        </>
      )}
    </View>
  );
};

export default PromotionalOffers;
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
  },
  linearGradient: {
    padding: 15,
    width: deviceWidth - 20,
    height: 130,
    borderRadius: 10,
    marginTop: 15,
  },
  subheading: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  data: {flexDirection: 'row', columnGap: 10},
  offername: {fontSize: 15, color: 'white', fontWeight: 'bold'},
  viewContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewMore: {color: 'white'},
  image: {
    resizeMode: 'contain',
    height: deviceHeight / 2,
    marginTop: deviceHeight / 5,
    width: deviceWidth - 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  loader: {marginTop: deviceWidth},
});
