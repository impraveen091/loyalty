import {combineReducers} from 'redux';
import {ADD_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY} from './actions';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.cart.findIndex(
        cartItem => cartItem.id === action.payload.item.id,
      );

      if (existingProductIndex >= 0) {
        const updatedCart = state.cart.map((cartItem, index) =>
          index === existingProductIndex
            ? {...cartItem, quantity: action.payload.quantity}
            : cartItem,
        );
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            {...action.payload.item, quantity: action.payload.quantity},
          ],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(
          cartItem => cartItem.id !== action.payload.item.id,
        ),
      };

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
