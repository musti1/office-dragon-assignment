import {
  COMPANY_FAILURE,
  COMPANY_REQUEST,
  COMPANY_RESET_DATA,
  COMPANY_RESPONSE,
  COMPANY_SET_DATA
} from "../Constant/Company";
import CompanyService from "../../Services/CompanyService";

//company form
export const enterCreateMode = () => {
  return {
    type: COMPANY_SET_DATA,
    payload: { companyId: null, companyData: {} }
  };
};

export const enterEditMode = (companyId) => async dispatch => {
  try {
    const companyData = await CompanyService.getCompany(
      companyId
    );
    dispatch(setCompanyData( companyId, companyData));
  } catch {
    dispatch(companyRequestFailed("Could not find company in the system"));
  }
};

export const setCompanyData = (companyId, companyData) => {
  return {
    type: COMPANY_SET_DATA,
    payload: { companyId, companyData }
  };
};

export const companyFormReset = payload => {
  return { type: COMPANY_RESET_DATA, payload };
};

export const companyRequest = () => {
  return { type: COMPANY_REQUEST };
};

export const companyResponse = payload => {
  return { type: COMPANY_RESPONSE, payload };
};

export const companyRequestFailed = errorMessage => {
  return { type: COMPANY_FAILURE, payload: errorMessage };
};

export const createCompany = (data) => async dispatch => {
  try {
    dispatch(setCompanyData( null, data));
    dispatch(companyRequest());
    const result = await CompanyService.create(data);
    if (result.status === 201) {
      dispatch(companyResponse());
    }
  } catch (error) {
    dispatch(companyRequestFailed("Failed to create company"));
  }
};

export const updateCompany = (companyId, data) => {
  return async dispatch => {
    try {
      dispatch(companyRequest());
      const result = await CompanyService.updateCompany(
        companyId,
        data
      );
      if (result.status === 200) {
        dispatch(companyResponse());
      }
    } catch (error) {
      dispatch(companyRequestFailed("Failed to update company"));
    }
  };
};
