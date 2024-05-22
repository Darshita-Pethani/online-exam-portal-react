import React from 'react';
import { statusUpdateApi } from '../api/user';
import { allDispatch } from '../allDispatch';
import styled from 'styled-components';
import { CButton } from '@coreui/react';

// This style is not working in FormButton component
export const StyledButton = styled(CButton)`
    &:hover {
        background-color: ${({ active }) => (active === true ? 'rgba(58, 163, 62, 0.78)' : 'rgb(238,51,94)')} !important;
        color: white !important;
    }
`;

const UpdateStatus = ({ data, tableNameProp, writeAccess, setStatusUpdate }) => {
    const { showNotification } = allDispatch();
    const handleStatusChange = async () => {
        const updatedData = data.original;
        let message = '';

        if (updatedData?.status === 1) {
            updatedData.status = 0;
            message = 'Record has been inactivated successfully.';
        } else {
            updatedData.status = 1;
            message = 'Record has been activated successfully.';
        }

        const { id, status } = updatedData;
        const response = await statusUpdateApi({ id, status, tableName: tableNameProp });

        if (response?.status === 200) {
            // aa jaruri che listing tarat show karva
            setStatusUpdate(prev => !prev);
            showNotification({
                title: "Success",
                message: message,
                status: 'success',
                isOpen: true
            });
        } else {
            setStatusUpdate(prev => !prev);
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            });
        }
    };

    return (
        <StyledButton
            type='button'
            onClick={handleStatusChange}
            style={{
                color: `${data?.original?.status === 1 ? 'var(--cui-success)' : 'var(--cui-danger)'}`,
                // height: '40px',
                width: '90px',
                fontWeight: '700',
                backgroundColor: `${data?.original?.status === 1 ? '#22c03c21' : 'rgb(238 51 94 / 10%)'}`,
                // border: `1px solid ${data?.original?.status === 1 ? 'var(--cui-success)' : 'var(--cui-danger)'}`,
                border: 'unset',
                letterSpacing: '0.5px'

            }}
            active={data?.original?.status === 1}
        >
            {data?.original?.status === 1 ? 'Active' : 'Inactive'}
        </StyledButton >
    );
};

export default UpdateStatus;
