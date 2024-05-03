import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import {
    CAlert,
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
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
import { userLogin } from '../../../api/user';
import { allDispatch } from '../../../allDispatch';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const { showNotification, setUserLoginToken, setUserLoginData } = allDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            let response = await userLogin(formData);
            if (response.status === 200) {
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'success',
                    isOpen: true
                });
                setValidated(true);
                setUserLoginToken(response?.data?.data?.token);
                setUserLoginData(JSON.stringify(response?.data?.data));
                navigate("/dashboard")
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

    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center login_page">
                    <CCol md={9} lg={7}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm
                                        className="row g-3 needs-validation"
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}
                                    >
                                        <h1>Login</h1>
                                        <p className="text-body-secondary">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                id="email"
                                                placeholder="Email"
                                                name='email'
                                                autoComplete="email"
                                                feedbackInvalid="This field is required"
                                                value={formData.email}
                                                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                                                required
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="relative" style={{ marginBottom: '20px' }}>
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                id='Password'
                                                type={showPassword === true ? 'text' : 'password'}
                                                name='password'
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                feedbackInvalid="This field is required"
                                                value={formData.password}
                                                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                                required
                                            />
                                            {
                                                showPassword === true ?
                                                    <FaEye
                                                        style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer' }}
                                                        onClick={handleClickShowPassword}
                                                    /> :
                                                    <FaEyeSlash
                                                        style={{ position: 'absolute', right: '12px', bottom: '10px', cursor: 'pointer' }}
                                                        onClick={handleClickShowPassword}
                                                    />
                                            }
                                        </CInputGroup>
                                        <CRow style={{ alignItems: 'center !important' }} className='login_btn_sec'>
                                            <CCol style={{ marginTop: '20px !important' }}>
                                                <CButton color="primary" className="px-4" type="submit">
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol style={{ textAlign: 'end', padding: 0 }}>
                                                <Link to="/forgot-password" color="primary" className="mt-3" active tabIndex={-1}>
                                                    forgot password
                                                </Link>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5">
                                <CCardBody className="text-center d-flex align-items-center ">
                                    <div>
                                        <h2>Welcome back!!</h2>
                                        <p style={{ marginBottom: '0' }}>
                                            Welcome back! We are so happy to have you here. It's great to see you again.
                                        </p>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
