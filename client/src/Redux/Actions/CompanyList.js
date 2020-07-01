import {REQUEST_COMPANIES, RECEIVE_COMPANIES, INVALIDATE_LIST} from "../Constant/CompanyList";
import CompanyService from "../../Services/CompanyService";

export const receive = (companyResp) => {
    return {
        type: RECEIVE_COMPANIES,
        payload: companyResp
    }
};

export const request = () => {
    return {
        type: REQUEST_COMPANIES
    }
};

export const invalidateList = () => {
    return {
        type: INVALIDATE_LIST
    }
};

export const loadCompanyList = (searchParam = '', pageNo = 1) => {
    return async (dispatch) => {
        try {
            console.log(searchParam)
            dispatch(request());
            const companyResp = await CompanyService.getAll(searchParam, pageNo);
            dispatch(receive(companyResp));

        } catch (e) {
            dispatch(invalidateList());
        }
    };
};
