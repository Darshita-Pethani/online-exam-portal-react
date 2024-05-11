import React, { useEffect, useMemo, useState } from 'react'
import { CCardBody } from '@coreui/react'
import { deleteRole, roleDataApi } from '../../../api/role'
import { useNavigate } from 'react-router-dom'
import TableContainer from '../../../components/TableContainer'
import "bootstrap/dist/css/bootstrap.min.css"
import { statusData } from '../utils/helper'
import UpdateStatus from '../../../components/updateStatus'
import FormButton from '../../../components/Form/formButton'
import { allDispatch } from '../../../allDispatch'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { DeleteRecord } from '../../../components/deleteRecord'
import { usersDataApi } from '../../../api/user'

const UsersList = () => {
    const navigate = useNavigate();
    const { showNotification } = allDispatch();

    const [usersList, setUsersList] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const [defaultFilter, setDefaultFilter] = useState({
        "currentPage": 1,
        "itemsPerPage": 5,
        "sortBy": [],
        "filters": []
    });

    const usersData = async () => {
        const response = await usersDataApi(defaultFilter);
        if (response?.status === 200) {
            setUsersList(response?.data?.data);
            setRowCount(response?.data?.data?.count);
        } else if (response?.status === 401) {
            navigate("/");
        }
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'full_name',
            header: 'FULL NAME',
            size: 150,
            Cell: ({ row }) => <>{row?.original?.full_name || "-"}</>
        },
        {
            accessorKey: 'username',
            header: 'USER NAME',
            size: 150,
            Cell: ({ row }) => <>{row?.original?.username || "-"}</>
        },
        {
            accessorKey: 'email',
            header: 'EMAIL',
            size: 150,
            Cell: ({ row }) => <>{row?.original?.email || "-"}</>
        },
        {
            accessorKey: 'image',
            header: 'IMAGE',
            size: 150,
            Cell: ({ row }) => <>{row?.original?.image || "-"}</>
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
                        tableNameProp='roles'
                    // writeAccess={common?.access?.write_access ? true : false}
                    // setStatusUpdate={setStatusUpdate} // no need to add
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
            Cell: ({ row }) => (
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: '10px', justifyContent: 'center' }}>
                        <div style={{ background: "rgb(88 86 214 / 8%)" }} className='editDeleteButton edit'
                        >
                            <CiEdit style={{ color: 'rgb(4 0 255)' }}
                                onClick={() => getUserDataById(row?.original?.id)}
                            />
                        </div>

                        <div style={{ background: "rgb(238 51 94 / 10%)" }} className='editDeleteButton delete'>
                            <MdDelete style={{ color: 'rgb(238,51,94)' }}
                                onClick={() => (DeleteRecord(row?.original?.id, deleteRole, showNotification))} />
                        </div>
                    </div>
                </>
            ),
        },
    ], []);

    // Get role data by id
    const getUserDataById = async (id) => {
        navigate('/pages/users/edit', {
            state: {
                id: id,
                editData: true
            }
        });
    }

    useEffect(() => {
        usersData();
    }, [defaultFilter, usersList]);

    return (
        <CCardBody>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <FormButton
                    style={{
                        color: 'white', fontSize: '16px', fontWeight: '500', marginBottom: '16px',
                        backgroundColor: 'var(--cui-primary)'
                    }}
                    hoverBgColor='#4846db'
                    hoverFontColor='white'
                    label='Add User'
                    onClick={() => navigate('/pages/users/add')}
                />
            </div>

            <TableContainer
                title='User List'
                columns={columns}
                data={usersList}
                defaultFilter={defaultFilter}
                setDefaultFilter={setDefaultFilter}
                rowCount={rowCount}
            />
        </CCardBody>
    )
}

export default UsersList
