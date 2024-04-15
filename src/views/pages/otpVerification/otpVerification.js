import React, { useEffect, useState } from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CRow,
} from '@coreui/react'
import { Link, useLocation } from 'react-router-dom'
import { userForgotPasswordUsingOtpApi, userOtpVerificationApi } from '../../../api/user';
import { allDispatch } from '../../../allDispatch';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router';

const OtpVerification = () => {
    const { showNotification } = allDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const location = useLocation();

    const [otp, setOtp] = useState('');
    const [otpSecond, setOtpSecond] = useState(59);
    const userEmail = location?.state?.formData?.email;

    const handleChange = (value) => {
        setOtp(value)
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            event.preventDefault()
            let response = await userOtpVerificationApi({ "otp": otp });
            let id = response?.data?.data?.user_id
            if (response.status === 200) {
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'success',
                    isOpen: true
                });
                setValidated(true);
                navigate("/reset-password", { state: { id } });
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
    const resendOTP = async (email) => {
        setOtpSecond(59);
        let response = await userForgotPasswordUsingOtpApi({ email: email });
        if (response?.status === 200) {
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'success',
                isOpen: true
            })
        } else {
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'error',
                isOpen: true
            })
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (otpSecond > 0) {
                setOtpSecond(otpSecond - 1);
            }
            if (otpSecond === 0) {
                clearInterval(interval);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [otpSecond, location]);

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={9} lg={7} xl={5} className='otp_input_body'>
                        <CCard className="mx-4 otp_input_card">
                            <CCardBody className="p-4">
                                <CForm
                                    className="row g-3 needs-validation"
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
                                    <h1 style={{ fontSize: '23px', marginBottom: '10px', textAlign: 'center', color: '#5856d6' }}>OTP Verification</h1>
                                    <p className="text-body-secondary mx-auto" style={{ marginBottom: '20px', textAlign: 'center', marginBottom: '20px' }}>Enter the OTP we have sent to the
                                        <span style={{ marginLeft: '7px', fontSize: '17px', fontWeight: "700" }}>{userEmail}</span></p>
                                    <div style={{ marginBottom: '20px' }}>
                                        <MuiOtpInput
                                            length={6}
                                            value={otp}
                                            onChange={handleChange}
                                            className="otp_input"
                                            required
                                        />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span>Didn't receive an OTP?</span>
                                        <button
                                            onClick={() => resendOTP(userEmail)}
                                            disabled={otpSecond > 0}
                                            style={{
                                                border: 0, backgroundColor: 'transparent', borderBottom: '1px solid',
                                                cursor: otpSecond > 0 ? 'not-allowed' : 'pointer'
                                            }}
                                        >Resend OTP
                                        </button>

                                        <span style={{ display: 'block', marginTop: '10px' }}>
                                            Time Remaining: <span style={{ fontWeight: '600', color: '#5856d6' }}>{otpSecond < 10 ? `0${otpSecond}` : otpSecond}s</span>
                                        </span>
                                    </div>
                                    <div className="d-grid" style={{ marginTop: '20px !important' }}>
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