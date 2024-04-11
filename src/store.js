import { legacy_createStore as createStore } from 'redux'
import * as actionTypes from './action';

export const initialState = {
    sidebarShow: true,
    theme: 'light',
    snackbar: {
        title: '',
        message: '',
        status: '',
        isOpen: false
    },
}

const changeState = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SIDEBAR:
            return {
                ...state,
                sidebarShow: action.sidebarShow
            };
        case actionTypes.SET_NOTIFICATION:
            return {
                ...state,
                snackbar: action.payload
            };
        default:
            return state
    }
}

const store = createStore(changeState)
export default store
