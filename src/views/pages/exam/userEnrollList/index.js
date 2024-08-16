import React, { useEffect, useMemo, useState } from 'react'
import { CCardBody } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { GetUserEnrollList } from '../../../../api/user'
import TableContainer from '../../../../components/TableContainer'
import { statusData } from '../../utils/helper'
import UpdateStatus from '../../../../components/updateStatus'
import { allDispatch } from '../../../../store/allDispatch'
import moment from 'moment'

const userExamEnrollList = () => {
    const navigate = useNavigate();
    const { showNotification } = allDispatch();

    const [userExamEnrollList, setUserExamEnrollList] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const [defaultFilter, setDefaultFilter] = useState({
        "currentPage": 1,
        "itemsPerPage": 5,
        "sortBy": [],
        "filters": []
    });

    const userEnrollData = async () => {
        const response = await GetUserEnrollList(defaultFilter);
        if (response?.status === 200) {
            setUserExamEnrollList(response?.data?.data?.rows);
            setRowCount(response?.data?.data?.count);
        } else if (response?.status === 401) {
            navigate("/");
        }
    }
    
    const columns = useMemo(() => [
        {
            accessorKey: 'Full name',
            header: 'FULL NAME',
            enableColumnFilter: false,
            enableSorting: false,
            size: 150,
            Cell: ({ row }) => <>{row?.original?.user?.full_name || "-"}</>
        },
        {
            accessorKey: 'name',
            header: 'EXAM NAME',
            size: 150,
            enableColumnFilter: false,
            enableSorting: false,
            Cell: ({ row }) => <>{row?.original?.exam?.exam_type?.name || "-"}</>
        },
        {
            accessorKey: 'subject name',
            header: 'SUBJECT NAME',
            size: 150,
            enableColumnFilter: false,
            enableSorting: false,
            Cell: ({ row }) => <>{row?.original?.exam?.subject?.name || "-"}</>
        },
        {
            accessorKey: 'date',
            header: 'DATE',
            size: 150,
            enableColumnFilter: false,
            enableSorting: false,
            Cell: ({ row }) => <>{moment(row?.original?.exam?.date).format("DD-MM-YYYY") || "-"}</>
        },
        {
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
                        tableNameProp='user_exam_enrolls' // table name
                        // writeAccess={common?.access?.write_access ? true : false}
                        setStatusUpdate={setStatusUpdate}
                    />
                </>
            ),
        },
    ], []);

    useEffect(() => {
        userEnrollData();
    }, [defaultFilter, statusUpdate]);

    return (
        <CCardBody>
            <div style={{ marginBottom: '24px' }}>
                <TableContainer
                    title='User Enroll List'
                    columns={columns}
                    data={userExamEnrollList}
                    defaultFilter={defaultFilter}
                    setDefaultFilter={setDefaultFilter}
                    rowCount={rowCount}
                />
            </div>
        </CCardBody>
    )
}

export default userExamEnrollList
