import * as actionTypes from './actionTypes';

export const setIntituteUserData = (obj) => {
    return {
        type: actionTypes.INSTITUTE_USER_DATA,
        payload: obj
    }
}
export const clearTheStoreOnLogout = (obj) => {
    return {
        type: actionTypes.CLEAR_STORE,
        payload: obj
    }
}
export const instituteURL = (obj) => {
    return {
        type: actionTypes.INSTITUTE_URL,
        payload: obj
    }
}