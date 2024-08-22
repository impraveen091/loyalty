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
  ScrollView,
} from 'react-native';
import {deviceHeight, deviceWidth} from '../constants/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../redux/actions';
import Cart from '../components/Assets/svg/cart.svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import axiosInstance from '../Auth/AxiosInstance';
import Loader from '../components/Loader/Loader';
import ImageSlider from '../components/imageSlider/ImageSlider';

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const centralData = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const product_id = route.params.product_id;

  const cartItem = centralData.find(cartItem => cartItem.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  console.log('central', centralData);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const url = `app-user/product/${product_id}`;
      try {
        const result = await axiosInstance.get(url);
        console.log('ProductDetails:', result.data.data);
        if (result.data.success === 'success') {
          setProduct(result.data.data);
        }
      } catch (error) {
        console.error(
          'Get request failed:',
          error.response.data.message || error.message,
        );
      }

      setLoading(false);
    };
    getProduct();
  }, []);

  const handleAddToCart = (item, quantity) => {
    dispatch(addToCart(item, quantity));
  };

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Product Detail</Text>
            <TouchableOpacity
              style={styles.cartContainer}
              onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.cartCount}>{centralData.length}</Text>
              <View>
                <Cart style={styles.cartIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                justifyContent: 'center',
                paddingHorizontal: 15,
                marginBottom: 10,
              }}>
              <ImageSlider data={product.ProductImages} mode="contain" />
            </View>

            <View style={{paddingHorizontal: 15}}>
              <Text style={styles.detail}>{product.name}</Text>
              <Text style={[styles.detail, {fontSize: 14, color: 'grey'}]}>
                {product.description}
              </Text>
              <Text style={[styles.detail, {fontSize: 14, color: 'grey'}]}>
                Colors: {product.color}
              </Text>
              <Text style={[styles.detail, {fontSize: 16}]}>
                price: ₹{product.price}
              </Text>
              <Text style={[styles.detail, {fontSize: 16}]}>
                size: {product.weight}
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              {quantity <= 0 ? (
                <TouchableOpacity
                  style={[
                    styles.button,
                    {width: '100%', backgroundColor: 'green'},
                  ]}
                  onPress={() => handleAddToCart(product, quantity + 1)}>
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleAddToCart(product, quantity - 1)}
                    disabled={quantity <= 0}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleAddToCart(product, quantity + 1)}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Cart')}>
              <Text style={styles.buttonText}>Go to Cart</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {flex: 1, padding: 5},
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
  scrollViewContent: {
    alignItems: 'center',
    flexDirection: 'column',
    width: deviceWidth - 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    zIndex: 1000,
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

  image: {width: 150, height: 150},
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    width: '85%',
    flexWrap: 'wrap',
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
  quantityContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: '#00308F',
    padding: 5,
    borderRadius: 5,
    width: 30,
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addtocart: {
    width: 'auto',
    paddingHorizontal: 10,
    height: 30,
    backgroundColor: '#00308F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  detail: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'justify',
  },
});
