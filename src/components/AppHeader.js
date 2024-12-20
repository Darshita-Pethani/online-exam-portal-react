import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    CContainer,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CHeader,
    CHeaderNav,
    CHeaderToggler,
    CNavLink,
    CNavItem,
    useColorModes,
    CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilContrast,
    cilEnvelopeOpen,
    cilList,
    cilLockLocked,
    cilMenu,
    cilMoon,
    cilSun,
    cilUser,
} from '@coreui/icons'
import { CgProfile } from "react-icons/cg";

import { AppHeaderDropdown } from './header/index'
import { SET_SIDEBAR } from '../store/action'
import { useNavigate } from 'react-router-dom'
import { allDispatch } from '../store/allDispatch'
import { userLogoutApi } from '../api/user'

const AppHeader = () => {
    const headerRef = useRef()
    const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

    const dispatch = useDispatch()
    const sidebarShow = useSelector((state) => state?.customization?.sidebarShow)

    useEffect(() => {
        document.addEventListener('scroll', () => {
            headerRef.current &&
                headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
        })
    }, [])

    const { showNotification, setUserLogoutData } = allDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(state => state?.user?.userData);
    const [userData, setUserData] = useState([])

    const handleLogout = async () => {
        let response = await userLogoutApi();
        if (response?.status === 200) {
            await setUserLogoutData();
            navigate("/");
        } else {
            showNotification({
                title: "Error",
                message: response?.data?.message,
                status: 'danger',
                isOpen: true
            });
        }
    };

    // go to profile tab
    const handleProfile = () => {
        navigate('/pages/student/profile-result', {
            state: {
                activeTab: 0
            }
        })
    }

    useEffect(() => {
        if (userInfo) {
            setUserData(JSON.parse(userInfo))
        }
    }, []);

    return (
        <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
            <CContainer className="border-bottom px-4" fluid>
                <CHeaderToggler
                    onClick={() => dispatch({ type: SET_SIDEBAR, sidebarShow: !sidebarShow })}
                    style={{ marginInlineStart: '-14px' }}
                >
                    <CIcon icon={cilMenu} size="lg" />
                </CHeaderToggler>
                {/* <CHeaderNav className="ms-auto">
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilBell} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilList} size="lg" />
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink href="#">
                            <CIcon icon={cilEnvelopeOpen} size="lg" />
                        </CNavLink>
                    </CNavItem>
                </CHeaderNav> */}
                <CHeaderNav>
                    {/* <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
                    </li>
                    <CDropdown variant="nav-item" placement="bottom-end">
                        <CDropdownToggle caret={false}>
                            {colorMode === 'dark' ? (
                                <CIcon icon={cilMoon} size="lg" />
                            ) : colorMode === 'auto' ? (
                                <CIcon icon={cilContrast} size="lg" />
                            ) : (
                                <CIcon icon={cilSun} size="lg" />
                            )}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem
                                active={colorMode === 'light'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('light')}
                            >
                                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'dark'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('dark')}
                            >
                                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
                            </CDropdownItem>
                            <CDropdownItem
                                active={colorMode === 'auto'}
                                className="d-flex align-items-center"
                                as="button"
                                type="button"
                                onClick={() => setColorMode('auto')}
                            >
                                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                    <li className="nav-item py-1">
                        <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
                    </li> */}
                    {/* show logout popup */}
                    <div  className="d-flex align-items-center">
                        <div onClick={handleProfile}>
                            <CIcon icon={cilUser} className="me-2" />
                        </div>

                        <div onClick={handleLogout}>
                            <CIcon icon={cilLockLocked} className="me-2" />
                        </div>

                        <div>
                            <CAvatar src={userData?.image} size="md" />
                        </div>
                    </div>
                    {/* <AppHeaderDropdown /> */}
                </CHeaderNav>
            </CContainer>
            {/* for bread crumps */}
            {/* <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer> */}
        </CHeader>
    )
}

export default AppHeader
