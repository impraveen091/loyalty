import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const Dashboard = ({navigation}) => {
  const points = useSelector(state => state.loyalty.points);
  const dispatch = useDispatch();

  const handleAddPoints = () => {
    dispatch({type: 'ADD_POINTS', payload: 10}); // Example action to add points
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Loyalty Points: {points}</Text>
      <Button title="Add Points" onPress={handleAddPoints} />
      <Button
        title="View Rewards"
        onPress={() => navigation.navigate('Rewards')}
      />
      <Button
        title="View Account"
        onPress={() => navigation.navigate('Account')}
      />
    </View>
  );
};

export default Dashboard;
