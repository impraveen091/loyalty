import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deviceWidth} from '../constants/Constants';
import {useNavigation} from '@react-navigation/native';
import {decreaseQuantity, increaseQuantity} from '../redux/actions';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const centralData = useSelector(state => state.cart.cart);
  console.log('centralData', centralData);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.heading}>Cart</Text>
      </View>
      {centralData?.length > 0 ? (
        <>
          <View style={styles.card}>
            {centralData.map((item, index) => (
              <View
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  elevation: 5,
                  borderRadius: 10,
                  alignItems: 'center',
                  height: 50,
                }}
                key={index}>
                <Image
                  source={{
                    uri: 'https://img.freepik.com/free-vector/painting-tools-equipment-realistic-composition-with-paint-cans_1284-7523.jpg?t=st=1715601163~exp=1715604763~hmac=1293de342fa8bf0eca0352ba7eba14ab6db64f68e26008b06fa06ae8938c02af&w=826',
                  }}
                  style={styles.image}
                />
                <Text style={styles.itemData}>{item?.name}</Text>
                <Text style={styles.itemData}>{item?.price}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: 10,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(decreaseQuantity(item?.id));
                    }}
                    style={styles.button}>
                    <Text style={styles.quantityHandle}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.itemData}>{item?.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(increaseQuantity(item?.id));
                    }}
                    style={styles.button}>
                    <Text style={styles.quantityHandle}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.proceed}
            onPress={() => navigation.pop()}>
            <Text style={{color: 'white', fontSize: 20}}>Proceed</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Image
          resizeMode="contain"
          source={{
            uri: 'https://img.freepik.com/premium-vector/customer-running-into-shop-with-trolley_107173-15134.jpg?w=826',
          }}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  heading: {
    fontSize: 25,
    color: '#00308F',
    fontWeight: '400',
    alignSelf: 'center',
    marginBottom: 10,
  },
  card: {
    width: deviceWidth - 20,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    maxHeight: 'fit-content',
    rowGap: 10,
  },
  button: {
    backgroundColor: 'white',
    width: 30,
    height: 30,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityHandle: {fontSize: 20},
  itemData: {color: 'black', fontSize: 16},
  image: {
    width: 40,
    height: 40,
  },
  proceed: {
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor: '#00308F',
    padding: 10,
    width: deviceWidth / 2,
    alignItems: 'center',
    borderRadius: 10,
  },
});
