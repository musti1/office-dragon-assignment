import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import companyReducer from "./CompanyReducer";
import companyListReducer from "./CompanyList";

export default combineReducers({
  auth: authReducer,
  company: companyReducer,
  companyList: companyListReducer,
});
