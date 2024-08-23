import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CForm, CRow } from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { allDispatch } from '../../../../store/allDispatch'
import { InputBox } from '../../../forms/inputBox'
import { statusData } from '../../utils/helper'
import SelectBox from '../../../forms/selectOption'
import FormButton from '../../../forms/formButton'
import { addExamType, getExamTypeDataByIdApi, updateExamTypeDataApi } from '../../../../api/examType'

const AddExamType = () => {
    const { showNotification } = allDispatch();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        name: '',
        status: '',
    });

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault();
            if (location?.state?.editData) {
                let response = await updateExamTypeDataApi(formData);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true
                    });
                    setValidated(true);
                    navigate("/pages/exam-type/list");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            } else {
                let response = await addExamType(formData);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true
                    });
                    setValidated(true);
                    navigate("/pages/exam-type/list");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            }
        }
        form.classList.add('was-validated');
        setValidated(true);
    }

    const getExamTypeDataById = async (id) => {
        const response = await getExamTypeDataByIdApi(id);
        if (response?.status === 200) {
            setFormData(response?.data?.data);
        } else if (response?.status === 401) {
            navigate('/')
        }
    }

    useEffect(() => {
        if (location?.state?.editData || location?.state?.id) {
            getExamTypeDataById(location?.state?.id);
        }
    }, []);

    return (
        <CRow className="justify-content-center">
            <CCol lg={10}>
                <CCard style={{
                    border: 'none',
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    height: 'calc(-24px + 100%)'
                }}
                >
                    <h4 style={{ padding: '20px', borderBottom: '1px solid #8080803b' }}>{location?.state?.editData ? 'Edit Exam Type' : 'Add Exam Type'}</h4>
                    <CCardBody style={{ padding: '30px' }}>
                        <CForm
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-3 fw-600">
                                <InputBox
                                    feedbackInvalid="Exam Type is required"
                                    id="validationExamType"
                                    label="Exam Type"
                                    placeholder="Name"
                                    type="Text"
                                    value={formData.name}
                                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                                    required={true}
                                />
                            </div>
                            <div className="mb-3">
                                <SelectBox
                                    ariaLabel="Select Status"
                                    label="Status"
                                    value={formData.status}
                                    onChange={(event) => setFormData({ ...formData, status: event.target.value })}
                                    feedbackInvalid="Status is required"
                                    id="validationStatus"
                                    options={statusData}
                                    required
                                />
                            </div>
                            <div className="d-flex gap-3 d justify-content-center align-items-center my-4">
                                <Link to={'/pages/exam-type/list'}>
                                    <FormButton
                                        style={{
                                            color: 'white', fontSize: '16px', fontWeight: '500',
                                            backgroundColor: 'var(--cui-secondary)',
                                            textAlign: 'end'
                                        }}
                                        label='Cancel'
                                        hoverBgColor='#44484b'
                                        hoverFontColor='white'
                                    />
                                </Link>
                                <FormButton
                                    style={{
                                        color: 'white', fontSize: '16px', fontWeight: '500',
                                        backgroundColor: 'var(--cui-primary)',
                                        textAlign: 'end'
                                    }}
                                    hoverBgColor='#4846db'
                                    hoverFontColor='white'
                                    label='Submit'
                                    type='submit'
                                />
                            </div>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow >

    )
}

export default AddExamType
