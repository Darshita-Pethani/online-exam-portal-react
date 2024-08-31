import React from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CFormInput, CFormLabel, CFormCheck, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCalendar } from '@coreui/icons';
import styled from 'styled-components';

const ProfileView = () => {
    return (
        <CCard>
            <div style={{ position: "relative" }}>
                <div>

                </div>
                <div style={{ width: "130px", height: "130px", position: "absolute" }}>
                    <img src="https://avatar.iran.liara.run/public/14" alt="Profile" style={{ width: "130px", height: "130px" }} />
                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h4>Jordan Hamidul</h4>
                        <p>A student information collection form is a document used by teachers to collect data about their students.</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span>🏠 Jamsed Pora USA 3564</span>
                            <span>📞 +880 345678990</span>
                            <span>✉️ jordanhamidul@gmail.com</span>
                        </div>
                    </div>
                </div> */}
            </div>
            <CCardBody>
                <CRow className="g-3">
                    <CCol md={6}>
                        <CFormLabel htmlFor="firstName">Fast Name</CFormLabel>
                        <CFormInput type="text" id="firstName" defaultValue="Jordan" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                        <CFormInput type="text" id="lastName" defaultValue="Hamidul" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="fatherName">Father Name</CFormLabel>
                        <CFormInput type="text" id="fatherName" defaultValue="Hamidul" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="motherName">Mother Name</CFormLabel>
                        <CFormInput type="text" id="motherName" defaultValue="Hamidul" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel>Gender</CFormLabel>
                        <div>
                            <CFormCheck inline type="radio" name="gender" id="male" label="Male" defaultChecked />
                            <CFormCheck inline type="radio" name="gender" id="female" label="Female" />
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="religion">Religion</CFormLabel>
                        <CFormInput type="text" id="religion" defaultValue="Islam" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="dob">Date Of Birth</CFormLabel>
                        <div className="input-group">
                            <CFormInput type="text" id="dob" defaultValue="01/2995/2022" />
                            <span className="input-group-text">
                                <CIcon icon={cilCalendar} />
                            </span>
                        </div>
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="admissionDate">Admission Date</CFormLabel>
                        <CFormInput type="text" id="admissionDate" defaultValue="01/2995/2022" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="class">Class</CFormLabel>
                        <CFormInput type="text" id="class" defaultValue="Inter" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="roll">Roll</CFormLabel>
                        <CFormInput type="text" id="roll" defaultValue="57" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="address">Address</CFormLabel>
                        <CFormInput type="text" id="address" defaultValue="House 06 Jamsed Pora" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="civilStatus">Civil Status</CFormLabel>
                        <CFormInput type="text" id="civilStatus" defaultValue="Single" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="id">ID</CFormLabel>
                        <CFormInput type="text" id="id" defaultValue="134567" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="subject">Subject</CFormLabel>
                        <CFormInput type="text" id="subject" defaultValue="20+" />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="location">Location</CFormLabel>
                        <CFormInput type="text" id="location" defaultValue="Jamshed Pora 3456" />
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    );
}

export default ProfileView;
