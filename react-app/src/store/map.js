import { csrfFetch } from "./csrf";

const MAP_RESULTS = "maps/MAP_RESULTS";

const getMapResults = (results) => ({
  type: MAP_RESULTS,
  results,
});

// const LOAD_API_KEY = "/maps/LOAD_API_KEY";

// const loadApiKey = (key) => {
//   return {
//     type: LOAD_API_KEY,
//     key,
//   };
// };

// export const getKey = () => async (dispatch) => {
//   const response = await csrfFetch(`/api/maps/key`, {
//     method: "POST",
//   });

//   const data = await response.json();
//   console.log(data, "DATA");
//   dispatch(loadApiKey(data.REACT_APP_GOOGLE_MAPS_API));
// };

const initialState = {};
const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOAD_API_KEY:
    //   return { key: action.key };
    default:
      return state;
  }
};

export default mapsReducer;
