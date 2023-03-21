import { csrfFetch } from "./csrf";

const GET_SAVED = "save/GET_SAVED";
const ADD_TO_SAVED = "save/ADD_TO_SAVE";
const REMOVE_FROM_SAVED = "save/REMOVE_FROM_SAVE";

const getSaved = (user_id) => ({
  type: GET_SAVED,
  user_id,
});

const addToSaved = (marker) => ({
  type: ADD_TO_SAVED,
  payload: {
    marker,
  },
});

const removeFromSaved = (result) => ({
  type: REMOVE_FROM_SAVED,
  result,
});

export const fetchSaved = (user_id) => async (dispatch) => {
  const res = await csrfFetch(`/api/user/${user_id}/saved/`);
  const { saved } = await res.json();

  if (res.ok) {
    const data = {};
    saved.forEach((save) => (data[save.id] = save));

    dispatch(getSaved(data));
    return res;
  }
};

// export const addSave =
//   (user_id, { marker }) =>
//   async (dispatch) => {
//     console.log(user_id.userId, "USERID");
//     console.log(user_id.marker, "marker");
//     console.log(user_id, marker, "JSON");
//     const res = await csrfFetch(`/api/user/${user_id.userId}/saved/`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       // body: JSON.stringify({ user_id, marker }),
//       // body: JSON.stringify({ userId: user_id.userId, marker: user_id.marker }),
//       body: JSON.stringify({
//         user_id: user_id.userId,
//         marker: JSON.stringify({ title: user_id.marker }),
//       }),
//     });
//     if (res.ok) {
//       const newSave = await res.json();
//       dispatch(addToSaved(newSave));
//     }
//   };
export const addSave = (user_id, marker) => async (dispatch) => {
  console.log(user_id.userId, "USERID");
  console.log(user_id.marker, "marker");
  // console.log({ user_id, marker }, "JSON");
  const res = await csrfFetch(`/api/user/${user_id.userId}/saved/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ user_id, marker }),
    // body: JSON.stringify({ userId: user_id.userId, marker: user_id.marker }),
    body: JSON.stringify({
      user_id: user_id.userId,
      marker: user_id.marker,
      // marker: JSON.stringify({ title: user_id.marker }),
    }),
  });
  if (res.ok) {
    const newSave = await res.json();
    dispatch(addToSaved(newSave));
  }
};

export const removeSave =
  ({ user_id, save_id }) =>
  async (dispatch) => {
    const res = await csrfFetch(`/api/user/${user_id}/saved/${save_id}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      const resultToDelete = await res.json();
      dispatch(removeFromSaved(resultToDelete));
    }
    return res;
  };

const inititalState = {};
const savedReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_SAVED:
      return { ...action.saved };

    case ADD_TO_SAVED:
      return {
        ...state,
        [action.marker.id]: action.payload,
        // ...action.payload,
      };

    case REMOVE_FROM_SAVED:
      return { ...state, ...action.result };
    // return {
    //   ...state,
    //   saved: state.saved.filter((res) => res.id !== action.result.id),
    // };
    default:
      return state;
  }
};

export default savedReducer;
