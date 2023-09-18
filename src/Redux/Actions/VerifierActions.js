import * as actionTypes from './actionTypes';

export const setVerifierUserData = (obj) => {
    return {
        type: actionTypes.VERRIFIER_USER_DATA,
        payload: obj
    }
}
export const clearTheStoreOnLogout = (obj) => {
    return {
        type: actionTypes.CLEAR_STORE,
        payload: obj
    }
}
export const changeNameForInstitute = (obj) => {
    return {
        type: actionTypes.SELECTED_INSTITUTE_NAME,
        payload: obj
    }
}
export const changeNameForInstituteRequestForm = (obj) => {
    return {
        type: actionTypes.SELECTED_INSTITUTE_NAME_REQUEST_FORM,
        payload: obj
    }
}