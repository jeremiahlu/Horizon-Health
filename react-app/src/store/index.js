import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import reviewReducer from "./review";
import itemReducer from "./item";
import cartReducer from "./cart";
import cartItemReducer from "./cartItem";
import mapsReducer from "./map";
import savedReduer from "./saved";
import orderReducer from "./order";

const rootReducer = combineReducers({
  session,
  reviews: reviewReducer,
  items: itemReducer,
  cart: cartReducer,
  cartItem: cartItemReducer,
  map: mapsReducer,
  saved: savedReduer,
  orders: orderReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
