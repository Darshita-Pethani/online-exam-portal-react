import React, { useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
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
import { Link } from 'react-router-dom'
import { userForgotPasswordUsingOtpApi } from '../../../api/user';
import { allDispatch } from '../../../allDispatch';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router';
import OtpInput from '../../../components/OtpInput';

const OtpVerification = () => {
    const { showNotification } = allDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });
    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        // else {
        //     event.preventDefault()
        //     let response = await userForgotPasswordUsingOtpApi(formData);
        //     if (response.status === 200) {
        //         showNotification({
        //             title: "Success",
        //             message: response?.data?.message,
        //             status: 'success',
        //             isOpen: true
        //         });
        //         setValidated(true);
        //         navigate("/otp-verification");
        //     } else {
        //         showNotification({
        //             title: "Error",
        //             message: response?.data?.message,
        //             status: 'danger',
        //             isOpen: true
        //         });
        //     }
        // }
        form.classList.add('was-validated');
    }

    const [otp, setOtp] = React.useState('')

    const handleChange = (newValue) => {
        setOtp(newValue)
    }

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={6}>
                        <CCard className="mx-4">
                            <CCardBody className="p-4">
                                <CForm
                                    className="row g-3 needs-validation"
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
                                    <h1 style={{ fontSize: '23px', marginBottom: '20px' }}>OTP Verification</h1>
                                    <p className="text-body-secondary" style={{ marginBottom: '30px' }}>Enter the OTP we have sent to the
                                        <span>darshitapethani01@gmail.com</span></p>
                                    {/* <div style={{ marginBottom: '30px' }}>
                                        <MuiOtpInput value={otp} onChange={handleChange} className="otp_input" />
                                    </div> */}
                                    <OtpInput></OtpInput>
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

export default OtpVerification;