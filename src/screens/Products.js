import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {deviceWidth} from '../constants/Constants';

const Products = () => {
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const generateRandomPaintData = () => {
      const paints = [];
      for (let i = 0; i < 10; i++) {
        const randomName = 'Paint ' + (i + 1);
        const randomDetails =
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
        const randomPrice = (Math.random() * 100).toFixed(2);
        paints.push({
          id: i + 1,
          name: randomName,
          details: randomDetails,
          price: parseFloat(randomPrice),
        });
      }
      return paints;
    };

    const paintsData = generateRandomPaintData();
    setproduct(paintsData);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Products</Text>
      <ScrollView
        style={styles.cardContainer}
        showsVerticalScrollIndicator={false}>
        {product.map((item, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/painting-tools-equipment-realistic-composition-with-paint-cans_1284-7523.jpg?t=st=1715601163~exp=1715604763~hmac=1293de342fa8bf0eca0352ba7eba14ab6db64f68e26008b06fa06ae8938c02af&w=826',
              }}
              style={styles.image}
            />
            <View style={{maxWidth: '70%', rowGap: 5}}>
              <Text style={{fontWeight: 'bold', fontSize: 18, color: 'black'}}>
                {item.name}
              </Text>
              <Text style={{flexWrap: 'wrap', color: 'black'}}>
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  Description:
                </Text>
                {item.details}
              </Text>
              <Text style={{color: 'black'}}>
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  Price: ₹
                </Text>
                {item.price}
              </Text>

              <Text style={{fontWeight: 'bold', color: 'black'}}>
                colors available: 7
              </Text>

              <TouchableOpacity style={styles.addtocart}>
                <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Products;
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
    height: 170,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    columnGap: 10,
  },
  cardContainer: {rowGap: 10, backgroundColor: 'white'},
  image: {
    width: 150,
    height: 150,
  },
  addtocart: {
    width: 'fit-content',
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
});
