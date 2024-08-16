import * as actionTypes from './action'


export const initialState = {
    sidebarShow: true,
    theme: 'light',
    snackbar: {
        title: '',
        message: '',
        status: '',
        isOpen: false,
    },
    paperPopup: false,
}


const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SIDEBAR:
            return {
                ...state,
                sidebarShow: action.sidebarShow,
            }
        case actionTypes.SET_NOTIFICATION:
            return {
                ...state,
                snackbar: action.payload,
            }
        // show view paper in exam list
        case actionTypes.SET_VIEW_PAPER:
            return {
                ...state,
                paperPopup: action.paperPopup,
            }
        default:
            return state
    }
}

export default customizationReducer;
