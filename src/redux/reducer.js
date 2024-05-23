import {combineReducers} from 'redux';
import {ADD_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY} from './actions';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const existingItem = state.cart.find(
        cartItem => cartItem?.id === item.id,
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(cartItem =>
            cartItem?.id === item.id
              ? {...cartItem, quantity: cartItem.quantity + 1}
              : cartItem,
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, {...item, quantity: 1}],
        };
      }

    case INCREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(cartItem => {
          console.log('payload', cartItem);
          if (cartItem?.id === action.payload) {
            return {...cartItem, quantity: cartItem?.quantity + 1};
          } else {
            return cartItem;
          }
        }),
      };

    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart
          .map(cartItem =>
            cartItem?.id === action.payload
              ? {...cartItem, quantity: cartItem?.quantity - 1}
              : cartItem,
          )
          .filter(cartItem => cartItem?.quantity > 0),
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
