import React, { useEffect, useState } from 'react';
import {
    CForm, CFormInput, CImage
} from '@coreui/react';
import styled from 'styled-components';
import FormButton from '../forms/formButton';
import RadioCheckBoxButton from '../forms/radioCheckBoxButton';
import { InputBox, InputTextArea } from '../forms/inputBox';
import { ValidationTag } from '../../validation';
import { updateUser, userProfile } from '../../api/user';
import { allDispatch } from '../../store/allDispatch';
import { useNavigate } from 'react-router-dom';
import { FormDatePicker } from '../forms/dateTimePicker';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';

const ProfileHeader = styled.div`
    position: relative;
    background: #f0f0f0;
    height: 150px;

    @media (max-width: 768px) {
        height: 100px;
    }
`;

const ProfileInfo = styled.div`
    padding: 0 20px;
    margin-top: 90px;
    text-align: center;

    @media (max-width: 768px) {
        text-align: center;
        margin-top: 100px;
    }
`;

const ContactInfo = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex-direction: column;

    @media (max-width: 768px) {
        gap: 5px;
    }
`;

const FormSectionDiv = styled.div`
    padding: 20px;
    display: flex;
    padding: 20px;
    gap: 20px;
    
    @media (max-width: 768px) {
        padding: 10px;
        flex-direction: column;
    }
`;

const ProfileImage = styled(CImage)`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ImageUploadWrapper = styled.div`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid white;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ image }) => (image ? '#f0f0f0' : '#ff00002e')}; // Conditional bg color

    @media (max-width: 768px) {
        top: 60px;
    }

    input[type="file"] {
        display: none; // Hide the default file input
    }

    label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
`;

const ProfileView = (props) => {
    const navigate = useNavigate();
    const { showNotification, setUserLoginToken, setUserLoginData } = allDispatch()
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');
    const [images, setImage] = useState(null);

    const [addData, setAddData] = useState({
        id: "",
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        image: '',
        phone_no: '',
        address: '',
        gender: '',
        date_of_birth: '',
        imageName: ''
    });

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(URL.createObjectURL(event.target.files[0]));
        // to set image name cause img is input type file obj not set in value feild
        // to set image file in this
        setAddData({ ...addData, image: file, imageName: event.target.value });
    }

    // cancel image
    const handleImageCancel = () => {
        setImage(null);
        setAddData({ ...addData, image: null, imageName: null });
    }

    const getUserData = async () => {
        const response = await userProfile();
        if (response?.status === 200) {
            setAddData({ ...addData, ...response?.data?.data, imageName: "C:\\fakepath\\admin_img.png", standard_id: response?.data?.data?.standard_user_relation?.standard?.id });
            setImage(response?.data?.data?.image);
        } else if (response?.status === 401) {
            navigate('/')
        }
    }

    const handleSubmit = async (event) => {
        let formData = new FormData();
        const form = event.currentTarget;
        event.preventDefault()
        if (form.checkValidity() === false || !addData.image) {
            form.classList.add('was-validated');
            setValidated(true);
            ValidationTag();
            setError(ValidationTag(addData));
            event.stopPropagation();
        } else {
            formData.append("id", addData?.id);
            formData.append("first_name", addData?.first_name);
            formData.append("last_name", addData?.last_name);
            formData.append("username", addData?.username);
            formData.append("email", addData?.email);
            formData.append("file", addData?.image);
            formData.append("phone_no", addData?.phone_no);
            formData.append("address", addData?.address);
            formData.append("gender", addData?.gender);
            formData.append("date_of_birth", addData?.date_of_birth);
            let response = await updateUser(formData);
            if (response.status === 200) {
                setUserLoginData(JSON.stringify(response?.data?.data?.userReturnData))
                showNotification({
                    title: "Success",
                    message: response?.data?.message,
                    status: 'success',
                    isOpen: true
                });
                setValidated(true);
                navigate('/dashboard')
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

    useEffect(() => {
        getUserData()
    }, [props])

    return (
        <CForm
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
        >
            <FormSectionDiv>
                <div style={{ flex: "0 0 30%" }}>
                    {/* Profile Header with Background Image */}
                    <ProfileHeader>
                        <div onClick={handleImageCancel}
                            style={{
                                position: "absolute",
                                top: "65%",
                                left: "70%",
                                transform: " translate(-60%, -60%)",
                                zIndex: 2,
                                cursor: "pointer",
                                fontSize: "30px"
                            }}
                        >
                            <MdCancel />
                        </div>
                        <ImageUploadWrapper image={images}>
                            <label htmlFor="formFile">
                                {images ? (
                                    <ProfileImage src={images} alt="Profile" />

                                ) : (
                                    <span>Upload Image</span>
                                )}
                            </label>
                            <CFormInput
                                id="formFile"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </ImageUploadWrapper>
                    </ProfileHeader>
                    {/* Profile Basic Info */}
                    <ProfileInfo>
                        <h4 style={{ fontWeight: 'bold' }}>Jordan Hamidul</h4>
                        <p>A student information collection form is used by teachers to gather student data.</p>
                        <ContactInfo>
                            <span>🏠 {addData?.address}</span>
                            <span>📞 {addData?.phone_no}</span>
                            <span>✉️ {addData?.email}</span>
                        </ContactInfo>
                    </ProfileInfo>
                </div>
                <div style={{ flex: 1 }}>
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

                        {/* date of birth */}
                        <div className='col-12 col-md-6 mb-3 fw-600'>
                            <FormDatePicker
                                value={addData?.date_of_birth}
                                label="Date of Birth"
                                name='date_of_birth'
                                setAddData={setAddData}
                                setError={setError}
                                error={error?.date}
                                formKeyName='date_of_birth'
                                required={true}
                            />
                        </div>

                        {/* gender */}
                        <div className='col-12 col-md-6 mb-3 fw-600'>
                            <RadioCheckBoxButton
                                label='Gender'
                                type="radio"
                                id="flexGenderRadioBtn"
                                name="gender"
                                radioCheckBoxButtonData={radioButtonData}
                                value={addData?.gender}
                                onChange={(event) => setAddData({ ...addData, gender: event.target.value })}
                                style={{ gap: '20px' }}
                            />
                        </div>

                    </div>
                </div>
            </FormSectionDiv>

            {/* buttons */}
            <div className="d-flex gap-3 d justify-content-center align-items-center my-4">
                <FormButton
                    style={{
                        color: 'white', fontSize: '16px', fontWeight: '500',
                        backgroundColor: 'var(--cui-primary)',
                        textAlign: 'end'
                    }}
                    hoverBgColor='#4846db'
                    hoverFontColor='white'
                    label='update'
                    type='submit'
                />
            </div>
        </CForm>
    );
}

export default ProfileView;
