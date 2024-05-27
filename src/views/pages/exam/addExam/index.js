import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CForm, CFormLabel, CRow } from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { allDispatch } from '../../../../allDispatch'
import { InputBox, InputTextArea } from '../../../forms/inputBox'
import { statusData } from '../../utils/helper'
import SelectBox from '../../../forms/selectOption'
import FormButton from '../../../forms/formButton'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FormDatePicker, FormTimePicker } from '../../../forms/dateTimePicker'
import { addExam, getExamDataByIdApi, updateExamDataApi } from '../../../../api/exam'
import { subjectDataApi } from '../../../../api/subject'
import { examTypeDataApi } from '../../../../api/examType'
import { standardDataApi } from '../../../../api/standard'
import { ValidationTag } from '../../../../validation'
import RadioCheckBoxButton from '../../../forms/radioCheckBoxButton'
import { questionTypeDataApi } from '../../../../api/questionType'

const AddExam = () => {
    const { showNotification } = allDispatch();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [addData, setAddData] = useState({
        subject_id: '',
        standard_id: '',
        exam_type_id: '',
        total_questions: '',
        total_marks: '',
        date: '',
        exam_duration: '',
        start_time: '',
        end_time: '',
        description: '',
        min_percentage: '',
        status: '',
        questionType: [],
    });

    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        const form = event.currentTarget;

        event.preventDefault()
        event.stopPropagation()

        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            setValidated(true);
            ValidationTag();
            setError(ValidationTag(addData))
        } else {

            if (location?.state?.editData) {
                let response = await updateExamDataApi(addData);
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true
                    });
                    setValidated(true);
                    navigate("/pages/exam/list");
                } else {
                    showNotification({
                        title: "Error",
                        message: response?.data?.message,
                        status: 'danger',
                        isOpen: true
                    });
                }
            } else {
                let response = await addExam({ ...addData, questionType: addQuestionTypeData });
                if (response.status === 200) {
                    showNotification({
                        title: "Success",
                        message: response?.data?.message,
                        status: 'success',
                        isOpen: true
                    });
                    setValidated(true);
                    navigate("/pages/exam/list");
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


    const getExamDataById = async (id) => {
        const response = await getExamDataByIdApi(id);
        if (response?.status === 200) {
            setAddData(response?.data?.data);
        } else if (response?.status === 401) {
            navigate('/')
        }
    }

    // subjects data
    const [subjectData, setSubjectData] = useState([]);
    const getSubjectData = async () => {
        try {
            const response = await subjectDataApi({
                filters: [{
                    id: 'status',
                    value: 1
                }]
            });

            if (response?.status === 200) {
                if (response.data?.data?.rows) {
                    let subjects = response.data.data.rows.map(subject => ({
                        label: subject?.name,
                        value: subject?.id
                    }));
                    setSubjectData(subjects);
                }
            }
        } catch (error) {
            console.log('error:', error);
        }
    };

    // exam type data
    const [examTypeData, setExamTypeData] = useState([]);
    const getExamTypeData = async () => {
        try {
            const response = await examTypeDataApi({
                filters: [{
                    id: 'status',
                    value: 1
                }]
            });

            if (response?.status === 200) {
                if (response.data?.data?.rows) {
                    let examType = response.data.data.rows.map(type => ({
                        label: type?.name,
                        value: type?.id
                    }));
                    setExamTypeData(examType);
                }
            }
        } catch (error) {
            console.log('error:', error);
        }
    }

    // standard data
    const [standardData, setStandard] = useState([]);
    const getStandardData = async () => {
        try {
            const response = await standardDataApi({
                filters: [{
                    id: 'status',
                    value: 1
                }]
            });

            if (response?.status === 200) {
                if (response.data?.data?.rows) {
                    let standard = response.data.data.rows.map(type => ({
                        label: type?.name,
                        value: type?.id
                    }));
                    setStandard(standard);
                }
            }
        } catch (error) {
            console.log('error:', error);
        }
    }

    // question type data
    const [questionTypeData, setQuestionTypeData] = useState([]);
    const getQuestionType = async () => {
        try {
            const response = await questionTypeDataApi({
                filters: [{
                    id: 'status',
                    value: 1
                }]
            });

            if (response?.status === 200) {
                if (response.data?.data?.rows) {
                    let questionType = response.data.data.rows.map(type => ({
                        label: type?.name,
                        value: type?.id,
                        id: type?.id
                    }));
                    setQuestionTypeData(questionType);
                }
            }
        } catch (error) {
            console.log('error:', error);
        }
    }
    console.log('questionTypeData: state data ', questionTypeData);

    useEffect(() => {
        getSubjectData();
        getExamTypeData();
        getStandardData();
        getQuestionType();

        if (location?.state?.editData || location?.state?.id) {
            getExamDataById(location?.state?.id);
        }

    }, []);

    // if change start time then null end time
    useEffect(() => {
        if (addData?.start_time) {
            setAddData({ ...addData, end_time: '' })
        }
    }, [addData?.start_time]);

    const darshita = (e) => {
        let checked = e.target.checked;
        let value = e.target.value;
        setAddData(prevState => {
            let newQuestionType;
            if (checked) {
                newQuestionType = [...prevState.questionType, { question_type_id: value }];
            } else {
                newQuestionType = prevState.questionType.filter(qt => qt.question_type_id !== value);
            }
            return { ...prevState, questionType: newQuestionType };
        });
    }
    const ok = addData?.questionType.filter(item1 => {
        return questionTypeData.filter(item2 => item2?.id_rt === item1?.id_rt)
    });
    const excludedPerson = addData?.questionType.map(
        (person1) => !questionTypeData.some((person2) => person1.value === person2.value)
    );
    console.log("ok >>", excludedPerson);
    return (
        <CRow className="justify-content-center">
            <CCol lg={10}>
                <CCard style={{
                    border: 'none',
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    height: 'calc(-24px + 100%)'
                }}
                >
                    <h4 style={{ padding: '20px', borderBottom: '1px solid #8080803b' }}>{location?.state?.editData ? 'Edit Exam' : 'Add Exam'}</h4>
                    <CCardBody style={{ padding: '30px' }}>
                        <CForm
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >

                            <div className='row'>
                                {/* add subject */}
                                <div className='col-12 col-md-6 mb-3'>
                                    <SelectBox
                                        ariaLabel="Select Subject"
                                        label="Subject"
                                        value={addData?.subject_id}
                                        onChange={(event) => setAddData({ ...addData, subject_id: event.target.value })}
                                        feedbackInvalid="Subject is required"
                                        id="validationSubject"
                                        options={subjectData}
                                        required={true}
                                    />
                                </div>

                                {/* add standard */}
                                <div className='col-12 col-md-6 mb-3'>
                                    <SelectBox
                                        ariaLabel="Select Standard"
                                        label="Standard"
                                        value={addData?.standard_id}
                                        onChange={(event) => setAddData({ ...addData, standard_id: event.target.value })}
                                        feedbackInvalid="Standard is required"
                                        id="validationStandard"
                                        options={standardData}
                                        required={true}
                                    />
                                </div>

                                {/* add exam type */}
                                <div className='col-12 col-md-6 mb-3'>
                                    <SelectBox
                                        ariaLabel="Select Exam type"
                                        label="Exam Type"
                                        value={addData?.exam_type_id}
                                        onChange={(event) => setAddData({ ...addData, exam_type_id: event.target.value })}
                                        feedbackInvalid="Exam Type is required"
                                        id="validationExamType"
                                        options={examTypeData}
                                        required={true}
                                    />
                                </div>

                                {/* total question */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="Total Question is required"
                                        id="validationTotalQuestion"
                                        label="Total Question"
                                        placeholder="Total Question"
                                        type="Text"
                                        name='total_question'
                                        value={addData?.total_questions}
                                        onChange={(event) => setAddData({ ...addData, total_questions: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* Total Marks */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="Total Marks is required"
                                        id="validationUserName"
                                        label="Total Marks"
                                        placeholder="Total Marks"
                                        type="Text"
                                        name='total_marks'
                                        value={addData?.total_marks}
                                        onChange={(event) => setAddData({ ...addData, total_marks: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* exam date */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <FormDatePicker
                                        value={addData?.date}
                                        label="Exam Date"
                                        name='Exam Date'
                                        setAddData={setAddData}
                                        setError={setError}
                                        error={error?.date}
                                        formKeyName='date'
                                    />
                                </div>

                                {/* duration */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="Duration is required"
                                        id="validationDuration"
                                        label="Duration"
                                        placeholder="Duration"
                                        type="Text"
                                        name='exam_duration'
                                        value={addData?.exam_duration}
                                        onChange={(event) => setAddData({ ...addData, exam_duration: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* start time */}
                                <div className='col-12 col-md-6 mb-3 fw-600 '>
                                    <FormTimePicker
                                        value={addData?.start_time}
                                        label="Start Time"
                                        name='Start Time'
                                        setAddData={setAddData}
                                        setError={setError}
                                        error={error?.start_time}
                                        formKeyName='start_time'
                                    />
                                </div>

                                {/* end time */}
                                <div className='col-12 col-md-6 mb-3 fw-600 '>
                                    <FormTimePicker
                                        value={addData?.end_time}
                                        label="End Time"
                                        name='End Time'
                                        setAddData={setAddData}
                                        setError={setError}
                                        error={error?.end_time}
                                        formKeyName='end_time'
                                    />
                                </div>

                                {/* Min Percentage */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputBox
                                        feedbackInvalid="Min Percentage is required"
                                        id="validationUserName"
                                        label="Min Percentage"
                                        placeholder="Min Percentage"
                                        type="Text"
                                        name='min_percentage'
                                        value={addData?.min_percentage}
                                        onChange={(event) => setAddData({ ...addData, min_percentage: event.target.value })}
                                        // onChange={handleChange}
                                        required={true}
                                    />
                                </div>

                                {/* description */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <InputTextArea
                                        feedbackInvalid="Description is required"
                                        id="validationDescription"
                                        label="Description"
                                        placeholder="Description"
                                        name='description'
                                        value={addData?.description}
                                        onChange={(event) => setAddData({ ...addData, description: event.target.value })}
                                        rows={3}
                                        required={true}
                                    />
                                </div>

                                {/* question type */}
                                <div className='col-12 col-md-6 mb-3 fw-600'>
                                    <RadioCheckBoxButton
                                        label='Question Type'
                                        id="flexGenderQuestionType"
                                        name="questionType"
                                        radioCheckBoxButtonData={questionTypeData}
                                        value={addData?.questionType?.question_type_id}
                                        type='checkbox'
                                        onChange={(e) => darshita(e)}
                                        style={{ gap: '20px' }}
                                        required={true}
                                        checked={addData?.questionType}
                                    />
                                </div>
                                {
                                    // addData?.questionType?.map((questionType) => {
                                    //     questionType?.question_type_id &&
                                    //         console.log("aama aayu",questionType),
                                    //         <div className='col-12 col-md-6 mb-3 fw-600'>
                                    //             <InputBox
                                    //                 ariaLabel="Select Subject"
                                    //                 label={`Number of Question`}
                                    //                 value={addData?.subject_id}
                                    //                 onChange={(event) => setAddData({ ...addData, subject_id: event.target.value })}
                                    //                 feedbackInvalid="Subject is required"
                                    //                 id="validationSubject"
                                    //                 options={subjectData}
                                    //                 required={true}
                                    //             />
                                    //         </div>
                                    // })
                                    addData?.questionType.map(() => {
                                        const ans = (person1) => !questionTypeData.some((person2) => person1.value === person2.value)
                                    })
                                }

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
                                <Link to={'/pages/exam/list'}>
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

export default AddExam
