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
import Logo from '../components/Assets/Images/logo.png';
import {Image, TouchableOpacity} from 'react-native';
import Bell from '../components/Assets/svg/bell.svg';
import Signup from '../screens/Signup';
import AddBankDetails from '../screens/AddBankDetails';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DashboardDrawerNavigator = ({navigation}) => (
  <Drawer.Navigator
    initialRouteName="Dashboard"
    drawerContent={props => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Bell style={{width: 15, height: 15, marginHorizontal: 10}} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <Image source={Logo} style={{width: 150, resizeMode: 'contain'}} />
      ),
    }}>
    <Drawer.Screen name="Dashboard" component={Dashboard} />
  </Drawer.Navigator>
);

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        name="DashboardDrawer"
        component={DashboardDrawerNavigator}
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
        options={{headerShown: false}}
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
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
