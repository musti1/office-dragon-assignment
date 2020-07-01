import authConstants from "../Constant/Auth";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isRegister: false,
  token: null,
  error: null
};

const authReducer = (state = initialState, action) => {
  if (typeof state === "undefined") {
    return initialState;
  }
  switch (action.type) {
    case authConstants.REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case authConstants.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRegister: true,
        error: null
      };
    case authConstants.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.payload
      };
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: true,
        token: action.payload
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case authConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
export default authReducer;
