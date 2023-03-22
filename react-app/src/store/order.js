import { csrfFetch } from "./csrf";

const ALL_ORDERS = "orders/ALL_ORDERS";
const MY_ORDERS = "orders/MY_ORDERS";

const fetchOrders = (payload) => {
  return {
    type: ALL_ORDERS,
    payload,
  };
};

// const myReviews = (reviews) => ({
//   type: MY_REVIEWS,
//   reviews,
// });

export const myOrders = (user_id) => async (dispatch) => {
  const data = {};
  const res = await csrfFetch(`api/users/${user_id}/orders/`);
  const { orders, cart_items } = await res.json();
  console.log(orders, "hit");
  if (res.ok) {
    // const data = {};
    const newData = {
      orders: [],
      cart_items: {},
    };

    orders.forEach((order, idx) => (newData.orders[idx] = order));

    cart_items.forEach(
      (cart_item) => (newData["cart_items"][cart_item.id] = cart_item)
    );
    // dispatch(fetchOrders(newData));
    dispatch(fetchOrders(newData));
    // dispatch(fetchMyOrder(orders));
    // dispatch(setOrders(newData));
  }
  return res;
};

// const fetchMyOrder = (orders) => async (dispatch) => {
//   const data = {};
//   for (const order of orders) {
//     const res = await csrfFetch(`api/users/${user.id}/orders/${order.id}`);
//     if (res.ok) {
//       const cartItems = await res.json();
//       data[order.id] = { ...order, cartItems };
//     } else {
//       data[order.id] = order;
//     }
//   }
//   dispatch(setOrders(data));
// };

const inititalState = {};
const orderReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ALL_ORDERS:
      newState = { ...state, ...action.payload };
      return newState;

    // case MY_ORDERS:
    //   newState = { ...action.reviews };
    //   return newState;

    default:
      return state;
  }
};

export default orderReducer;
