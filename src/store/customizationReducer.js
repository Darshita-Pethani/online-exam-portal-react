import * as actionTypes from './action'

export const initialState = {
    sidebarShow: true,
    theme: 'light',
    sidebarUnfoldable: false
}

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SIDEBAR:
            return {
                ...state,
                sidebarShow: action.sidebarShow,
            }
        case actionTypes.SET_SIDEBAR_UNFOLDABLE:
            return {
                ...state,
                sidebarUnfoldable: action.sidebarUnfoldable,
            }
        default:
            return state
    }
}

export default customizationReducer;
