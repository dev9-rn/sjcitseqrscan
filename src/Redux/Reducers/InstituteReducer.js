import { INSTITUTE_USER_DATA, CLEAR_STORE, INSTITUTE_URL } from '../Actions/actionTypes';

const initialState = {
    LoginData: [],
    URL: ''
}

export default function (state = initialState, action) {
    switch (action.type) {

        case INSTITUTE_USER_DATA:
            return {
                ...state, LoginData: action.payload
            }

        // case INSTITUTE_URL:
        //     console.log("-==-=-=");
        //     console.log(action.payload);

        //     return {
        //         ...state, URL: action.payload
        //     }

        case CLEAR_STORE:
            return {
                initialState
            }
        default:
            return state;
    }
}