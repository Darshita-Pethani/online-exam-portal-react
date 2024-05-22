import React, { useEffect, useMemo, useState } from 'react'
import { CCardBody } from '@coreui/react'
import { deleteRole, roleDataApi } from '../../../api/role'
import { useNavigate } from 'react-router-dom'
import TableContainer from '../../../components/TableContainer'
import "bootstrap/dist/css/bootstrap.min.css"
import { statusData } from '../utils/helper'
import UpdateStatus from '../../../components/updateStatus'
import { allDispatch } from '../../../allDispatch'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { DeleteRecord } from '../../../components/deleteRecord'
import FormButton from '../../forms/formButton'
import { deleteSubject, subjectDataApi } from '../../../api/subject'

const SubjectList = () => {
    const navigate = useNavigate();
    const { showNotification } = allDispatch();

    const [subjectList, setSubjectList] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const [defaultFilter, setDefaultFilter] = useState({
        "currentPage": 1,
        "itemsPerPage": 5,
        "sortBy": [],
        "filters": []
    });

    const subjectData = async () => {
        const response = await subjectDataApi(defaultFilter);
        if (response?.status === 200) {
            setSubjectList(response?.data?.data?.rows);
            setRowCount(response?.data?.data?.count);
        } else if (response?.status === 401) {
            navigate("/");
        }
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'Added By',
            header: 'ADDED BY',
            enableColumnFilter: false,
            enableSorting: false,
            size: 150,
            Cell: ({ row }) => <>{row?.original?.user?.full_name || "-"}</>
        },
        {
            accessorKey: 'name',
            header: 'NAME',
            size: 150,
            Cell: ({ row }) => <>{row?.original?.name || "-"}</>
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
                        tableNameProp='subjects' // table name
                        // writeAccess={common?.access?.write_access ? true : false}
                        setStatusUpdate={setStatusUpdate}
                    />
                </>
            ),
        },
        {
            accessorKey: 'action',
            header: 'ACTION',
            size: 150,
            enableColumnFilter: false,
            enableSorting: false,
            enableHiding: false, // hide thase j ny aa column ane hide thy pn ske aa proprty thi
            Cell: ({ row }) => (
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: '10px', justifyContent: 'center' }}>
                        <div style={{ background: "rgb(88 86 214 / 8%)" }} className='editDeleteButton edit'
                        >
                            <CiEdit style={{ color: 'rgb(4 0 255)' }}
                                onClick={() => getSubjectDataById(row?.original?.id)}
                            />
                        </div>

                        <div style={{ background: "rgb(238 51 94 / 10%)" }} className='editDeleteButton delete'>
                            <MdDelete style={{ color: 'rgb(238,51,94)' }}
                                onClick={() => (DeleteRecord(row?.original?.id, deleteSubject, setStatusUpdate, showNotification))} />
                        </div>
                    </div>
                </>
            ),
        },
    ], []);


    // Get role data by id
    const getSubjectDataById = async (id) => {
        navigate('/pages/subject/edit', {
            state: {
                id: id,
                editData: true
            }
        });
    }

    // userEffect ma subjectList arry etle nathi lakhyi km k network ma eni apis call tha tha kare che
    // to statusUpdate thi thy jase aama khali statusUpdate pr j list joiye etle
    useEffect(() => {
        subjectData();
    }, [defaultFilter, statusUpdate]);

    return (
        <CCardBody>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <FormButton
                    style={{
                        color: 'white', fontSize: '16px', fontWeight: '500', marginBottom: '24px',
                        backgroundColor: 'var(--cui-primary)'
                    }}
                    hoverBgColor='#4846db'
                    hoverFontColor='white'
                    label='Add Subject'
                    onClick={() => navigate('/pages/subject/add')}
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                <TableContainer
                    title='Subject List'
                    columns={columns}
                    data={subjectList}
                    defaultFilter={defaultFilter}
                    setDefaultFilter={setDefaultFilter}
                    rowCount={rowCount}
                />
            </div>
        </CCardBody>
    )
}

export default SubjectList
