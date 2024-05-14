import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {deviceWidth} from '../../constants/Constants';

const ImageSlider = ({data}) => {
  const flatlistRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === data?.length - 1) {
        flatlistRef?.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef?.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, data, flatlistRef]);

  const getItemLayout = (data, index) => ({
    length: deviceWidth - 40,
    offset: (deviceWidth - 40) * index,
    index: index,
  });

  const renderDotIndicators = () => {
    return data.map((dot, index) => {
      if (activeIndex === index) {
        return <View style={styles.activedot} key={index}></View>;
      } else {
        return <View key={index} style={styles.inactivedot}></View>;
      }
    });
  };

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / deviceWidth;
    setActiveIndex(Math.round(index));
  };

  const renderItem = ({item, index}) => {
    if (item == null || item == undefined) {
      return null;
    } else {
      return (
        <TouchableOpacity activeOpacity={0.7} key={index}>
          <Image resizeMode="cover" source={{uri: item}} style={styles.image} />

          <View style={styles.dotcontainer}>{renderDotIndicators()}</View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <FlatList
        ref={flatlistRef}
        data={data}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    height: 210,
    width: deviceWidth - 40,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dotcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  activedot: {
    backgroundColor: '#5F5CF0',
    height: 10,
    width: 20,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  inactivedot: {
    backgroundColor: 'gray',
    height: 10,
    width: 10,
    borderRadius: 10,
    marginHorizontal: 6,
  },
});

export default ImageSlider;
