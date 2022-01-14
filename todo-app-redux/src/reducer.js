import { combineReducers } from "redux";
import * as globalReducers from "./ducks"; //impoorting all the reducers

const appReducer = combineReducers({ ...globalReducers }); ///just combining all the reducers
//global reducers is imported for all the reducers available

export default appReducer;
