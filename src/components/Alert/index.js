import React from 'react';
import { CAlert } from '@coreui/react';
import { useSelector } from 'react-redux';

const ShowNotification = () => {
    const common = useSelector((state) => state);
    // const { showNotification } = allDispatch(); km k direct dismissble thi close thy jay che
    return (
        <div style={{ position: 'fixed', right: 0, bottom: 0, maxWidth: '390px', width: '100%', zIndex: '99' }}>
            <CAlert color={common?.snackbar?.status} visible={common?.snackbar?.isOpen} dismissible>
                {common?.snackbar?.message && <strong>{common?.snackbar?.message}</strong>}
            </CAlert>
        </div>

    );
};

export default ShowNotification;

