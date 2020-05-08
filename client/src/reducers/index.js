import { combineReducers } from "redux";
import merchant from './merchant-reducer'
import customer from './customer-reducer'
export default combineReducers({
  merchant: merchant,
  customer: customer,
});