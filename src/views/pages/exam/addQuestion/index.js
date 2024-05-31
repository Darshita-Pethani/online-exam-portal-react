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
                
                console.log('addData: ', addData);
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
            const questionType = response?.data?.data?.exam_questiontype_relations;
            setExamQuestionTypeData(questionType);
            let questionList = []
            questionType?.map((q_id) => {

                // MCQ
                if (q_id?.question_type_id === 1) {
                    for (let i = 1; i <= q_id?.total_questions; i++) {
                        questionList.push({
                            "question": "",
                            "marks_per_question": "",
                            "ans": "",
                            "question_type_id": `${q_id?.question_type_id}`,
                            "options": [
                                {
                                    "option_value": ""
                                },
                                {
                                    "option_value": ""
                                }
                            ]
                        });
                    }
                }
                // Single Line Question
                else {
                    for (let i = 1; i <= q_id?.total_questions; i++) {
                        questionList.push({
                            "question": "",
                            "marks_per_question": "",
                            "ans": "",
                            "question_type_id": `${q_id?.question_type_id}`,
                        });
                    }
                }
            })
            setAddData({ ...addData, exam_id: questionType[0]?.exam_id, questionList: questionList })
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

    // add felid
    const handleAddFelid = (que_i) => {
        let que_List = [...addData?.questionList];
        let add_felid = [...que_List[que_i]?.options];
        let data = [...add_felid, { option_value: "" }]

        // to set new question list with new options
        que_List[que_i] = {
            ...que_List[que_i],
            options: data
        }

        setAddData({ ...addData, questionList: que_List });
    }

    // delete felid
    const handleDeleteFelid = (op_i, que_i) => {
        let que_List = [...addData?.questionList];
        let remove_felid = [...que_List[que_i]?.options];

        // remove 1 item  selected position
        remove_felid.splice(op_i, 1);

        // to set remove felid and new obj
        que_List[que_i] = {
            ...que_List[que_i],
            options: remove_felid
        }
        setAddData({ ...addData, questionList: que_List });
    };

    // add felid value
    const addFelidValue = (value, name, i) => {
        let updatedQuestions = [...addData?.questionList];
        updatedQuestions[i] = {
            ...updatedQuestions[i],
            [name]: value
        };
        setAddData({ ...addData, questionList: updatedQuestions });
    }

    // add option data in json
    const addOptionValue = (opValue, opKeyName, que_i, opIndex) => {
        let que_List = [...addData?.questionList];
        let copyOption = [...que_List[que_i]?.options];

        // to set the option value on selected option
        copyOption[opIndex] = {
            ...copyOption[opIndex],
            [opKeyName]: opValue
        };

        // to set the option array in selected question
        que_List[que_i] = {
            ...que_List[que_i],
            options: copyOption
        };

        setAddData({ ...addData, questionList: que_List });
    }

    // console.log("adddata >>", addData);

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
                                {
                                    addData?.questionList?.map((data, i) => (
                                        <div>
                                            {parseInt(data?.question_type_id) === 1 ? <h5>MCQ</h5> : <h5>Single Line</h5>}
                                            <div className='col-12 mb-3 fw-600'>
                                                {/* mark */}
                                                <div className='d-flex align-items-baseline gap-3 justify-content-end'>
                                                    <InputBox
                                                        feedbackInvalid="Mark is required"
                                                        id={`ValidationMark ${i}`}
                                                        label="Mark"
                                                        placeholder="Mark"
                                                        type="Text"
                                                        name='marks_per_question'
                                                        style={{ width: '70px' }}
                                                        value={addData?.questionList[i]?.marks_per_question}
                                                        onChange={(e) => addFelidValue(e.target.value, 'marks_per_question', i)}
                                                        required={true}
                                                    />
                                                </div>

                                                {/* question */}
                                                <div>
                                                    <InputBox
                                                        feedbackInvalid="question is required"
                                                        id={`Question ${i}`}
                                                        label={`Question ${i + 1}`}
                                                        placeholder={`Question`}
                                                        type="Text"
                                                        name='question'
                                                        required={true}
                                                        value={addData?.questionList[i]?.question}
                                                        onChange={(e) => addFelidValue(e.target.value, 'question', i)}
                                                    />
                                                </div>

                                                {/* option  */}
                                                <div>
                                                    {
                                                        addData?.questionList[i]?.options?.map((value, opIndex) => (
                                                            <div style={{ width: '100%' }}>
                                                                <div className={(addData?.questionList[i].options.length > 2 && opIndex > 1) ? 'd-flex gap-2 align-items-baseline' : ''}>
                                                                    <InputBox
                                                                        feedbackInvalid="option is required"
                                                                        id="validationOption"
                                                                        placeholder="Option"
                                                                        type="Text"
                                                                        name='option_value'
                                                                        value={addData?.questionList[i]?.options[opIndex]?.option_value}
                                                                        onChange={(e) => addOptionValue(e.target.value, 'option_value', i, opIndex)}
                                                                        style={{ margin: '15px 0' }}
                                                                        required={true}
                                                                    />

                                                                    {/* delete felid */}
                                                                    {
                                                                        (addData?.questionList[i].options.length > 2 && opIndex > 1) &&
                                                                        <div style={{ cursor: 'pointer' }} onClick={() => handleDeleteFelid(opIndex, i)} >
                                                                            <MdDelete />
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    {parseInt(data?.question_type_id) === 1 &&
                                                        <div style={{ cursor: 'pointer', marginTop: '10px' }} onClick={() => handleAddFelid(i)}>
                                                            <CgMathPlus />
                                                            <span>Add Felid</span>
                                                        </div>
                                                    }

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
                                                        value={addData?.questionList[i]?.ans}
                                                        onChange={(e) => addFelidValue(e.target.value, 'ans', i)}
                                                        required={true}
                                                    />
                                                </div>

                                            </div>
                                            <hr />
                                        </div>
                                    ))
                                }

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
