import AccountScreen from '../screens/AccountScreen';
import Dashboard from '../screens/Dashboard';
import RewardsScreen from '../screens/RewardScreen';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Rewards" component={RewardsScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
