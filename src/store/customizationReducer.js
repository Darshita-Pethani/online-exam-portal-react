import * as actionTypes from './action'

export const initialState = {
    sidebarShow: true,
    theme: 'light',
    sidebarUnfoldable: false,
    showStudentsQuestionList: []
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
        case actionTypes.SET_SHOW_STUDENTS_QUESTIONS:
            return {
                ...state,
                showStudentsQuestionList: action.payload,
            }
        default:
            return state
    }
}

export default customizationReducer;
