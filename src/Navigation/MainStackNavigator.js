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
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
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
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
