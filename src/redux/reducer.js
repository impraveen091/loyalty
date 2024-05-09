import {combineReducers} from 'redux';

// Define your reducers here
// For example, a reducer for loyalty points
const loyaltyReducer = (state = {points: 0}, action) => {
  switch (action.type) {
    case 'ADD_POINTS':
      return {...state, points: state.points + action.payload};
    // Add other cases as needed
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  loyalty: loyaltyReducer,
  // Add other reducers here
});

export default rootReducer;
