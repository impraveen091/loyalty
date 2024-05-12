import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImageSlider from '../components/imageSlider/ImageSlider';
import PointCard from '../components/PointCard/PointCard';
import {deviceHeight, deviceWidth} from '../constants/Constants';
import Promotional from '../components/Assets/svg/promotional.svg';
import Redeem from '../components/Assets/svg/redeem.svg';
import Bank from '../components/Assets/svg/bank.svg';
import Catalog from '../components/Assets/svg/catalog.svg';
import Product from '../components/Assets/svg/product.svg';
import Transactions from '../components/Assets/svg/transactions.svg';
import Refer from '../components/Assets/svg/refer.svg';
import Receipt from '../components/Assets/svg/receipt.svg';

const Dashboard = ({navigation}) => {
  const points = useSelector(state => state.loyalty.points);
  const dispatch = useDispatch();

  const handleAddPoints = () => {
    dispatch({type: 'ADD_POINTS', payload: 10}); // Example action to add points
  };
  const images = [
    'https://cdn.pixabay.com/photo/2021/08/11/16/06/mountain-6538890_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/02/13/10/30/eye-7787024_1280.jpg',
    'https://cdn.pixabay.com/photo/2017/11/11/21/08/paint-2940513_1280.jpg',
    'https://cdn.pixabay.com/photo/2014/08/11/21/39/wall-416060_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/01/16/04/15/painter-7721563_1280.jpg',
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <ImageSlider images={images} />
      <PointCard />
      <View style={styles.menuCardContainer}>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('PromotionalOffers')}>
          <Promotional width={30} height={30} />
          <Text style={styles.text}>Promotional Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Redeem')}>
          <Redeem width={30} height={30} />
          <Text style={styles.text}>Redeem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Bank')}>
          <Bank width={40} height={40} />
          <Text style={styles.text}>Bank</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Catalog')}>
          <Catalog width={40} height={40} />
          <Text style={styles.text}>Catalog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Products')}>
          <Product width={40} height={40} />
          <Text style={styles.text}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Transactions')}>
          <Transactions width={40} height={40} />
          <Text style={styles.text}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('Refer')}>
          <Refer width={40} height={40} />
          <Text style={styles.text}>Refer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuCard}
          onPress={() => navigation.navigate('PurchaseReceipt')}>
          <Receipt width={40} height={40} />
          <Text style={styles.text}>Purchase Receipt</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  menuCard: {
    width: deviceWidth / 3.66,
    height: deviceWidth / 3.66,
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    color: '#000130',
    fontWeight: '500',
    textAlign: 'center',
  },
  menuCardContainer: {
    marginTop: 25,
    flexDirection: 'row',
    columnGap: 10,
    rowGap: 10,
    flexWrap: 'wrap',
    paddingHorizontal: 5,
    marginBottom: 80,
  },
});
