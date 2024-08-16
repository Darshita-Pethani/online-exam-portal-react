import React, { useEffect, useState } from 'react'
import { CButtonGroup, CCard, CCardBody, CCol, CForm, CFormCheck, CRow } from '@coreui/react'
import { json, Link, useLocation, useNavigate } from 'react-router-dom'
import { addRole, getRoleDataByIdApi, updateRoleDataApi } from '../../../../api/role'
import { allDispatch } from '../../../../store/allDispatch'
import { InputBox } from '../../../forms/inputBox'
import { statusData } from '../../utils/helper'
import SelectBox from '../../../forms/selectOption'
import FormButton from '../../../forms/formButton'
import { getModuleListApi } from '../../../../api/module'

const AddRole = () => {
    const { showNotification } = allDispatch()
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const [module, setModule] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        status: '',
    })

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault()
            if (location?.state?.editData) {
                let response = await updateRoleDataApi(formData)
                if (response.status === 200) {
                    showNotification({
                        title: 'Success',
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true,
                    })
                    setValidated(true)
                    navigate('/pages/role/list')
                } else {
                    showNotification({
                        title: 'Error',
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true,
                    })
                }
            } else {
                let response = await addRole(formData)
                if (response.status === 200) {
                    showNotification({
                        title: 'Success',
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true,
                    })
                    setValidated(true)
                    navigate('/pages/role/list')
                } else {
                    showNotification({
                        title: 'Error',
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true,
                    })
                }
            }
        }
        form.classList.add('was-validated')
        setValidated(true)
    }

    const getRoleDataById = async (id) => {
        const response = await getRoleDataByIdApi(id);
        if (response?.status === 200) {
            // setModule(response?.data?.data?.permissions)
            setFormData(response?.data?.data)
        } else if (response?.status === 401) {
            navigate('/')
        }
    }

    const getModuleAccess = async (value) => {
        const response = await getModuleListApi();
        const moduleData = response?.data?.data
        if (response.status === 200) {
            if (value === false) {
                const permissions = moduleData?.map((data) => {
                    return {
                        ...data,
                        permissions: {
                            read_access: false,
                            write_access: false,
                            delete_access: false
                        }
                    }
                });
                setModule(permissions);
            }

            if (value === true) {
                moduleData?.map((data) => {
                    const permissions = moduleData?.map((data) => {
                        return {
                            ...data,
                            permissions: {
                                read_access: false,
                                write_access: false,
                                delete_access: false
                            }
                        }
                    });
                    setModule(permissions);
                });
            }
        }
    }

    useEffect(() => {
        if (location?.state?.editData || location?.state?.id) {
            getRoleDataById(location?.state?.id);
            getModuleAccess(true)
        } else {
            let moduleData = localStorage.getItem('moduleData')
            setModule(moduleData ? JSON.parse(moduleData) : '');
            getModuleAccess(false)
        }
    }, [])

    const changeAccess = (index, checked, accessName) => {
        const newModules = [...module];
        const modulePermission = newModules[index];

        if (accessName === "read_access") {
            modulePermission.permissions.read_access = checked
        }

        if (accessName === "write_access") {
            modulePermission.permissions.write_access = checked
        }

        if (accessName === "delete_access") {
            modulePermission.permissions.delete_access = checked
        }

        console.log('newModules: ', modulePermission.permissions);

    }

    return (
        <CRow className="justify-content-center">
            <CCol lg={10}>
                <CCard
                    style={{
                        border: 'none',
                        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        height: 'calc(-24px + 100%)',
                    }}
                >
                    <h4 style={{ padding: '20px', borderBottom: '1px solid #8080803b' }}>
                        {location?.state?.editData ? 'Edit Role' : 'Add Role'}
                    </h4>
                    <CCardBody style={{ padding: '30px' }}>
                        <CForm noValidate validated={validated} onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-3 fw-600">
                                    <InputBox
                                        feedbackInvalid="Role name is required"
                                        id="validationRoleName"
                                        label="Role Name"
                                        placeholder="Role Name"
                                        type="Text"
                                        value={formData.name}
                                        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                        required={true}
                                    />
                                </div>
                                <div className="mb-3">
                                    <SelectBox
                                        ariaLabel="select Status"
                                        label="Status"
                                        value={formData.status}
                                        onChange={(event) => setFormData({ ...formData, status: event.target.value })}
                                        feedbackInvalid="Status is required"
                                        id="validationStatus"
                                        options={statusData}
                                        required
                                    />
                                </div>

                                <div className='my-5'>
                                    {module?.map((item, index) => (
                                        <>
                                            <div className='d-flex justify-content-between my-3' key={item.id}>
                                                <div>
                                                    {item?.name}
                                                </div>
                                                <div>
                                                    <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                                                        <CFormCheck
                                                            button={{ color: 'primary', variant: 'outline' }}
                                                            value={item?.permissions?.read_access}
                                                            id={`read${item?.id}`}
                                                            autoComplete="off"
                                                            label="Read"
                                                            onChange={(e) => changeAccess(index, e.target.checked, "read_access")}
                                                            checked={item?.permissions?.read_access}
                                                        />
                                                        <CFormCheck
                                                            value={item?.permissions?.write_access}
                                                            button={{ color: 'primary', variant: 'outline' }}
                                                            id={`write${item?.id}`}
                                                            autoComplete="off"
                                                            label="Write"
                                                            onChange={(e) => changeAccess(index, e.target.checked, "write_access")}
                                                            checked={item?.permissions?.write_access}
                                                        />
                                                        <CFormCheck
                                                            value={item?.permissions?.delete_access}
                                                            button={{ color: 'primary', variant: 'outline' }}
                                                            id={`delete${item?.id}`}
                                                            autoComplete="off"
                                                            label="Delete"
                                                            onChange={(e) => changeAccess(index, e.target.checked, "delete_access")}
                                                            checked={item?.permissions?.delete_access}
                                                        />
                                                    </CButtonGroup>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </div>

                                <div className="d-flex gap-3 d justify-content-center align-items-center my-4">
                                    <Link to={'/pages/role/list'}>
                                        <FormButton
                                            style={{
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                backgroundColor: 'var(--cui-secondary)',
                                                textAlign: 'end',
                                            }}
                                            label="Cancel"
                                            hoverBgColor="#44484b"
                                            hoverFontColor="white"
                                        />
                                    </Link>
                                    <FormButton
                                        style={{
                                            color: 'white',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            backgroundColor: 'var(--cui-primary)',
                                            textAlign: 'end',
                                        }}
                                        hoverBgColor="#4846db"
                                        hoverFontColor="white"
                                        label="Submit"
                                        type="submit"
                                    />
                                </div>
                            </div>

                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AddRole
