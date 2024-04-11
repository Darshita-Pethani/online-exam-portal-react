import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom'
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
import { useSelector, useDispatch } from 'react-redux'
import { SET_NOTIFICATION } from '../../../action';
import { allDispatch } from '../../../allDispatch';

const Login = () => {
    const { showNotification } = allDispatch();
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch()
    let ok = {
        // title: "Success",
        message: 'You have successfully logged in',
        status: 'success',
        isOpen: true
    }
    // const [showAlert, setShowAlert] = useState(false);
    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            let response = await userLogin(formData);
            showNotification({
                title: "Success",
                message: response?.data?.message,
                status: 'success',
                isOpen: true
            });
            setValidated(true);
            navigate("/dashboard")
        }
        form.classList.add('was-validated');
    }
    return (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
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
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                id='Password'
                                                type="password"
                                                name='password'
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                feedbackInvalid="This field is required"
                                                value={formData.password}
                                                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                                                required
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" type="submit">
                                                    Login
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
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
