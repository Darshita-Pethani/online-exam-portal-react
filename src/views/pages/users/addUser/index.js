import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CForm, CFormInput, CImage, CRow } from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { allDispatch } from '../../../../allDispatch'
import { InputBox, InputTextArea } from '../../../forms/inputBox'
import { statusData } from '../../utils/helper'
import SelectBox from '../../../forms/selectOption'
import { addUser, getUsersDataByIdApi, updateUser } from '../../../../api/user'
import { roleDataApi } from '../../../../api/role'
import FormButton from '../../../forms/formButton'
import RadioButton from '../../../forms/radioButton'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FormDatePicker } from '../../../forms/datePicker'

const AddUser = () => {
    const { showNotification } = allDispatch();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [addData, setAddData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        image: '',
        phone_no: '',
        address: '',
        role_id: '',
        gender: '',
        date_of_birth: '',
        status: '',
        imageName: ''
    });

    const [formDateError, setFormDateError] = useState('');

    const validateDateOfBirth = () => {
        if (!addData?.date_of_birth || addData?.date_of_birth === null) {
            setFormDateError('Date of Birth is required');
            return false;
        } else {
            setFormDateError('');
            return true;
        }
    };

    const handleSubmit = async (event) => {
        let formData = new FormData();
        const form = event.currentTarget;

        event.preventDefault()
        event.stopPropagation()

        if (form.checkValidity() === false) {
            validateDateOfBirth();
            form.classList.add('was-validated');
            setValidated(true);
        } else {
            validateDateOfBirth();
            if (!validateDateOfBirth()) {
                return;
            }
            if (location?.state?.editData) {
                formData.append("id", location?.state?.id);
                formData.append("first_name", addData?.first_name);
                formData.append("last_name", addData?.last_name);
                formData.append("username", addData?.username);
                formData.append("email", addData?.email);
                formData.append("file", addData?.image);
                formData.append("phone_no", addData?.phone_no);
                formData.append("address", addData?.address);
                formData.append("role_id", addData?.role_id);
                formData.append("gender", addData?.gender);
                formData.append("date_of_birth", addData?.date_of_birth);
                formData.append("status", addData?.status);
                let response = await updateUser(formData);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true
                    });
                    setValidated(true);
                    navigate("/pages/users/list");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            } else {
                formData.append("first_name", addData?.first_name);
                formData.append("last_name", addData?.last_name);
                formData.append("username", addData?.username);
                formData.append("email", addData?.email);
                formData.append("file", addData?.image);
                formData.append("password", addData?.password);
                formData.append("confirm_password", addData?.confirm_password);
                formData.append("phone_no", addData?.phone_no);
                formData.append("address", addData?.address);
                formData.append("role_id", addData?.role_id);
                formData.append("gender", addData?.gender);
                formData.append("date_of_birth", addData?.date_of_birth);
                formData.append("status", addData?.status);
                let response = await addUser(formData);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true
                    });
                    setValidated(true);
                    navigate("/pages/users/list");
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

    }

    const getUserDataById = async (id) => {
        const response = await getUsersDataByIdApi(id);
        if (response?.status === 200) {
            setAddData({ ...addData, ...response?.data?.data, imageName: "C:\\fakepath\\admin_img.png" });
            // setAddData({ ...response?.data?.data, imageName: '' });
            // setAddData(response?.data?.data);
            setImage(response?.data?.data?.image);
            // document.getElementById("validationImage").value = "testing@gmail.com";
        } else if (response?.status === 401) {
            navigate('/')
        }
    }

    useEffect(() => {
        if (location?.state?.editData || location?.state?.id) {
            getUserDataById(location?.state?.id);
        }
    }, []);

    const [images, setImage] = useState(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(event.target.files[0]));
        // to set image name cause img is input type file obj not set in value feild
        // to set image file in this
        setAddData({ ...addData, image: file, imageName: event.target.value });
    }

    // roles data
    const [roleData, setRoleData] = useState([])
    const getRolesData = async () => {
        try {
            const response = await roleDataApi({
                filters: [{
                    id: 'status',
                    value: 1
                }]
            });

            if (response?.status === 200) {
                if (response.data?.data?.rows) {
                    let roles = response.data.data.rows.map(role => ({
                        label: role?.name,
                        value: role?.id
                    }));
                    setRoleData(roles);
                }
            }
        } catch (error) {
            console.log('error:', error);
        }
    };

    useEffect(() => {
        getRolesData();
    }, []);

    // radioButtonData
    const radioButtonData = [
        {
            label: 'Male',
            value: 0,
            id: "flexMaleRadioBtn",
            defaultChecked: true
        },
        {
            label: 'Female',
            value: 1,
            id: "flexFemaleRadioBtn"
        },
    ]

    return (
        <CRow className="justify-content-center">
            <CCol lg={10}>
                <CCard style={{
                    border: 'none',
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    height: 'calc(-24px + 100%)'
                }}
                >
                    <h4 style={{ padding: '20px', borderBottom: '1px solid #8080803b' }}>{location?.state?.editData ? 'Edit User' : 'Add User'}</h4>
                    <CCardBody style={{ padding: '30px' }}>
                        <CForm
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <div className='row'>
                                {/* first name */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="First Name is required"
                                        id="validationFirstName"
                                        label="First Name"
                                        placeholder="First Name"
                                        type="Text"
                                        name='first_name'
                                        value={addData?.first_name}
                                        onChange={(event) => setAddData({ ...addData, first_name: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* last name */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="Last Name is required"
                                        id="validationLastName"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="Text"
                                        name='last_name'
                                        value={addData?.last_name}
                                        onChange={(event) => setAddData({ ...addData, last_name: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* user name */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="User Name is required"
                                        id="validationUserName"
                                        label="User Name"
                                        placeholder="User Name"
                                        type="Text"
                                        name='username'
                                        value={addData?.username}
                                        onChange={(event) => setAddData({ ...addData, username: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* email */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="Email is required"
                                        id="validationEmail"
                                        label="Email"
                                        placeholder="Email"
                                        type="email"
                                        name='email'
                                        value={addData?.email}
                                        onChange={(event) => setAddData({ ...addData, email: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* password feild */}
                                <div className='row' style={{ display: location?.state?.editData ? 'none' : 'flex' }}>
                                    {/* password */}
                                    <div className='col-12 col-md-6 mb-3 fw-600'>
                                        <InputBox
                                            feedbackInvalid="Password is required"
                                            id="validationPassword"
                                            label="Password"
                                            placeholder="Password"
                                            type="password"
                                            name='password'
                                            value={addData?.password}
                                            onChange={(event) => setAddData({ ...addData, password: event.target.value })}
                                            // onChange={handleChange}
                                            required={location?.state?.editData ? false : true}
                                        />
                                    </div>

                                    {/* confirm password */}
                                    <div className='col-12 col-md-6 mb-3 fw-600'>
                                        <InputBox
                                            feedbackInvalid="Confirm Password is required"
                                            id="validationConfirm"
                                            label="Confirm Password"
                                            placeholder="Confirm Password"
                                            type="password"
                                            name='confirm_password'
                                            value={addData?.confirm_password}
                                            onChange={(event) => setAddData({ ...addData, confirm_password: event.target.value })}
                                            // onChange={handleChange}
                                            required={location?.state?.editData ? false : true}
                                        />
                                    </div>
                                </div>

                                {/* Phone no */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="Phone no is required"
                                        id="validationPhonNo"
                                        label="Phone no."
                                        placeholder="Phone no"
                                        type="text"
                                        name='phoneNo'
                                        value={addData?.phone_no}
                                        onChange={(event) => setAddData({ ...addData, phone_no: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* address */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputTextArea
                                        feedbackInvalid="Address is required"
                                        id="validationAddress"
                                        label="Address"
                                        placeholder="Address"
                                        name='address'
                                        value={addData?.address}
                                        onChange={(event) => setAddData({ ...addData, address: event.target.value })}
                                        rows={3}
                                        required={true}
                                    />
                                </div>

                                {/* date picker */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <FormDatePicker
                                        value={addData?.date_of_birth}
                                        label="Date of Birth"
                                        name='Date of Birth'
                                        setAddData={setAddData}
                                        setFormDateError={setFormDateError}
                                        formDateError={formDateError}
                                        formKeyName='date_of_birth'
                                    />
                                </div>

                                {/* image */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <CFormInput
                                        feedbackInvalid="Image is required"
                                        id="formFile"
                                        label="Upload Image"
                                        placeholder="Image"
                                        type="file"
                                        name='image'
                                        onChange={handleImageUpload}
                                        required={!(location?.state?.editData && addData?.image !== null) ? true : false}
                                    />
                                    {
                                        images &&
                                        <CImage rounded thumbnail src={images} width={50} height={50} />

                                    }
                                </div>

                                {/* gender */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <RadioButton
                                        label='Gender'
                                        type="radio"
                                        id="flexGenderRadioBtn"
                                        name="gender"
                                        radioButtonData={radioButtonData}
                                        value={addData?.gender}
                                        onChange={(event) => setAddData({ ...addData, gender: event.target.value })}
                                        style={{ gap: '20px' }}
                                    />
                                </div>

                                {/* add role */}
                                <div className='col-12 col-md-6 mb-3'>
                                    <SelectBox
                                        ariaLabel="Select Role"
                                        label="Role"
                                        value={addData?.role_id}
                                        onChange={(event) => setAddData({ ...addData, role_id: event.target.value })}
                                        feedbackInvalid="Role is required"
                                        id="validationRole"
                                        options={roleData}
                                        required={true}
                                    />
                                </div>

                                {/* status */}
                                <div className='col-12 col-md-6 mb-3'>
                                    <SelectBox
                                        ariaLabel="Select Status"
                                        label="Status"
                                        value={addData?.status}
                                        onChange={(event) => setAddData({ ...addData, status: event.target.value })}
                                        feedbackInvalid="Status is required"
                                        id="validationStatus"
                                        options={statusData}
                                        required
                                    />
                                </div>
                            </div>

                            {/* buttons */}
                            <div className="d-flex gap-3 d justify-content-center align-items-center my-4">
                                <Link to={'/pages/users/list'}>
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

export default AddUser
