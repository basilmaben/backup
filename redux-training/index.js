const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux action",
  };
}
function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "First Redux action",
  };
}

// (prevstate, action) => newState

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

const CakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //spread operator
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};
//seperate reducers
const IceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state, //spread operator
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};
//combining two reducers into one
const rootReducer = combineReducers({
  cake: CakeReducer,
  iceCream: IceCreamReducer,
});
//reducer controls how the state transitions
const store = createStore(rootReducer, applyMiddleware(logger)); //holding app state //first creation of store /10
console.log("initialState", store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake()); //first action dispatch, checks if action type is buy, decrements by 1
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream()); //first action dispatch, checks if action type is buy, decrements by 1
store.dispatch(buyIceCream());
unsubscribe();
