import React, { useEffect, useMemo, useState } from 'react'
import {
    CAlert,
    CAlertHeading,
    CAlertLink,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react'
import { roleDataApi } from '../../../api/role'
import { useNavigate } from 'react-router-dom'
import TableContainer from '../../../components/TableContainer'
import { Container } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const RoleList = () => {
    const navigate = useNavigate();
    const [roleList, setRoleList] = useState([]);

    const [defaultFilter, setDefaultFilter] = useState({
        "currentPage": 1,
        "itemsPerPage": 5,
        "sortBy": []
    });

    const columns = useMemo(() => [
        {
            accessor: 'name',
            header: 'Role Name',
            size: 150,
            Cell: ({ row }) => <>{row?.original?.name || "-"}</>
        },
        {
            accessor: 'status',
            header: 'Status',
            size: 150,
            Cell: ({ row }) => <>{row?.original?.status || "Hii"}</>
        }
    ], []);



    useEffect(() => {
        const roleData = async () => {
            const response = await roleDataApi();
            if (response?.status === 200) {
                setRoleList(response?.data?.data?.rows);
            } else if (response?.status === 401) {
                navigate("/");
            }
        }
        roleData()
    }, []);
    
    return (
        <CCard>
            <TableContainer
                title="Role List"
                columns={columns}
                data={roleList}
            />
        </CCard>
    )
}

export default RoleList
