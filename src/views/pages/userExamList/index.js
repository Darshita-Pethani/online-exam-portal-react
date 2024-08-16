import React, { useEffect, useMemo, useState } from 'react'
import { CCardBody } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import TableContainer from '../../../components/TableContainer'
import 'bootstrap/dist/css/bootstrap.min.css'
import { allDispatch } from '../../../store/allDispatch'
import moment from 'moment'
import { examDataApi } from '../../../api/exam'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

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

const UserExamList = () => {
    const navigate = useNavigate()
    const { showNotification } = allDispatch()

    const [examList, setExamList] = useState([])
    const [rowCount, setRowCount] = useState(0)
    const [statusUpdate, setStatusUpdate] = useState(false)

    const dispatch = useDispatch()
    const paperPopup = useSelector((state) => state?.paperPopup)

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

    const columns = useMemo(
        () => [
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
                enableColumnFilter: false,
                enableSorting: false,
                Cell: ({ row }) => <>{row?.original?.exam_type?.name || '-'}</>,
            },
            {
                accessorKey: 'standard',
                header: 'STANDARD',
                size: 150,
                defaultHiddenColumn: true,
                Cell: ({ row }) => <>{row?.original?.standard || '-'}</>,
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
                        {moment
                            .utc(
                                moment(row?.original?.end_time, 'HH:mm:ss').diff(
                                    moment(row?.original?.start_time, 'HH:mm'),
                                ),
                            )
                            .format('mm')}
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
        ],
        [],
    )

    useEffect(() => {
        examsData(defaultFilter)
    }, [defaultFilter, statusUpdate])

    return (
        <>
            <CCardBody>
                <div style={{ marginBottom: '24px' }}>
                    <TableContainer
                        title="Exam List"
                        columns={columns}
                        data={examList}
                        defaultFilter={defaultFilter}
                        setDefaultFilter={setDefaultFilter}
                        rowCount={rowCount}
                        enableColumnFilters={false}
                    />
                </div>
            </CCardBody>

            {/* {paperPopup && <ViewPaper data={questionId} />} */}
        </>
    )
}

export default UserExamList
