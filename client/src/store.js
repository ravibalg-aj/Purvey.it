import { createStore, combineReducers, applyMiddleware } from "redux";
import { merchant } from "./reducers/merchant-reducer";
import {customer} from "./reducers/customer-reducer";

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = { merchant , customer};

const rootReducer = combineReducers(reducers);


export const configureStore = () =>
  createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
