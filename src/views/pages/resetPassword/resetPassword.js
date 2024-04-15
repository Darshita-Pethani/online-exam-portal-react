import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'
import { userResetPasswordApi } from '../../../api/user'
import { allDispatch } from '../../../allDispatch'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
    const { showNotification } = allDispatch();
    const [formData, setFormData] = useState({
        new_password: '',
        confirm_password: '',
    });
    let navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault();
            let response = await userResetPasswordApi(formData, location?.state?.id);
            if (response.status === 200) {
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'success',
                    isOpen: true
                });
                navigate("/");
            } else {
                showNotification({
                    title: "Error",
                    message: response?.data?.message,
                    status: 'danger',
                    isOpen: true
                });
            }
        }
        form.classList.add('was-validated');
    }

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const showHiddenPassword = (name) => {
        if (name === 'new_password') {
            setShowNewPassword(!showNewPassword)
        }

        if (name === 'confirm_password') {
            setConfirmPassword(!showConfirmPassword)
        }

    }
    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={5}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm
                                    className="row g-3 needs-validation"
                                    noValidate
                                    onSubmit={handleSubmit}
                                >
                                    <h1 style={{ fontSize: '23px', marginBottom: '40px', textAlign: 'center', color: '#5856d6' }}>Reset Password</h1>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id='new_password'
                                            type={showNewPassword === true ? 'text' : 'password'}
                                            name='new_password'
                                            placeholder="Password"
                                            feedbackInvalid="This field is required"
                                            value={formData.new_password}
                                            onChange={(event) => setFormData({ ...formData, new_password: event.target.value })}
                                            required
                                        />
                                        {
                                            showNewPassword === true ?
                                                <FaEye
                                                    style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer' }}
                                                    onClick={() => showHiddenPassword('new_password')}
                                                /> :
                                                <FaEyeSlash
                                                    style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer' }}
                                                    onClick={() => showHiddenPassword('new_password')}
                                                />
                                        }
                                    </CInputGroup>
                                    <CInputGroup style={{ marginBottom: '40px' }}>
                                        <CInputGroupText>
                                            <CIcon icon={cilLockLocked} />
                                        </CInputGroupText>
                                        <CFormInput
                                            id='confirm_Password'
                                            type={showConfirmPassword === true ? 'text' : 'password'}
                                            name='confirm_password'
                                            placeholder="Confirm Password"
                                            feedbackInvalid="This field is required"
                                            value={formData.confirm_password}
                                            onChange={(event) => setFormData({ ...formData, confirm_password: event.target.value })}
                                            required
                                        />
                                        {
                                            showConfirmPassword === true ?
                                                <FaEye
                                                    style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer' }}
                                                    onClick={() => showHiddenPassword('confirm_password')}
                                                /> :
                                                <FaEyeSlash
                                                    style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer' }}
                                                    onClick={() => showHiddenPassword('confirm_password')}
                                                />
                                        }

                                    </CInputGroup>
                                    <div className="d-grid">
                                        <CButton color="primary" type='submit'>Submit</CButton>
                                    </div>
                                    <CCol xs={12} style={{ textAlign: 'center', marginTop: '30px' }}>
                                        <Link to="/" color="primary" className="mt-3" active tabIndex={-1} style={{ textDecoration: 'none' }}>
                                            <IoChevronBack style={{ marginTop: '-4px' }} />Back to Login
                                        </Link>
                                    </CCol>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default ResetPassword
