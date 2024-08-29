import {useEffect, useState} from 'react';
import Redeem from '../screens/Redeem';
import Dashboard from '../screens/Dashboard';
import PromotionalOffers from '../screens/PromotionalOffers';
import {createStackNavigator} from '@react-navigation/stack';
import Refer from '../screens/Refer';
import PurchaseReceipt from '../screens/PurchaseReceipt';
import Transactions from '../screens/Transactions';
import Catalog from '../screens/Catalog';
import Bank from '../screens/Bank';
import Products from '../screens/Products';
import Scan from '../screens/Scan';
import OfferDetails from '../screens/OfferDetails';
import Termsofuse from '../screens/StaticPages/Termsofuse';
import Privacypolicy from '../screens/StaticPages/Privacypolicy';
import Contactus from '../screens/StaticPages/Contactus';
import Notifications from '../screens/Notifications';
import HelpSupport from '../screens/HelpSupport';
import Signin from '../screens/Signin';
import Otp from '../screens/Otp';
import Profile from '../screens/Profile';
import Aboutus from '../screens/StaticPages/Aboutus';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../Drawer/CustomDrawerContent';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Bell from '../components/Assets/svg/bell.svg';
import Signup from '../screens/Signup';
import AddBankDetails from '../screens/AddBankDetails';
import Cart from '../screens/Cart';
import {getToken, getUserData} from '../Auth/Auth';
import RedeemStatus from '../screens/RedeemStatus';
import {defaultImage, moderateScale} from '../constants/Constants';
import axiosInstance from '../Auth/AxiosInstance';
import ProductDetails from '../screens/ProductDetails';
import Splash from '../screens/Splash';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardDrawerNavigator = ({navigation}) => {
  const [logoImage, setLogoImage] = useState(defaultImage);
  const [kycStatus, setKycStatus] = useState(0);

  const fetchImagesAndKyc = async () => {
    try {
      const images = await getUserData('images');
      console.log('img1', images.logo);
      setLogoImage(images.logo ? images.logo : defaultImage);
    } catch (error) {
      console.error('Failed to fetch images', error);
      setLogoImage(defaultImage);
    }

    try {
      const urlkyc = 'app-user/get/kyc-details';
      const result = await axiosInstance.get(urlkyc);
      console.log('KYC:', result.data);
      if (result.data.success === 'success') {
        console.log('Setting KYC Status to:', result.data.data.status);
        setKycStatus(result.data.data.status);
      }
    } catch (error) {
      console.log('Get request failed:', error.response.data.message);
      if (error.response.data.message === 'Kyc data not found.') {
        setKycStatus(2);
      }
    }
  };

  useEffect(() => {
    fetchImagesAndKyc();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => (
        <CustomDrawerContent {...props} kycStatus={kycStatus} />
      )}
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Bell style={{width: 15, height: 15, marginHorizontal: 10}} />
          </TouchableOpacity>
        ),
        headerTitle: () => (
          <Image
            source={{uri: logoImage}}
            style={{
              width: moderateScale(140),
              height: moderateScale(20),
              marginLeft: moderateScale(-20),
            }}
            resizeMode="contain"
          />
        ),
      }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="DashboardDrawer"
        component={DashboardDrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Otp" component={Otp} options={{headerShown: false}} />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PromotionalOffers"
        component={PromotionalOffers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Redeem"
        component={Redeem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bank"
        component={Bank}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Catalog"
        component={Catalog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Refer"
        component={Refer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PurchaseReceipt"
        component={PurchaseReceipt}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Scan"
        component={Scan}
        // options={{headerShown: false}}
      />
      <Stack.Screen
        name="OfferDetails"
        component={OfferDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Termsofuse"
        component={Termsofuse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Privacypolicy"
        component={Privacypolicy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contactus"
        component={Contactus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Aboutus"
        component={Aboutus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HelpSupport"
        component={HelpSupport}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddBankDetails"
        component={AddBankDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RedeemStatus"
        component={RedeemStatus}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainStackNavigator;
