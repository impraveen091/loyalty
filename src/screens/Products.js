import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import {deviceHeight, deviceWidth} from '../constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/actions';
import Cart from '../components/Assets/svg/cart.svg';
import {useNavigation} from '@react-navigation/native';
import axiosInstance from '../Auth/AxiosInstance';

const Products = () => {
  const navigation = useNavigation();
  const centralData = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const url = 'product/get-list';
      try {
        const result = await axiosInstance.get(url);
        console.log('Products:', result.data.data[0]);
        if (result.data.success === 'success') {
          setProducts(result.data.data);
        }
      } catch (error) {
        console.error('Get request failed:', error);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  const handleAddToCart = item => {
    dispatch(addToCart(item));
  };

  const renderProduct = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{uri: item?.ProductImages[0].image}}
        style={styles.image}
      />
      <View style={{maxWidth: '70%', rowGap: 5}}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>
          <Text style={styles.boldText}>Description: </Text>
          {item.description}
        </Text>
        <Text style={styles.productPrice}>
          <Text style={styles.boldText}>Price: ₹</Text>
          {item.price}
        </Text>
        <Text style={styles.productColor}>{item.color}</Text>
        <TouchableOpacity
          style={styles.addtocart}
          onPress={() => handleAddToCart(item)}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#1b254c" style={styles.loader} />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Products</Text>
            <TouchableOpacity
              style={styles.cartContainer}
              onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.cartCount}>{centralData.length}</Text>
              <View>
                <Cart style={styles.cartIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.cardContainer}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.buttonText}>Go to Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {flex: 1, padding: 10},
  loader: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: {flexDirection: 'row', justifyContent: 'center'},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
    marginBottom: 10,
  },
  cartContainer: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartCount: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    marginTop: -30,
    marginRight: -30,
  },
  cartIcon: {width: 20, height: 20, marginLeft: 5, marginTop: 10},
  cardContainer: {paddingBottom: 10, backgroundColor: 'white'},
  card: {
    width: deviceWidth - 20,
    height: 170,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    columnGap: 10,
  },
  image: {width: 150, height: 150},
  productName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  productDescription: {
    flexWrap: 'wrap',
    color: 'black',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
  productPrice: {color: 'black'},
  productColor: {fontWeight: 'bold', color: 'black'},
  addtocart: {
    width: 'auto',
    paddingHorizontal: 5,
    height: 30,
    backgroundColor: '#00308F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 60,
    bottom: 0,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  loader: {
    marginTop: deviceHeight / 2 - 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
