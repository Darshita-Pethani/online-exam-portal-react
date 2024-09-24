import CIcon from '@coreui/icons-react'
import {
    CRow, CCol, CWidgetStatsD,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { showUserResult } from '../../api/userExamEnroll'
import { cilUser, cilCheckCircle } from '@coreui/icons';

const Dashboard = () => {
    const navigate = useNavigate()
    const questionList = useSelector((state) => state?.customization?.showStudentsQuestionList)
    const [allResults, setAllResults] = useState([]);
    const [todayResult, setTodayResult] = useState([]);

    const HoverableDiv = styled.div`
        cursor: pointer;
    `

    const showQuestionPaper = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to start this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, start it!',
        }).then((result) => {
            if (result?.isConfirmed) {
                navigate('/pages/student/exam')
            }
        })
    }

    const resultData = async () => {
        const response = await showUserResult()
        if (response.status === 200) {
            setAllResults(response?.data?.data?.rows)
        }
        const currentResult = response?.data?.data?.rows?.find((item => item?.exam_id === questionList[0]?.id))
        setTodayResult(currentResult)
    }

    const showAllResults = () => {
        navigate('/pages/student/profile-result', {
            state: {
                activeTab: 1,
                data: allResults
            }
        })
    }

    useEffect(() => {
        resultData()
    }, [])

    return (
        <>
            {questionList?.length > 0 && !todayResult &&
                <CRow>
                    <CCol xs={6} sm={4} md={3}>
                        <HoverableDiv onClick={showQuestionPaper}>
                            <CWidgetStatsD
                                className="mb-4"
                                icon={<CIcon icon={cilUser} height={52} />}
                                values={[
                                    { title: questionList[0]?.subject?.name, value: 6 }
                                ]}
                                style={{
                                    '--cui-card-cap-bg': '#3b5998',
                                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                }}
                            />
                        </HoverableDiv>
                    </CCol>
                </CRow>
            }

            <CRow>
                <CCol xs={6} sm={4} md={3}>
                    <HoverableDiv onClick={showAllResults}>
                        <CWidgetStatsD
                            className="mb-4"
                            icon={<CIcon icon={cilCheckCircle} height={52} />}
                            values={[
                                { title: 'Results Declared' }
                            ]}
                            style={{
                                '--cui-card-cap-bg': '#2cbc63',
                                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                            }}
                        />
                    </HoverableDiv>
                </CCol>
            </CRow>

        </>
    )
}

export default Dashboard