import {
  REQUEST_COMPANIES,
  RECEIVE_COMPANIES,
  INVALIDATE_LIST
} from "../Constant/CompanyList";

const initialState = {
  filters: {
    searchTerm: ""
  },
  companyData: [],
  isLoading: false
};

const companyListReducer = (state = initialState, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }
  switch (action.type) {
    case REQUEST_COMPANIES:
      return {
        ...state,
        isLoading: true
      };
    case RECEIVE_COMPANIES:
      return {
        ...state,
        companyData: action.payload,
        isLoading: false
      };
    case INVALIDATE_LIST:
      return initialState;
    default:
      return state;
  }
};

export default companyListReducer;
