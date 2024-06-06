// response through data malta hoy ane jene dispatch ma set karayu hoy a payload ma baki je initial state ma ane 
// set karati vakhte je type sathe je key define kari hoy a varible name lakjvannu action. je dispatch ma lakhyu hoy a

import { legacy_createStore as createStore } from 'redux'
import * as actionTypes from './action';

export const initialState = {
    sidebarShow: true,
    theme: 'light',
    token: '',
    userData: {},
    snackbar: {
        title: '',
        message: '',
        status: '',
        isOpen: false
    },
    paperPopup: false
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
        // show view paper in exam list
        case actionTypes.SET_VIEW_PAPER:
            return {
                ...state,
                paperPopup: action.paperPopup
            };
        // user reducer
        case actionTypes.SET_USER_LOGIN_TOKEN:
            localStorage.setItem('authorization', action.payload);
            localStorage.setItem('isLogin', true);
            return {
                ...state,
                token: action.payload
            };
        case actionTypes.SET_USER_LOGIN_DATA:
            localStorage.setItem('userData', action.payload);
            return {
                ...state,
                userData: action.payload
            };
        case actionTypes.SET_USER_LOGOUT_DATA:
            localStorage.removeItem('authorization');
            localStorage.removeItem('userData');
            localStorage.setItem('isLogin', false);
            return initialState;
        default:
            return state
    }
}

const store = createStore(changeState)
export default store
