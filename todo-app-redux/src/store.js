import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import appReducer from "./reducer";

const dev =
  !process.env.REACT_APP_ENV || process.env.REACT_APP_ENV === "development";

const configureStore = (initialState, firebase) => {
  const middlewares = [thunk.withExtraArgument(firebase)]; //access firebase for dispatch

  const composeEnhancers =
    dev &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose; ///checking if its in development  to use redux dev tools

  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  return createStore(appReducer, initialState, enhancer); // to keep store running
};

export default configureStore;
