import React, { useEffect, useMemo, useState } from 'react'
import {
    CButton,
    CCardBody,
    CFormLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CTooltip,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import TableContainer from '../../../components/TableContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { statusData } from '../utils/helper'
import UpdateStatus from '../../../components/updateStatus'
import { allDispatch } from '../../../store/allDispatch'
import { CiEdit } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'
import { DeleteRecord } from '../../../components/deleteRecord'
import FormButton from '../../forms/formButton'
import moment from 'moment'
import { deleteExam, examDataApi } from '../../../api/exam'
import { GrFormAdd } from 'react-icons/gr'
import { MdRemoveRedEye } from 'react-icons/md'
import ViewPaper from './viewPaper'
import { useDispatch, useSelector } from 'react-redux'
import { SET_VIEW_PAPER } from '../../../store/action'
import styled from 'styled-components'
import _nav from '../../../_nav'
import { setPermissionInAction } from '../../utils/config'

const StyledDiv = styled.div`
  background: rgb(138 138 225);
  width: 100%;
  min-width: 120px;
  padding: 5px;
  border-radius: 20px;
  font-weight: 600;
  color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  &::after {
    content: '⮞';
    position: absolute;
    top: -3px;
    right: -15px;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background: #5a57df;
    outline-style: solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const ExamList = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { showNotification } = allDispatch()

    const [examList, setExamList] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [statusUpdate, setStatusUpdate] = useState(false)

    const dispatch = useDispatch()
    const paperPopup = useSelector((state) => state?.common?.paperPopup)

    const modules = useSelector((state) => state?.user?.moduleData)
    const [accessData, setAccessData] = useState(null)

    const [defaultFilter, setDefaultFilter] = useState({
        currentPage: 1,
        itemsPerPage: 5,
        sortBy: [],
        filters: [],
    })

    const examsData = async (filterValue) => {
        const response = await examDataApi(filterValue ?? defaultFilter)
        if (response?.status === 200) {
            setExamList(response?.data?.data?.rows)
            setRowCount(response?.data?.data?.count)
        } else if (response?.status === 401) {
            navigate('/')
        }
    }

    const hasPermissionData = async () => {
        let response = await setPermissionInAction(_nav, modules, location)
        setAccessData(response)
    }

    useEffect(() => {
        hasPermissionData()
    }, [])


    const columns = useMemo(
        () => {
            let baseColumns = [
                {
                    accessorKey: 'full_name',
                    header: 'FULL NAME',
                    size: 150,
                    enableColumnFilter: false,
                    enableSorting: false,
                    Cell: ({ row }) => <>{row?.original?.user?.full_name || '-'}</>,
                },
                {
                    accessorKey: 'subject',
                    header: 'SUBJECT',
                    size: 150,
                    enableColumnFilter: false,
                    enableSorting: false,
                    Cell: ({ row }) => <>{row?.original?.subject?.name || '-'}</>,
                },
                {
                    accessorKey: 'name',
                    header: 'NAME',
                    size: 150,
                    Cell: ({ row }) => <>{row?.original?.exam_type?.name || '-'}</>,
                },
                {
                    accessorKey: 'standard',
                    header: 'STANDARD',
                    size: 150,
                    defaultHiddenColumn: true,
                    Cell: ({ row }) => <>{row?.original?.standard?.name || '-'}</>,
                },
                {
                    accessorKey: 'date',
                    header: 'EXAM DATE',
                    size: 150,
                    filterVariant: 'date',
                    Cell: ({ row }) => (
                        <>{row?.original?.date ? moment(row?.original?.date).format('DD-MM-YYYY') : '-'}</>
                    ),
                },
                {
                    accessorKey: 'start_time',
                    header: 'START TIME',
                    size: 150,
                    Cell: ({ row }) => <>{row?.original?.start_time || '-'}</>,
                },
                {
                    accessorKey: 'end_time',
                    header: 'END TIME',
                    size: 150,
                    defaultHiddenColumn: true,
                    Cell: ({ row }) => <>{row?.original?.end_time}</>,
                },
                {
                    accessorKey: 'exam_duration',
                    header: 'DURATION',
                    size: 150,
                    Cell: ({ row }) => (
                        <>
                            {moment.utc(moment(row?.original?.end_time, "HH:mm:ss").diff(moment(row?.original?.start_time, "HH:mm"))).format("mm")}
                        </>
                    ),
                },
                {
                    accessorKey: 'total_questions',
                    header: 'TOTAL QUESTIONS',
                    size: 150,
                    defaultHiddenColumn: true,
                    Cell: ({ row }) => <>{row?.original?.total_questions || '-'}</>,
                },
                {
                    accessorKey: 'total_marks',
                    header: 'TOTAL MARKS',
                    size: 150,
                    defaultHiddenColumn: true,
                    Cell: ({ row }) => <>{row?.original?.total_marks || '-'}</>,
                },
                {
                    accessorKey: 'min_percentage',
                    header: 'MIN PERCENTILE',
                    size: 150,
                    defaultHiddenColumn: true,
                    Cell: ({ row }) => <>{row?.original?.min_percentage || '-'}</>,
                },
                {
                    accessorKey: 'description',
                    header: 'DESCRIPTION',
                    size: 150,
                    defaultHiddenColumn: true,
                    Cell: ({ row }) => <>{row?.original?.description || '-'}</>,
                },

            ]

            let enrollList = {
                accessorKey: 'enrollList',
                header: 'ENROLL LIST',
                size: 150,
                // defaultHiddenColumn: true,
                Cell: ({ row }) => (
                    <>
                        <StyledDiv>
                            <CFormLabel
                                style={{ margin: '0', cursor: 'pointer', width: '100%', fontSize: '13px' }}
                                onClick={userExamEnroll}
                            >
                                Enroll List
                            </CFormLabel>
                        </StyledDiv>
                    </>
                ),
            }

            let statusColumn = {
                accessorKey: 'status',
                header: 'STATUS',
                size: 150,
                filterVariant: 'select',
                mantineFilterSelectProps: {
                    data: statusData,
                },
                Cell: ({ row }) => (
                    <>
                        <UpdateStatus
                            data={row}
                            tableNameProp="exams"
                            // writeAccess={common?.access?.write_access ? true : false}
                            setStatusUpdate={setStatusUpdate}
                        />
                    </>
                ),
            }

            let actionColumn = {
                accessorKey: 'action',
                header: 'ACTION',
                size: 150,
                enableColumnFilter: false,
                enableSorting: false,
                enableHiding: false, // hide thase j ny aa column ane hide thy pn ske aa proprty thi
                Cell: ({ row }) => (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                justifyContent: 'center',
                            }}
                        >
                            {accessData?.write_access && (
                                <div
                                    style={{
                                        background:
                                            row?.original?.questions?.length > 0
                                                ? 'rgb(238 51 94 / 10%)'
                                                : 'rgb(88 86 214 / 8%)',
                                        cursor: row?.original?.questions?.length > 0 ? 'not-allowed' : 'pointer',
                                    }}
                                    className="editDeleteButton edit"
                                >
                                    <CiEdit
                                        style={{
                                            color: row?.original?.questions?.length > 0 ? 'rgb(238,51,94)' : 'rgb(4 0 255)',
                                            pointerEvents: row?.original?.questions?.length > 0 ? 'none' : 'auto',
                                        }}
                                        onClick={() => getExamDataById(row?.original?.id)}
                                    />
                                </div>

                            )}
                            {accessData?.delete_access && (
                                <div
                                    style={{ background: 'rgb(238 51 94 / 10%)' }}
                                    className="editDeleteButton delete"
                                >
                                    <MdDelete
                                        style={{ color: 'rgb(238,51,94)' }}
                                        onClick={() =>
                                            DeleteRecord(row?.original?.id, deleteExam, showNotification, setStatusUpdate)
                                        }
                                    />
                                </div>
                            )}
                            {accessData?.write_access && (
                                //  add/edit question 
                                row?.original?.questions?.length > 0 ? (
                                    // edit question
                                    <div
                                        style={{
                                            background: 'rgb(25 135 84)',
                                            width: '100%',
                                            minWidth: '120px',
                                            padding: '5px 5px',
                                            borderRadius: '20px',
                                            fontWeight: '600',
                                            color: '#f5f5f5',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => addQuestionPage(row?.original?.id, true)}
                                    >
                                        <CiEdit style={{ fontSize: '25px' }} />
                                        <CFormLabel
                                            style={{ margin: '0', cursor: 'pointer', width: '100%', fontSize: '13px' }}
                                        >
                                            Edit Question
                                        </CFormLabel>
                                    </div>
                                ) : (
                                    // add questions
                                    <div
                                        style={{
                                            background: '#5856d6',
                                            width: '100%',
                                            minWidth: '120px',
                                            padding: '5px 5px',
                                            borderRadius: '20px',
                                            fontWeight: '600',
                                            color: '#f5f5f5',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => addQuestionPage(row?.original?.id)}
                                    >
                                        <GrFormAdd style={{ fontSize: '25px' }} />
                                        <CFormLabel
                                            style={{ margin: '0', cursor: 'pointer', width: '100%', fontSize: '13px' }}
                                        >
                                            Add Question
                                        </CFormLabel>
                                    </div>
                                )
                            )}

                            <CTooltip content="View Paper" placement="top">
                                <CButton
                                    color="light"
                                    style={{ padding: '4px 11px' }}
                                    onClick={() => viewPaper(row?.original?.id)}
                                    disabled={row?.original?.questions?.length == 0 ? 'true' : ''}
                                >
                                    <MdRemoveRedEye style={{ marginBottom: '4px' }} />
                                </CButton>
                            </CTooltip>
                        </div>
                    </>
                ),
            }

            if (accessData?.write_access || accessData?.delete_access) {
                baseColumns.push(enrollList, statusColumn, actionColumn)
            }

            return baseColumns
        }, [accessData],
    )

    // add question page
    const addQuestionPage = (id, data) => {
        navigate('/pages/exam/question/add', {
            state: {
                exam_id: id,
                editData: data != undefined ? true : '',
            },
        })
    }

    // Get exam data by id
    const getExamDataById = async (id) => {
        navigate('/pages/exam/edit', {
            state: {
                id: id,
                editData: true,
            },
        })
    }

    // view paper
    const [questionId, setQuestionId] = useState([])
    const viewPaper = async (id) => {
        setQuestionId(id)
        dispatch({ type: SET_VIEW_PAPER, paperPopup: true });
    }

    // view enroll list
    const userExamEnroll = () => {
        navigate('/pages/exam/enroll-list', {
            state: {
                exam_id: questionId,
            },
        })
    }

    useEffect(() => {
        examsData(defaultFilter)
    }, [defaultFilter, statusUpdate])

    return (
        <>
            <CCardBody>
                {accessData?.write_access && (
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <FormButton
                            style={{
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: '500',
                                marginBottom: '24px',
                                backgroundColor: 'var(--cui-primary)',
                            }}
                            hoverBgColor="#4846db"
                            hoverFontColor="white"
                            label="Add Exam"
                            onClick={() => navigate('/pages/exam/add')}
                        />
                    </div>
                )}

                <div style={{ marginBottom: '24px' }}>
                    <TableContainer
                        title="Exam List"
                        columns={columns}
                        data={examList}
                        defaultFilter={defaultFilter}
                        setDefaultFilter={setDefaultFilter}
                        rowCount={rowCount}
                    />
                </div>
            </CCardBody>
            
            {paperPopup && <ViewPaper data={questionId} />}
        </>
    )
}

export default ExamList
