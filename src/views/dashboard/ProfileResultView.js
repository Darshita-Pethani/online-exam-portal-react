import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CTabContent,
    CTabPane,
    CNav,
    CNavItem,
    CNavLink
} from '@coreui/react';
import ProfileView from './Profileview';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ResultView from './Resultview';

const ProfileResultView = () => {
    const userInfo = useSelector(state => state?.user?.userData);
    const [userData, setUserData] = useState([])
    const [allResults, setAllResults] = useState([]);

    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0); // state for active tab

    useEffect(() => {
        if (location?.state) {
            setActiveTab(location?.state?.activeTab)
            setAllResults(location?.state?.data)
        }
    }, [location])

    useEffect(() => {
        if (userInfo) {
            setUserData(JSON.parse(userInfo))
        }
    }, []);

    return (
        <CCard>
            <CCardHeader style={{ border: 0 }}>
                <CNav variant="tabs">
                    <CNavItem>
                        <CNavLink
                            active={activeTab === 0}
                            onClick={() => setActiveTab(0)}
                        >
                            Profile
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink
                            active={activeTab === 1}
                            onClick={() => setActiveTab(1)}
                        >
                            Results
                        </CNavLink>
                    </CNavItem>
                </CNav>
            </CCardHeader>
            <CCardBody>
                <CTabContent>
                    <CTabPane visible={activeTab === 0}>
                        <ProfileView id={userData?.id} />
                    </CTabPane>
                    <CTabPane visible={activeTab === 1}>
                        <ResultView id={userData?.id} data={allResults}/>
                    </CTabPane>
                </CTabContent>
            </CCardBody>
        </CCard>
    );
}

export default ProfileResultView;
