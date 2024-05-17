import React, { useEffect, useMemo, useState } from 'react'
import { CCard, CCardBody, CCol, CForm, CFormCheck, CFormInput, CImage, CRow } from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { allDispatch } from '../../../../allDispatch'
import InputBox from '../../../forms/inputBox'
import { statusData } from '../../utils/helper'
import SelectBox from '../../../forms/selectOption'
import { addUser, getUsersDataByIdApi, updateUser } from '../../../../api/user'
import { roleDataApi } from '../../../../api/role'
import FormButton from '../../../forms/formButton'
import RadioButton from '../../../forms/radioButton'

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
        role_id: '',
        gender: '',
        status: '',
        imageName: ''
    });

    // console.log('addData: ', addData);


    const handleSubmit = async (event) => {
        let formData = new FormData();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault();
            if (location?.state?.editData) {
                formData.append("id", location?.state?.id);
                formData.append("first_name", addData?.first_name);
                formData.append("last_name", addData?.last_name);
                formData.append("username", addData?.username);
                formData.append("email", addData?.email);
                formData.append("file", addData?.image);
                formData.append("phone_no", addData?.phone_no);
                formData.append("role_id", addData?.role_id);
                formData.append("gender", addData?.gender);
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
                formData.append("role_id", addData?.role_id);
                formData.append("gender", addData?.gender);
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
        form.classList.add('was-validated');
        setValidated(true);
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
                                <div className='col-12 col-md-6'>
                                    {/* first name */}
                                    <div className="mb-3 fw-600">
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
                                </div>

                                <div className='col-12 col-md-6'>
                                    {/* last name */}
                                    <div className="mb-3 fw-600">
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
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    {/* user name */}
                                    <div className="mb-3 fw-600">
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

                                </div>

                                <div className='col-12 col-md-6'>
                                    {/* email */}
                                    <div className="mb-3 fw-600">
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
                                </div>
                            </div>

                            {/* password feild */}
                            <div className='row' style={{ display: location?.state?.editData ? 'none' : 'flex' }}>
                                <div className='col-12 col-md-6'>
                                    {/* password */}
                                    <div className="mb-3 fw-600">
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
                                </div>

                                <div className='col-12 col-md-6'>
                                    {/* confirm password */}
                                    <div className="mb-3 fw-600">
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
                            </div>

                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    {/* Phone no */}
                                    <div className="mb-3 fw-600">
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
                                </div>

                                <div className='col-12 col-md-6'>
                                    {/* image */}
                                    <div className="mb-3 fw-600">
                                        <CFormInput
                                            feedbackInvalid="Image is required"
                                            id="formFile"
                                            label="Upload Image"
                                            placeholder="Image"
                                            type="file"
                                            name='image'
                                            onChange={handleImageUpload}
                                            required={true}
                                        />
                                        {
                                            images &&
                                            <CImage rounded thumbnail src={images} width={50} height={50} />

                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                {/* gender */}
                                <div className='col-12 col-md-6'>
                                    <div className='mb-3 fw-600'>
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
                                </div>

                                <div className='col-12 col-md-6'>
                                    <div className='mb-3 fw-600'>
                                        address
                                        {/* <RadioButton
                                            label='Gender'
                                            type="radio"
                                            id="flexGenderRadioBtn"
                                            name="gender"
                                            radioButtonData={radioButtonData}
                                            value={addData?.gender}
                                            onChange={(event) => setAddData({ ...addData, gender: event.target.value })}
                                            style={{ gap: '20px' }}
                                        /> */}
                                    </div>
                                </div>

                            </div>

                            <div className='row'>
                                <div className='col-12 col-md-6'>
                                    {/* add role */}
                                    <div className="mb-3">
                                        <SelectBox
                                            aria-label="select Role"
                                            label="Role"
                                            value={addData?.role_id}
                                            onChange={(event) => setAddData({ ...addData, role_id: event.target.value })}
                                            feedbackInvalid="Role is required"
                                            id="validationRole"
                                            options={roleData}
                                            required={true}
                                        />
                                    </div>
                                </div>

                                <div className='col-12 col-md-6'>
                                    {/* status */}
                                    <div className="mb-3">
                                        <SelectBox
                                            aria-label="select Status"
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
