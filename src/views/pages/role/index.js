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

const RoleList = () => {
    const navigate = useNavigate();
    const { showNotification } = allDispatch();

    const [roleList, setRoleList] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const [defaultFilter, setDefaultFilter] = useState({
        "currentPage": 1,
        "itemsPerPage": 5,
        "sortBy": [],
        "filters": []
    });

    const roleData = async () => {
        const response = await roleDataApi(defaultFilter);
        if (response?.status === 200) {
            setRoleList(response?.data?.data?.rows);
            setRowCount(response?.data?.data?.count);
        } else if (response?.status === 401) {
            navigate("/");
        }
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'ROLE NAME',
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
            enableHiding: false, // hide thase j ny aa column ane hide thy pn ske aa proprty thi
            Cell: ({ row }) => (
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: '10px', justifyContent: 'center' }}>
                        <div style={{ background: "rgb(88 86 214 / 8%)" }} className='editDeleteButton edit'
                        >
                            <CiEdit style={{ color: 'rgb(4 0 255)' }}
                                onClick={() => getRoleDataById(row?.original?.id)}
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
    const getRoleDataById = async (id) => {
        navigate('/pages/role/edit', {
            state: {
                id: id,
                editData: true
            }
        });
    }

    useEffect(() => {
        roleData();
    }, [defaultFilter, roleList]);

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
                    label='Add Role'
                    onClick={() => navigate('/pages/role/add')}
                />
            </div>

            <TableContainer
                title='Role List'
                columns={columns}
                data={roleList}
                defaultFilter={defaultFilter}
                setDefaultFilter={setDefaultFilter}
                rowCount={rowCount}
            />
        </CCardBody>
    )
}

export default RoleList
