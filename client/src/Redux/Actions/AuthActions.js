import authConstants from "../Constant/Auth";
import authServices from "../../Services/AuthServices";

/**
 * Register Actions
 */

export const registerRequest = data => {
  return {
    type: authConstants.REGISTER_REQUEST,
    payload: data
  };
};

export const registerSuccess = data => {
  return {
    type: authConstants.REGISTER_SUCCESS,
    payload: data
  };
};

export const registerFailure = error => {
  return {
    type: authConstants.REGISTER_FAILURE,
    payload: error
  };
};

/**
 * Login Actions
 */

export const loginRequest = () => {
  return {
    type: authConstants.LOGIN_REQUEST
  };
};

export const loginSuccess = data => {
  return {
    type: authConstants.LOGIN_SUCCESS,
    payload: data
  };
};

export const loginFailure = error => {
  return {
    type: authConstants.LOGIN_FAILURE,
    payload: error
  };
};

/**
 * Logout Action
 */

export const logout = () => {
  return { type: authConstants.LOGOUT };
};

/**
 * Register Method
 */
export const registerUser = data => {
  return async dispatch => {
    try {
      dispatch(registerRequest(data));
      const res = await authServices.registerUser(data);
      if (res.error) {
        dispatch(registerFailure(res.error));
      } else {
        dispatch(registerSuccess(res));
      }
    } catch (e) {
      throw new Error(e);
    }
  };
};

/**
 * Login Method
 */
export const login = data => {
  return async dispatch => {
    try {
      dispatch(loginRequest(data));
      const res = await authServices.loginUser(data);
      if (res.error) {
        dispatch(loginFailure(res.error));
      } else {
        dispatch(loginSuccess(res.token));
      }
    } catch (e) {
      throw new Error(e);
    }
  };
};

/**
 * Logout Method
 */

export const logoutUser = () => dispatch => {
  authServices.logoutUser();
  dispatch(logout());
};
