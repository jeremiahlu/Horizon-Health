import { csrfFetch } from "./csrf";

const GET_CART = "item/GET_CART";

const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

export const fetchCart = () => async (dispatch) => {
  const res = await csrfFetch(`/api/cart/`);
  const { cart } = await res.json();
  // console.log(cart, "here");

  if (res.ok) {
    const data = {};
    for (let key in cart) {
      data[key] = cart[key];
    }
    dispatch(getCart(data));
  }
  return res;
};

const inititalState = {};
const cartReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_CART:
      newState = { ...state, ...action.cart };
      return newState;

    default:
      return state;
  }
};

export default cartReducer;
