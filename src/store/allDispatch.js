import { useDispatch } from 'react-redux';
import * as actionTypes from './action';

export const allDispatch = () => {
    const dispatch = useDispatch();

    const showNotification = async (payload) => {
        dispatch({ type: actionTypes.SET_NOTIFICATION, payload });
    };

    // user 
    const setUserLoginToken = async (payload) => {
        dispatch({ type: actionTypes.SET_USER_LOGIN_TOKEN, payload });
    };

    const setUserLoginData = async (payload) => {
        dispatch({ type: actionTypes.SET_USER_LOGIN_DATA, payload });
    };

    const setUserLogoutData = async (payload) => {
        dispatch({ type: actionTypes.SET_USER_LOGOUT_DATA, payload });
    };

    return { showNotification, setUserLoginToken, setUserLoginData, setUserLogoutData };
};
