import { csrfFetch } from "./csrf";

const GET_ITEMS = "item/GET_ITEMS";
const GET_ITEM_BY_ID = "item/GET_ITEM_BY_ID";

const getAllItems = (items) => ({
  type: GET_ITEMS,
  items,
});

const getItem = (item) => ({
  type: GET_ITEM_BY_ID,
  item,
});

export const getItemsThunk = () => async (dispatch) => {
  const res = await csrfFetch(`/api/items/
  `);
  const { items } = await res.json();

  if (res.ok) {
    const data = {};
    items.forEach((item) =>  data[item.id] = item) 
    dispatch(getAllItems(data));
  }
  return res;
};

export const getItemById = (id) => async (dispatch) => {

  const res = await csrfFetch(`/api/items/${Number(id.id)}`);

  const { item } = await res.json();

  if (res.ok) {
    dispatch(getItem(item));
  }
  return res;
};

const inititalState = {};
const itemReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ITEMS:
      newState = { ...state, ...action.items };
      return newState;

    default:
      return state;
  }
};

export default itemReducer;
