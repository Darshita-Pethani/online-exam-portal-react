import * as actionTypes from './action'

export const initialState = {
    snackbar: {
        title: '',
        message: '',
        status: '',
        isOpen: false,
    },
    paperPopup: false,
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
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

export default commonReducer;
