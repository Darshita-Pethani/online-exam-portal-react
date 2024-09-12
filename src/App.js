import React, { Suspense, useEffect, useState } from 'react'
// import { HashRouter, Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import ShowNotification from './components/Alert/index'
import { socket } from './socket'
import { SET_SHOW_STUDENTS_QUESTIONS } from './store/action'
import { useDispatch } from 'react-redux'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const ForgotPassword = React.lazy(() => import('./views/pages/forgotPassword/ForgotPassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const OtpVerification = React.lazy(() => import('./views/pages/otpVerification/otpVerification'))
const ResetPassword = React.lazy(() => import('./views/pages/resetPassword/resetPassword'))

const App = () => {
    const dispatch = useDispatch()
    const { isColorModeSet, setColorMode } = useColorModes('online-exam-portal')
    const storedTheme = useSelector((state) => state.theme)
    const std_id = useSelector((state) => state?.user?.standard_id?.id);
    const questionList = useSelector((state) => state?.customization?.showStudentsQuestionList)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.href.split('?')[1])
        const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
        if (theme) {
            setColorMode(theme)
        }

        if (isColorModeSet()) {
            return
        }

        setColorMode(storedTheme)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onConnect = () => {
        let data = {
            standard_id: std_id,
        }
        socket.emit('standardId', { data });
        socket.on('sendQuestionList', (data) => {
            if (data != null && questionList.length === 0 && data[0]?.standard_id === std_id) {
                dispatch({
                    type: SET_SHOW_STUDENTS_QUESTIONS,
                    payload: data,
                });
            }
        });
    }

    useEffect(() => {
        socket.on('connect', onConnect)
    }, [])

    return (
        // <HashRouter>
        <Router>
            <Suspense
                fallback={
                    <div className="pt-3 text-center">
                        <CSpinner color="primary" variant="grow" />
                    </div>
                }
            >
                <Routes>
                    <Route exact path="/" name="Login Page" element={<Login />} />
                    {/* <Route exact path="/pages/login" name="Login Page" element={<Login />} /> */}
                    <Route exact path="/register" name="Register Page" element={<Register />} />
                    <Route
                        exact
                        path="/forgot-password"
                        name="Forgot Password Page"
                        element={<ForgotPassword />}
                    />
                    <Route
                        exact
                        path="/otp-verification"
                        name="OTP Verification Page"
                        element={<OtpVerification />}
                    />
                    <Route
                        exact
                        path="/reset-password"
                        name="Reset Password Page"
                        element={<ResetPassword />}
                    />
                    <Route exact path="/404" name="Page 404" element={<Page404 />} />
                    <Route exact path="/500" name="Page 500" element={<Page500 />} />
                    <Route path="*" name="Home" element={<DefaultLayout />} />
                </Routes>
            </Suspense>
            <ShowNotification></ShowNotification>
        </Router>
        // </HashRouter>
    )
}

export default App
