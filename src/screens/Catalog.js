import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Image,
} from 'react-native';
import {
  COLORS,
  deviceHeight,
  deviceWidth,
  noDataImage,
} from '../constants/Constants';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import axiosInstance from '../Auth/AxiosInstance';
import {getUserData} from '../Auth/Auth';
import Loader from '../components/Loader/Loader';

const Catalog = () => {
  const {t} = useTranslation();
  const [pColor, setPColor] = useState(COLORS.primary);
  const [sColor, setSColor] = useState(COLORS.secondary);
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const getCatalog = async () => {
    setLoading(true);
    const url = 'app-user/catalogue/list';
    try {
      const result = await axiosInstance.get(url);
      console.log('catalog:', result.data.data);
      if (result.data.success) {
        setCatalog(result.data.data);
      }
    } catch (error) {
      console.error('Get request failed:', error);
      ('');
    }
    try {
      const result = await getUserData('images');
      // console.log('Points limit:', result.data);
      setPColor(result?.primary_color);
      setSColor(result?.secondary_color);
    } catch (error) {
      console.error('Get request failed:', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getCatalog();
  }, []);

  const handlePress = async link => {
    await Linking.openURL(link);
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loader}>
          <Loader />
        </View>
      ) : (
        <>
          <Text style={styles.heading}>{t('Catalog')}</Text>
          {catalog.length > 0 ? (
            catalog.reverse().map((item, index) => (
              <TouchableOpacity
                onPress={() => handlePress(item.filename)}
                key={index}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[pColor, sColor]}
                  style={styles.linearGradient}>
                  <Text style={styles.subheading}>
                    {t('Catalog')} {item.original_name}
                  </Text>
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
    textAlign: 'left',
  },
  loader: {
    marginTop: deviceHeight / 2 - 20,
  },
  image: {
    resizeMode: 'contain',
    height: deviceHeight / 2,
    marginTop: deviceHeight / 5,
    width: deviceWidth - 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
