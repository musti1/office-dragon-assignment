import {
  COMPANY_RESPONSE,
  COMPANY_REQUEST,
  COMPANY_FAILURE,
  COMPANY_RESET_DATA,
  COMPANY_SET_DATA
} from "../Constant/Company";

const initialState = {
  currentCompanyId: null,
  company: {},
  isLoading: true,
  hasError: false,
  errorMessage: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        errorMessage: ""
      };

    case COMPANY_RESPONSE:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        errorMessage: ""
      };

    case COMPANY_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload.errorMessage
      };

    case COMPANY_SET_DATA:
      return {
        ...state,
        company: action.payload.companyData,
        currentCompanyId: action.payload.companyId,
        isLoading: false,
        hasError: false,
        errorMessage: ""
      };

    case COMPANY_RESET_DATA:
      return initialState;

    default:
      return state;
  }
};
