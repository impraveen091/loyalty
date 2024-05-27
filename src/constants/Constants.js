import {Dimensions, Platform} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

// src/constants.js

// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Device Dimensions
const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

// Responsive function for scaling
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Colors
export const COLORS = {
  primary: '#3498db', // Blue
  secondary: '#2ecc71', // Green
  accent: '#e74c3c', // Red
  background: '#ecf0f1', // Light gray
  text: '#2c3e50', // Dark gray
  white: '#ffffff',
  black: '#000000',
};

// Font Sizes
export const FONT_SIZES = {
  small: moderateScale(12),
  medium: moderateScale(16),
  large: moderateScale(20),
  xLarge: moderateScale(24),
};

// Spacing
export const SPACING = {
  small: moderateScale(8),
  medium: moderateScale(16),
  large: moderateScale(24),
  xLarge: moderateScale(32),
};

// Device Dimensions
export const DEVICE_DIMENSIONS = {
  width,
  height,
  // wp,
  // hp,
};

// Platform-specific constants
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

// Example usage of constants in styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.medium,
  },
  text: {
    color: COLORS.text,
    fontSize: FONT_SIZES.medium,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.small,
    borderRadius: 5,
  },
  // Example usage of verticalScale
  header: {
    height: verticalScale(50),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.white,
  },
  icon: {
    width: scale(24),
    height: verticalScale(24),
  },
};
