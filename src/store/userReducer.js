import * as actionTypes from './action'

export const initialState = {
    userData: {},
    token: '',
    isLogin: false,
    moduleData: [],
    standard_id: {}
}
const convertPermissionToBoolean = (modules) => {
    return modules?.map((module) => {
        const convertedModule = {
            ...module,
            permissions: {
                ...module.permissions,
                read_access: Boolean(module.permissions.read_access),
                write_access: Boolean(module.permissions.write_access),
                delete_access: Boolean(module.permissions.delete_access),
            },
        };
        return convertedModule;
    });
};


const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_LOGIN_TOKEN:
            localStorage.setItem('authorization', action.payload)
            localStorage.setItem('isLogin', true)
            return {
                ...state,
                token: action.payload,
            }
        case actionTypes.SET_USER_LOGIN_DATA:
            return {
                ...state,
                userData: action.payload,
            }
        case actionTypes.SET_STANDARD_ID:
            return {
                ...state,
                standard_id: action.payload,
            }
        case actionTypes.SET_MODULES_DATA:
            return {
                ...state,
                moduleData: convertPermissionToBoolean(action.payload),
            }
        case actionTypes.SET_USER_LOGOUT_DATA:
            localStorage.removeItem('authorization')
            localStorage.removeItem('userData')
            localStorage.setItem('isLogin', false)
            return initialState
        default:
            return state
    }
}

export default userReducer
