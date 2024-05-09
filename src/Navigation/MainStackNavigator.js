import AccountScreen from '../screens/AccountScreen';
import Dashboard from '../screens/Dashboard';
import RewardsScreen from '../screens/RewardScreen';
import {createStackNavigator} from '@react-navigation/stack';
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
        name="Rewards"
        component={RewardsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
