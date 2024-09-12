import React, { useEffect, useState } from 'react'
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
    cilBell,
    cilCreditCard,
    cilCommentSquare,
    cilEnvelopeOpen,
    cilFile,
    cilLockLocked,
    cilSettings,
    cilTask,
    cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { userLogoutApi } from '../../api/user'
import { allDispatch } from '../../store/allDispatch'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AppHeaderDropdown = () => {
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
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
                <CAvatar src={userData?.image} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                {/* <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
                <CDropdownItem>
                    <CIcon icon={cilBell} className="me-2" />
                    Updates
                    <CBadge color="info" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon icon={cilEnvelopeOpen} className="me-2" />
                    Messages
                    <CBadge color="success" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon icon={cilTask} className="me-2" />
                    Tasks
                    <CBadge color="danger" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon icon={cilCommentSquare} className="me-2" />
                    Comments
                    <CBadge color="warning" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
                <CDropdownItem>
                    <CIcon icon={cilSettings} className="me-2" />
                    Settings
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon icon={cilCreditCard} className="me-2" />
                    Payments
                    <CBadge color="secondary" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon icon={cilFile} className="me-2" />
                    Projects
                    <CBadge color="primary" className="ms-2">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownDivider /> */}

                {/* for profile view */}
                <CDropdownItem onClick={handleProfile}>
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                </CDropdownItem>

                {/* for logout account */}
                <CDropdownItem onClick={handleLogout}>
                    <CIcon icon={cilLockLocked} className="me-2" />
                    Lock Account
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
