import React, { useEffect, useMemo, useState } from 'react'
import { CButton, CCardBody, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
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
import { deleteUser, usersDataApi } from '../../../api/user'
import FormButton from '../../forms/formButton'
import moment from 'moment'
import { ImageModel } from '../../../components/ImageModel'

const UsersList = () => {
    const navigate = useNavigate();
    const { showNotification } = allDispatch();

    const [usersList, setUsersList] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [statusUpdate, setStatusUpdate] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [visible, setVisible] = useState(false);

    const [defaultFilter, setDefaultFilter] = useState({
        "currentPage": 1,
        "itemsPerPage": 5,
        "sortBy": [],
        "filters": []
    });

    const usersData = async () => {
        const response = await usersDataApi(defaultFilter);
        if (response?.status === 200) {
            setUsersList(response?.data?.data?.rows);
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
            accessorKey: 'role_name',
            header: 'ROLE',
            size: 150,
            enableColumnFilter: false,
            enableSorting: false,
            Cell: ({ row }) => <>{row?.original?.role?.name || "-"}</>
        },
        {
            accessorKey: 'address',
            header: 'ADDRESS',
            size: 150,
            defaultHiddenColumn: true,
            Cell: ({ row }) => <>{row?.original?.address || "-"}</>
        },
        {
            accessorKey: 'date_of_birth',
            header: 'DATE OF BIRTH',
            size: 150,
            filterVariant: 'date',
            Cell: ({ row }) => <>{row?.original?.date_of_birth ? moment(row?.original?.date_of_birth).format('DD-MM-YYYY') : "-"}</>
        },
        {
            accessorKey: 'phone_no',
            header: 'PHONE NO',
            size: 150,
            defaultHiddenColumn: true,
            Cell: ({ row }) => <>{row?.original?.phone_no || "-"}</>
        },
        {
            accessorKey: 'gender',
            header: 'GENDER',
            size: 150,
            defaultHiddenColumn: true,
            Cell: ({ row }) => <>{row?.original?.gender === 0 ? 'Male' : 'Female' || "-"}</>
        },
        {
            accessorKey: 'image',
            header: 'IMAGE',
            size: 50,
            enableColumnFilter: false,
            enableSorting: false,
            // defaultHiddenColumn: true,
            Cell: ({ row }) => <>
                {
                    <>
                        {row?.original?.image ?
                            <>
                                <div onClick={() => { setSelectedImage(row?.original?.image), setVisible(true) }}>
                                    <img
                                        src={row?.original?.image}
                                        alt='user img'
                                        style={{ objectFit: 'cover', width: '75px', height: '75px', cursor: 'pointer' }}
                                    />
                                </div>
                            </>
                            : '-'
                        }
                    </>
                }</>
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
                        tableNameProp='users'
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
                                onClick={() => getUserDataById(row?.original?.id)}
                            />
                        </div>

                        <div style={{ background: "rgb(238 51 94 / 10%)" }} className='editDeleteButton delete'>
                            <MdDelete style={{ color: 'rgb(238,51,94)' }}
                                onClick={() => (DeleteRecord(row?.original?.id, deleteUser, showNotification))} />
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
                    label='Add User'
                    onClick={() => navigate('/pages/users/add')}
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                <TableContainer
                    title='User List'
                    columns={columns}
                    data={usersList}
                    defaultFilter={defaultFilter}
                    setDefaultFilter={setDefaultFilter}
                    rowCount={rowCount}
                />
            </div>

            {
                visible &&
                <ImageModel
                    visible={visible}
                    setVisible={setVisible}
                    src={selectedImage}
                    alt='user img'
                    style={{ width: '300px', height: '300px' }}
                />
            }
        </CCardBody>
    )
}

export default UsersList
