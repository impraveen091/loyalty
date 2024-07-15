import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './src/redux/reducer';
import MainStackNavigator from './src/Navigation/MainStackNavigator';
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
