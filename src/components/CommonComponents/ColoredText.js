import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ColoredText = ({text, colors, style}) => {
  return (
    <View style={styles.container}>
      {text.split('').map((char, index) => (
        <Text
          key={index}
          style={[styles.text, {color: colors[index % colors.length]}, style]}>
          {char}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    // Additional text styles can be applied here
  },
});

export default ColoredText;
