import { csrfFetch } from "./csrf";

const GET_REVIEW = "review/GET_REVIEW";
const ADD_REVIEW = "review/ADD_REVIEW";
const EDIT_REVIEW = "review/EDIT_REVIEW";
const MY_REVIEWS = "review/MY_REVIEWS";
const DELETE_REVIEW = "reviews/DELETE_COMMENT";

const getReviews = (reviews) => ({
  type: GET_REVIEW,
  reviews,
});

const myReviews = (reviews) => ({
  type: MY_REVIEWS,
  reviews,
});

const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review,
});

const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review,
});

export const getAllReviewThunk = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/items/${Number(id)}/reviews`);
  const { reviews } = await res.json();

  if (res.ok) {
    const data = {};
    reviews.forEach((review) => (data[review.id] = review));
    dispatch(getReviews(data));
  }
};

// export const getMyReviews = () => async (dispatch) => {
//   const res = await csrfFetch(`/api/user/reviews`)
//   const {reviews} = await res.json()

//   if (res.ok) {
//     const data = {}
//     reviews.forEach((review) => data[review.id] = review);
//     dispatch(myReviews(data))
//   }
// }

export const addReviewThunk = (review) => async (dispatch) => {
  const { itemId } = review;
  // console.log(id, 'ID')
  // console.log(itemId, "ID");
  const res = await csrfFetch(`/api/items/${parseInt(itemId)}/reviews/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const newReview = await res.json();
    // console.log(newReview, "HRER");
    dispatch(addReview(newReview));
    return res;
  }
  return res;
};

export const editReviewThunk = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${Number(review?.id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  if (res.ok) {
    const editedReview = await res.json();
    dispatch(editReview(editedReview));
  }
  return res;
};

export const deleteReviewThunk = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review?.id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteReview(review));
    return res;
  }
};

const inititalState = {};
const reviewReducer = (state = inititalState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_REVIEW:
      newState = { ...state, ...action.reviews };
      return newState;

    case MY_REVIEWS:
      newState = { ...action.reviews };
      return newState;

    case ADD_REVIEW:
      newState = { ...state, [action.review.id]: action.review };
      return newState;

    case EDIT_REVIEW:
      newState = { ...state, [action.review.id]: action.review };
      return newState;

    case DELETE_REVIEW:
      delete newState[action.review.id];
      return newState;

    default:
      return state;
  }
};

export default reviewReducer;
