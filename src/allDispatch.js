import { useDispatch } from 'react-redux';
import * as actionTypes from './action';

export const allDispatch = () => {
    const dispatch = useDispatch();

    const showNotification = async (payload) => {
        dispatch({ type: actionTypes.SET_NOTIFICATION, payload });
    };

    return { showNotification };
};
