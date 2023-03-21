import { csrfFetch } from "./csrf";

const ALL_ORDERS = "orders/ALL_ORDERS";
const MY_ORDERS = "orders/MY_ORDERS";

const fetchOrders = (orders) => {
  return {
    type: ALL_ORDERS,
    orders,
  };
};

// const myReviews = (reviews) => ({
//   type: MY_REVIEWS,
//   reviews,
// });

export const myOrders = (user_id) => async (dispatch) => {
  const res = await csrfFetch(`api/users/${user_id}/orders/`);
  const { orders } = await res.json();

  if (res.ok) {
    const data = {};
    orders.forEach((order) => (data[order.id] = order));
    dispatch(fetchOrders(data));
  }
};

const inititalState = {};
const orderReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ALL_ORDERS:
      newState = { ...action.orders };
      return newState;

    // case MY_ORDERS:
    //   newState = { ...action.reviews };
    //   return newState;

    default:
      return state;
  }
};

export default orderReducer;
