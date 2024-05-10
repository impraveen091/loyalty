import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {deviceWidth} from '../../constants/Constants';

const ImageSlider = ({images}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  const renderIndicators = () => {
    return images.map((_, i) => (
      <View
        key={i}
        style={[styles.indicator, i === index ? styles.activeIndicator : null]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: images[index]}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.indicatorContainer}>{renderIndicators()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: deviceWidth - 40,
    height: 220,
    borderRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    width: 15,
    backgroundColor: '#333',
  },
});

export default ImageSlider;
