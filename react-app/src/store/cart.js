import { csrfFetch } from "./csrf";

const GET_CART = "cart/GET_CART";
const ADD_CART_ITEM = "cart/ADD_CART_ITEM";
const DELETE_CART_ITEM = "cart/DELETE_CART_ITEM";
const CREATE_CART = "cart/CREATE_CART";
const CLEAR_CART = "cart/CLEAR_CART";
const DELETE_CART = "cart/DELETE_CART";
const MY_CART = "cart/MY_CART";

const getCart = (cart) => ({
  type: GET_CART,
  cart,
});

const fetchMyCart = (cart) => ({
  type: GET_CART,
  cart,
});

const cartItem = (item) => ({
  type: ADD_CART_ITEM,
  item,
});

const delCartItem = (item) => ({
  type: DELETE_CART_ITEM,
  item,
});

// const makeCart = (cart) => ({
//   type: CREATE_CART,
//   cart,
// });

const delCart = (cart) => ({
  type: CLEAR_CART,
  cart,
});

export const fetchCart = (cartId) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart/${cartId}/items/`);
  const { cart_items } = await res.json();
  // console.log(cart_items, "CARTS");

  if (res.ok) {
    const data = {};
    cart_items.forEach((item) => (data[item.id] = item));

    dispatch(getCart(data));
    return res;
  }
};

export const addCartItem =
  ({ item_id, cart_id }) =>
  async (dispatch) => {
    // console.log({ item_id }, "ITEMID@@!#");
    const res = await csrfFetch(`/api/cart/${cart_id}/items/${item_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id, cart_id }),
    });
    if (res.ok) {
      const newCartItem = await res.json();
      // console.log(newCartItem, "RHEARASrWRWQ");
      dispatch(cartItem(newCartItem));
    }
  };

export const removeCartItem =
  ({ item_id, cart_id }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${cart_id}/items/${item_id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      const itemToDelete = await res.json();
      // console.log(itemToDelete, "ADHSAODSHERE");
      // dispatch(delCartItem({ item_id, cart_id }));
      dispatch(delCartItem(itemToDelete));
    }
    return res;
  };

export const myCartThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/cart/${id}/`);
  if (res.ok) {
    const data = await res.json();
    dispatch(fetchMyCart(data));
  }
};

// export const createCart = () => async (dispatch) => {
//   const res = await csrfFetch(`/api/cart/`, {
//     method: "POST",
//   });
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(makeCart(data));
//   }
// };

export const cartClear =
  ({ cart_id }) =>
  async (dispatch) => {
    const res = await fetch(`/api/cart/${cart_id}/items`, {
      method: "DELETE",
    });
    if (res.ok) {
      dispatch(delCart(cart_id));
    }
  };
// export const cartClear = () => async (dispatch) => {
//   const res = await csrfFetch(`api/cart/`, method: {"DELETE"})
//   dispatch(delCartItems());
// };

const inititalState = {};
const cartReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_CART:
      // newState = { ...action.cart };
      // return newState;
      // console.log(action.cart, "AHUDSADWQDSAD");
      return { ...action.cart };

    case MY_CART:
      return { ...action.cart };

    case ADD_CART_ITEM:
      // console.log(action.item, "action");
      // console.log(newState[action.item.id], "item");
      // console.log(newState, "newSTate");
      // console.log({ ...state }, "state");
      // newState = { ...state, [action.item.cart_id]: action.item };
      // return newState;
      return { ...state, [action.item.id]: action.item };

    case DELETE_CART_ITEM:
      // console.log(action.item, "action");
      // console.log(newState[action.item.id], "item");
      // console.log(newState, "newSTate");

      // delete newState[action.item.id];
      return { ...state, ...action.item };

    // case CREATE_CART:
    //   return action.payload;

    case CLEAR_CART:
      return {};
    // case DELETE_CART:
    //   return null;

    default:
      return state;
  }
};

export default cartReducer;
