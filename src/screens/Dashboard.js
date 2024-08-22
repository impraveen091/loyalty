import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImageSlider from '../components/imageSlider/ImageSlider';
import PointCard from '../components/PointCard/PointCard';
import {
  COLORS,
  defaultImage,
  deviceWidth,
  profileImageLink,
} from '../constants/Constants';
import Promotional from '../components/Assets/svg/promotional.svg';
import Redeem from '../components/Assets/svg/redeem.svg';
import Bank from '../components/Assets/svg/bank.svg';
import Catalog from '../components/Assets/svg/catalog.svg';
import Product from '../components/Assets/svg/product.svg';
import Transactions from '../components/Assets/svg/transactions.svg';
import Refer from '../components/Assets/svg/refer.svg';
import Receipt from '../components/Assets/svg/receipt.svg';
import Scan from '../components/Assets/svg/scan.svg';
import {useTranslation} from 'react-i18next';
import {getUserData} from '../Auth/Auth';
import axiosInstance from '../Auth/AxiosInstance';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../components/Loader/Loader';

const Dashboard = ({navigation}) => {
  const isFocused = useIsFocused();
  const {t} = useTranslation();
  const [image, setImage] = useState(profileImageLink);
  const [points, setPoints] = useState('');
  const [pColor, setPColor] = useState(COLORS.primary);
  const [sColor, setSColor] = useState(COLORS.secondary);
  const [pointLimit, setPointLimit] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [SliderImages, setSliderImages] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const url = 'app-user/points-available';
    try {
      const result = await axiosInstance.get(url);
      console.log('Points:', result.data);
      setPoints(result.data.data);
    } catch (error) {
      console.error('Get request failed1:', error);
    }
    const urllimit = 'tenant/redemption/get';
    try {
      const result = await axiosInstance.get(urllimit);
      console.log('Points limit:', result.data);
      setPointLimit(result.data.data);
    } catch (error) {
      console.error('Get request failed2:', error);
    }

    const urlSlider = 'app-user/slider/list';
    try {
      const result = await axiosInstance.get(urlSlider);
      console.log('SliderImages:', result.data);
      setSliderImages(result.data.data);
    } catch (error) {
      console.error('Get request failed3:', error);
    }

    try {
      const imageData = await getUserData('data');
      console.log('profileDAta', imageData.image);
      setImage(imageData?.image);
    } catch (error) {
      console.error('Get user data failed4:', error);
    }

    try {
      const result = await getUserData('images');
      // console.log('Points limit:', result.data);
      setPColor(result?.primary_color);
      setSColor(result?.secondary_color);
    } catch (error) {
      console.error('Get request failed:', error);
    }

    const urlkyc = 'app-user/get/kyc-details';
    try {
      const result = await axiosInstance.get(urlkyc);
      console.log('kyc details:', result.data.data.status);
      setStatus(result.data.data.status);
    } catch (error) {
      console.log('Get request failed:', error.response.data.message);
      if (error.response.data.message === 'Kyc data not found.') {
        setStatus(2);
      }
    }

    const urlfcm = 'app-user/notification-token';
    const result = await getUserData('fcmToken');
    const fcmPayload = {
      fcm_device_token: result,
    };
    console.log('FCMpAYLOAD', fcmPayload);

    try {
      const result = await axiosInstance.post(urlfcm, fcmPayload);
      console.log('fcmToken post', result.data);
    } catch (error) {
      console.log('POST for FCM request failed:', error.response.data.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <>
          {SliderImages.length > 0 && (
            <ImageSlider data={SliderImages} mode="cover" />
          )}

          <PointCard
            imageLink={image ? image : defaultImage}
            points={points}
            pointLimit={pointLimit.limit}
            pColor={pColor}
            sColor={sColor}
          />
          <View style={styles.menuCardContainer}>
            <TouchableOpacity
              style={
                status !== 1
                  ? [styles.menuCard, {backgroundColor: ''}]
                  : styles.menuCard
              }
              onPress={() => navigation.navigate('Scan')}
              disabled={status !== 1}>
              <Scan width={30} height={30} />
              <Text style={styles.text}>{t('Scan')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate('PromotionalOffers')}>
              <Promotional width={30} height={30} />
              <Text style={styles.text}>{t('Promotional Offers')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate('Redeem')}>
              <Redeem width={30} height={30} />
              <Text style={styles.text}>{t('Redeem')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate('Bank')}>
              <Bank width={40} height={40} />
              <Text style={styles.text}>{t('Bank')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate('Catalog')}>
              <Catalog width={40} height={40} />
              <Text style={styles.text}>{t('Catalog')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate('Products')}>
              <Product width={40} height={40} />
              <Text style={styles.text}>{t('Products')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate('Transactions')}>
              <Transactions width={40} height={40} />
              <Text style={styles.text}>{t('Transactions')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate('Refer')}>
              <Refer width={40} height={40} />
              <Text style={styles.text}>{t('Refer')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuCard}
              onPress={() => navigation.navigate('PurchaseReceipt')}>
              <Receipt width={35} height={35} />
              <Text style={styles.text}>{t('Purchase Receipt')}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    marginTop: deviceWidth - 60,
  },
  menuCard: {
    width: deviceWidth / 3.73,
    height: deviceWidth / 3.73,
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    rowGap: 10,
  },
  text: {
    color: '#5072A7',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 14,
  },
  menuCardContainer: {
    marginTop: 25,
    flexDirection: 'row',
    columnGap: 10,
    rowGap: 10,
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    marginBottom: 80,
    justifyContent: 'center',
  },
});
