export const ADD_TO_CART = 'ADD_TO_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';

export const addToCart = (item, quantity) => {
  return {
    type: quantity > 0 ? 'ADD_TO_CART' : 'REMOVE_FROM_CART',
    payload: {
      item,
      quantity,
    },
  };
};
export const increaseQuantity = id => ({
  type: INCREASE_QUANTITY,
  payload: id,
});

export const decreaseQuantity = id => ({
  type: DECREASE_QUANTITY,
  payload: id,
});
