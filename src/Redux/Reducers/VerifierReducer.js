import { VERRIFIER_USER_DATA, CLEAR_STORE, SELECTED_INSTITUTE_NAME, SELECTED_INSTITUTE_NAME_REQUEST_FORM } from '../Actions/actionTypes';

const initialState = {
    LoginData: [],
    changedInstituteName: "",
    changedInstituteNameRequestForm: ""
}

export default function (state = initialState, action) {
    switch (action.type) {

        case VERRIFIER_USER_DATA:
            return {
                ...state, LoginData: action.payload
            }
        case SELECTED_INSTITUTE_NAME:
            return {
                ...state, changedInstituteName: action.payload
            }
        case SELECTED_INSTITUTE_NAME_REQUEST_FORM:
            return {
                ...state, changedInstituteNameRequestForm: action.payload
            }
        case CLEAR_STORE:
            return {
                initialState
            }
        default:
            return state;
    }
}