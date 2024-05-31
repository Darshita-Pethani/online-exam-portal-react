import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CForm, CFormLabel, CRow } from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { allDispatch } from '../../../../allDispatch'
import { InputBox } from '../../../forms/inputBox'
import { statusData } from '../../utils/helper'
import SelectBox from '../../../forms/selectOption'
import FormButton from '../../../forms/formButton'
import { addQuestion, updateQuestionDataApi } from '../../../../api/question'
import { getExamDataByIdApi } from '../../../../api/exam'
import { MdDelete } from "react-icons/md";
import { CgMathPlus } from "react-icons/cg";
import { questionTypeDataApi } from '../../../../api/questionType'

const AddQuestion = () => {
    const { showNotification } = allDispatch();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [addData, setAddData] = useState({
        exam_id: '',
        questionList: []
    });

    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault();
            if (location?.state?.editData) {
                let response = await updateQuestionDataApi(addData);
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
                let response = await addQuestion(addData);
                if (response?.status === 200) {
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
        form.classList.add('was-validated');
        setValidated(true);
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

    // get exam data by id
    const [examQuestionTypeData, setExamQuestionTypeData] = useState([]);
    const getExamDataById = async (id) => {
        const response = await getExamDataByIdApi(id);
        if (response?.status === 200) {
            const questionTypeData = response?.data?.data?.exam_questiontype_relations
            setExamQuestionTypeData(questionTypeData);
            let questionList = [];
            questionTypeData?.map((q_id) => {
                // MCQ Type Question
                if (q_id?.question_type_id === 1) {
                    for (let i = 1; i <= q_id?.total_questions; i++) {
                        questionList.push({
                            "question": "",
                            "marks_per_question": "",
                            "ans": "",
                            "options": [
                                {
                                    "option_value": ""
                                },
                                {
                                    "option_value": ""
                                }
                            ]
                        })
                    }
                } else {
                    // Single Line Options
                    for (let i = 1; i <= q_id?.total_questions; i++) {
                        questionList.push({
                            "question": "",
                            "marks_per_question": "",
                            "ans": ""
                        })
                    }
                }
            });
            setAddData({ ...addData, questionList: questionList });
        } else if (response?.status === 401) {
            navigate('/')
        }
    }

    useEffect(() => {
        if (location?.state?.exam_id) {
            getExamDataById(location?.state?.exam_id);
        }
        getQuestionType();
    }, []);

    const [options, setOptions] = useState([]);
    const handleAddFelid = () => {
        setOptions([...options, { option_value: "" }]);
    }

    // delete feild
    const handleDeleteFelid = (i) => {
        console.log("i >>", i);
        const newTodo = [...options];
        // remove 1 item  selected position
        newTodo.splice(i, 1);
        setOptions(newTodo);
    };


    const addFelidValue = (value, name, i) => {
        console.log('value: ', value);
        console.log('i: ', i);
        let updatedQuestions = [...addData?.questionList];

        updatedQuestions[i - 1] = {
            ...updatedQuestions[i - 1],
            [name]: value
        };

        setAddData({
            ...addData,
            questionList: updatedQuestions
        });
    }

    const addOptionValue = (opValue, opName, opIndex) => {
        console.log('opIndex: ', opIndex);
        console.log('opValue: ', opValue);
        console.log('opName: ', opName);
        let updatedOption = [...addData?.questionList];
        let updatedCopyOption = [...updatedOption[opIndex - 1]?.options]
        console.log('updatedCopyOption: ', updatedCopyOption);
        updatedCopyOption[i - 1] = {
            ...updatedCopyOption[i - 1],
            [opName]: opValue
        };

        setAddData({
            ...addData,
            questionList: updatedQuestions
        });

    }

    console.log("adddata >>", addData);
    const formDetails = [];
    const renderForm = () => {
        examQuestionTypeData?.forEach((qt_id) => {
            if (qt_id?.question_type_id === 1) {
                for (let i = 1; i <= qt_id?.total_questions; i++) {
                    formDetails.push(
                        <div>
                            <h5>MCQ</h5>
                            <div className='col-12 mb-3 fw-600' id={`question-${i}`}>
                                {/* mark */}
                                <div className='d-flex align-items-baseline gap-3 justify-content-end'>
                                    <InputBox
                                        feedbackInvalid="Mark is required"
                                        id={`ValidationMark-${i}`}
                                        label="Mark"
                                        placeholder="Mark"
                                        type="Text"
                                        name='marks_per_question'
                                        style={{ width: '70px' }}
                                        value={addData?.questionList[i - 1]?.marks_per_question}
                                        onChange={(e) => addFelidValue(e.target.value, 'marks_per_question', i)}
                                        required={true}
                                    />
                                </div>

                                {/* question */}
                                <div>
                                    <InputBox
                                        feedbackInvalid="question is required"
                                        id={`Question ${i}`}
                                        label={`Question ${i}`}
                                        placeholder={`Question ${i}`}
                                        type="Text"
                                        name='question'
                                        value={addData?.questionList[i - 1]?.question}
                                        onChange={(e) => addFelidValue(e.target.value, 'question', i)}
                                        required={true}
                                    />
                                </div>

                                {/* option  */}
                                <div>
                                    <div className='d-flex align-items-center justify-content-between gap-3'>
                                        <div style={{ width: '100%' }}>
                                            <InputBox
                                                feedbackInvalid="option is required"
                                                id="validationOption"
                                                label=""
                                                placeholder="Option"
                                                type="Text"
                                                name='option_value'
                                                value={addData?.questionList[i - 1]?.options[0]?.option_value}
                                                onChange={(e) => addOptionValue(e.target.value, 'option_value', i)}
                                                required={true}
                                            />
                                        </div>
                                        <div style={{ width: '100%' }}>
                                            <InputBox
                                                feedbackInvalid="option is required"
                                                id="validationOption"
                                                label=""
                                                placeholder="Option"
                                                type="Text"
                                                name='option_value'
                                                // value={addData?.questionList[i - 1]?.options?.option_value}
                                                onChange={(e) => addOptionValue(e.target.value, 'option_value', i)}
                                                required={true}
                                            />
                                        </div>
                                    </div>

                                    {
                                        options?.length > 0 && options?.map((option, index) => (
                                            <div className='d-flex align-items-center justify-content-between gap-3' key={index}>
                                                <div style={{ width: '100%' }}>
                                                    <InputBox
                                                        feedbackInvalid="option is required"
                                                        id="validationOption"
                                                        label=""
                                                        placeholder="Option"
                                                        type="Text"
                                                        name='option_value'
                                                        // value={addData?.questionList[i - 1]?.options?.option_value}
                                                        onChange={(e) => addOptionValue(e.target.value, 'option_value', i)}
                                                        required={true}
                                                    />
                                                </div>
                                                <div style={{ cursor: 'pointer' }} onClick={() => handleDeleteFelid(index)} >
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        ))
                                    }

                                    <div style={{ cursor: 'pointer', marginTop: '20px' }} onClick={handleAddFelid}>
                                        <CgMathPlus />
                                        <span>Add Felid</span>
                                    </div>
                                </div>

                                {/* answer */}
                                <div className='d-flex align-items-baseline gap-3 justify-content-end'>
                                    <InputBox
                                        feedbackInvalid="Answer is required"
                                        id="validationAns"
                                        label="Answer"
                                        placeholder="Answer"
                                        type="Text"
                                        name='ans'
                                        style={{ width: '200px', marginTop: '20px' }}
                                        value={addData?.questionList[i - 1]?.ans}
                                        onChange={(e) => addFelidValue(e.target.value, 'ans', i)}
                                        required={true}
                                    />
                                </div>

                            </div>
                            <hr />
                        </div>
                    );

                }
            } else {
                for (let i = 1; i <= qt_id?.total_questions; i++) {
                    formDetails.push(
                        <div>
                            <div className='col-12 mb-3 fw-600' id={`question-${i}`}>
                                <h5>Single Line</h5>
                                {/* mark */}
                                <div className='d-flex align-items-baseline gap-3 justify-content-end'>
                                    <InputBox
                                        feedbackInvalid="Mark is required"
                                        id="validationMark"
                                        label="Mark"
                                        placeholder="Mark"
                                        type="Text"
                                        name='marks_per_question'
                                        style={{ width: '70px' }}
                                        value={addData?.questionList[i - 1]?.marks_per_question}
                                        onChange={(e) => addFelidValue(e.target.value, 'marks_per_question', i)}
                                        required={true}
                                    />
                                </div>

                                {/* question */}
                                <div>
                                    <InputBox
                                        feedbackInvalid="question is required"
                                        id="validationQuestion"
                                        label={`Question ${i}`}
                                        placeholder="Question"
                                        type="Text"
                                        name='question'
                                        value={addData?.questionList[i - 1]?.question}
                                        onChange={(e) => addFelidValue(e.target.value, 'question', i)}
                                        required={true}
                                    />
                                </div>

                                {/* answer */}
                                <div className='d-flex align-items-baseline gap-3 justify-content-end'>
                                    <InputBox
                                        feedbackInvalid="Answer is required"
                                        id="validationAns"
                                        label="Answer"
                                        placeholder="Answer"
                                        type="Text"
                                        name='marks_per_question'
                                        style={{ width: '200px', marginTop: '20px' }}
                                        value={addData?.questionList[i - 1]?.ans}
                                        onChange={(e) => addFelidValue(e.target.value, 'ans', i)}
                                        required={true}
                                    />
                                </div>

                            </div>
                            <hr />
                        </div>
                    );
                }
            }
        });
        return formDetails;
    };

    return (
        <CRow className="justify-content-center">
            <CCol lg={10}>
                <CCard style={{
                    border: 'none',
                    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                    height: 'calc(-24px + 100%)'
                }}
                >
                    <h4 style={{ padding: '20px', borderBottom: '1px solid #8080803b' }}>{location?.state?.editData ? 'Edit Question' : 'Add Question'}</h4>
                    <CCardBody style={{ padding: '30px' }}>
                        <CForm
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}
                        >
                            <div className='row'>
                                {renderForm()}
                            </div>

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

export default AddQuestion
