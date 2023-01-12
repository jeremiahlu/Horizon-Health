// import { Add } from "@mui/icons-material";
// import { csrfFetch } from "./csrf";

// const GET_CART = "item/GET_CART";
// const ADD_CART_ITEM = "item/ADD_CART_ITEM";
// const DELETE_CART_ITEM = "item/DELETE_CART_ITEM";

// const getCart = (cart) => ({
//   type: GET_CART,
//   cart,
// });

// const cartItem = (item) => ({
//   type: ADD_CART_ITEM,
//   item,
// });

// const delCartItem = (item) => ({
//   type: DELETE_CART_ITEM,
//   item,
// });

// export const fetchCart = () => async (dispatch) => {
//   const res = await csrfFetch(`/api/cart/`);
//   const { cart } = await res.json();

//   if (res.ok) {
//     const data = {};
//     cart.forEach((item) => (data[item.id] = item));

//     dispatch(getCart(data));
//     return res;
//   }
// };

// export const addCartItem = (item) => async (dispatch) => {
//   const res = await csrfFetch(`/api/cart/`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(item),
//   });
//   if (res.ok) {
//     const newCartItem = await res.json();
//     dispatch(cartItem(newCartItem));
//   }
// };

// export const removeCartItem = (item) => async (dispatch) => {
//   const res = await csrfFetch(`/api/cart/`, {
//     method: "DELETE",
//   });
//   if (res.ok) {
//     dispatch(delCartItem(item));
//     return res;
//   }
// };

// const inititalState = {};
// const cartItemReducer = (state = inititalState, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case GET_CART:
//       newState = { ...action.cartItem };
//       return newState;

//     case ADD_CART_ITEM:
//       newState = { ...state, [action.cartItem]: action.cartItem };
//       return newState;

//     case DELETE_CART_ITEM:
//       delete newState[action.cartItem];
//       return newState;

//     default:
//       return state;
//   }
// };

// export default cartItemReducer;
