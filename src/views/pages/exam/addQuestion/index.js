import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCol, CForm, CFormCheck, CFormLabel, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { allDispatch } from '../../../../store/allDispatch'
import { InputBox } from '../../../forms/inputBox'
import FormButton from '../../../forms/formButton'
import { addQuestion, updateQuestionDataApi } from '../../../../api/question'
import { getExamDataByIdApi } from '../../../../api/exam'
import { MdDelete } from "react-icons/md";
import { CgMathPlus } from "react-icons/cg";
import { questionTypeDataApi } from '../../../../api/questionType'
import { CgAsterisk } from "react-icons/cg";
import Instruction from './queInstruction'
import Swal from 'sweetalert2'

const AddQuestion = () => {
    const { showNotification } = allDispatch();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [addData, setAddData] = useState({
        exam_id: '',
        questionList: []
    });
    const [examTotalMarks, setExamTotalMarks] = useState('');
    const [examData, setExamData] = useState([]);

    let marks_total = 0;

    const htmlContent = `
    <p><b>Exam Name:</b> ${examData?.exam_type?.name}</p>
    <p><b>Exam Date:</b> ${examData?.date}</p>
    <p><b>Subject:</b> ${examData?.subject?.name}</p>
    <p><b>Total Question:</b> ${examData?.total_questions}</p>
    <p><strong>Do you want to save the changes?<strong></p>
`;
    const handleSubmit = async (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            event.preventDefault();
            if (location?.state?.editData === true) {
                if (marks_total === examTotalMarks) {
                    Swal.fire({
                        title: "Are you sure?",
                        html: htmlContent,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, saved it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            let response = await updateQuestionDataApi(addData);
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
                    });

                } else {
                    console.log(" message: 'Marks are not matched to total marks of exam' ");
                    showNotification({
                        title: "Error",
                        message: 'Marks are not matched to total marks of exam',
                        status: 'danger',
                        isOpen: true
                    });
                }
            } else {
                if (marks_total === examTotalMarks) {
                    Swal.fire({
                        title: "Are you sure?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, saved it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            let response = await addQuestion(addData);
                            if (response?.status === 200) {
                                showNotification({
                                    title: "Success",
                                    message: response?.data?.message,
                                    status: 'success',
                                    isOpen: true
                                });
                                navigate("/pages/exam/list");
                                setValidated(true);
                            } else {
                                showNotification({
                                    title: "Error",
                                    message: response?.data?.message,
                                    status: 'danger',
                                    isOpen: true
                                });
                            }
                        }
                    });
                } else {
                    console.log(" message: 'Marks are not matched to total marks of exam' ");
                    showNotification({
                        title: "Error",
                        message: 'Marks are not matched to total marks of exam',
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
    const getExamDataById = async (id) => {
        const response = await getExamDataByIdApi(id);
        setExamTotalMarks(response?.data?.data?.total_marks);
        if (response?.status === 200) {
            const questionType = response?.data?.data?.exam_questiontype_relations;
            setExamData(response?.data?.data);

            // set data to store ans
            let questionList = []
            questionType?.map((q_id) => {
                let questionComanData = {
                    "question": "",
                    "marks": "",
                    "ans": "",
                }
                // MCQ
                if (q_id?.question_type_id === 1) {
                    for (let i = 1; i <= q_id?.total_questions; i++) {
                        questionList.push({
                            ...questionComanData,
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
                            ...questionComanData,
                            "question_type_id": `${q_id?.question_type_id}`,
                        });
                    }
                }
            });

            // edit question records
            if (response?.data?.data?.questions?.length > 0) {
                questionList = [],
                    response?.data?.data?.questions?.map((data) => {
                        if (data?.options?.length > 0) {
                            questionList.push({
                                ...data,
                                "question_type_id": 1,
                            })
                        } else {
                            questionList.push({
                                ...data,
                                "question_type_id": 2,
                            })
                        }
                    })
            }
            setAddData({ ...addData, exam_id: questionType[0]?.exam_id, questionList: questionList });
        } else if (response?.status === 401) {
            navigate('/')
        }
    }

    useEffect(() => {
        if (location?.state?.exam_id || location?.state?.editData === true) {
            getExamDataById(location?.state?.exam_id);
        }
        getQuestionType();
    }, []);

    // add option felid
    const handleAddFelid = (que_i) => {
        let que_List = [...addData?.questionList];
        let add_felid = [...que_List[que_i]?.options];
        let data = [...add_felid, { option_value: "" }]

        // to set new question list with new options
        que_List[que_i] = {
            ...que_List[que_i],
            ans: '',
            options: data
        }

        setAddData({ ...addData, questionList: que_List });
    }

    // delete option felid
    const handleDeleteFelid = (op_i, que_i) => {
        let que_List = [...addData?.questionList];
        let remove_felid = [...que_List[que_i]?.options];

        // remove 1 item  selected position
        remove_felid.splice(op_i, 1);

        // to set remove felid and new obj
        que_List[que_i] = {
            ...que_List[que_i],
            ans: '',
            options: remove_felid
        }
        setAddData({ ...addData, questionList: que_List });
    };

    // add felid value
    const addFelidValue = (value, name, i, opIndex) => {
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
            // if any changes in option array then ans felid is null  
            ans: '',
            options: copyOption
        };

        setAddData({ ...addData, questionList: que_List });
    }

    // console.log("addData >>", addData);
    // exam not editable when we add questions 
    // display all details of exams in question form 
    // question not editable 
    // sort order of option after create exam in view exam form 
    // check option with correct ans after add  question form not editable  question form only option can sort order

    const addCheckedValue = (value, name, index) => {
        let que_List = [...addData?.questionList];
        que_List[index] = {
            ...que_List[index],
            [name]: value
        };
        setAddData({ ...addData, questionList: que_List });
    }

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
                                <Instruction examData={examData} />

                                {
                                    addData?.questionList?.map((data, i) => (
                                        // for count calculation of total marks
                                        marks_total += parseInt(data?.marks),
                                        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px', padding: '20px', borderRadius: '5px', background: 'rgb(88 86 214 / 3%)' }} className='mb-4'>
                                            <div className='col-12 fw-600'>
                                                {/* mark */}
                                                <div className='d-flex flex-wrap flex-row align-items-baseline gap-3 justify-content-between mb-3'>
                                                    {parseInt(data?.question_type_id) === 1 ? <h6>Multiple Choice (MCQ)</h6> : <h6>Short Answer</h6>}
                                                    <div className='d-flex flex-column'>
                                                        <InputBox
                                                            feedbackInvalid="Marks is required"
                                                            id={`ValidationMark ${i}`}
                                                            // label="Mark"
                                                            placeholder="Mark"
                                                            type="Text"
                                                            name='marks'
                                                            style={{ width: '70px' }}
                                                            value={addData?.questionList[i]?.marks}
                                                            onChange={(e) => addFelidValue(e.target.value, 'marks', i)}
                                                            required={true}
                                                        />
                                                    </div>
                                                </div>

                                                {/* question */}
                                                <div>
                                                    <InputBox
                                                        feedbackInvalid="Question is required"
                                                        id={`Question ${i}`}
                                                        label={`Que-${i + 1}`}
                                                        placeholder={`Question`}
                                                        type="Text"
                                                        name='question'
                                                        required={true}
                                                        style={{ background: '#5856d61c', marginTop: '5px' }}
                                                        value={addData?.questionList[i]?.question}
                                                        onChange={(e) => addFelidValue(e.target.value, 'question', i)}
                                                    />
                                                </div>

                                                {/* option  */}
                                                <div className='row mcq_question'>
                                                    {
                                                        addData?.questionList[i]?.options?.length > 0 &&
                                                        <><CFormLabel style={{ marginTop: '18px', marginBottom: '0', color: '#db5d5d', fontSize: '14px' }}><CgAsterisk /> Mark the correct option</CFormLabel></>
                                                    }
                                                    <div className='d-flex flex-wrap justify-content-between options'>
                                                        {
                                                            addData?.questionList[i]?.options?.map((value, opIndex) => (
                                                                <div className={(addData?.questionList[i].options?.length > 2 && opIndex > 1) ? 'd-flex gap-2 align-items-baseline justify-content-between' : ''}>
                                                                    {/* radio btn with input box */}
                                                                    <CInputGroup style={{ marginTop: '20px' }}>
                                                                        <CInputGroupText>
                                                                            <CFormCheck type="checkbox"
                                                                                value={addData?.questionList[i]?.options[opIndex]?.option_value}
                                                                                onChange={(e) => addCheckedValue(e.target.value, 'ans', i)}
                                                                                checked={addData?.questionList[i]?.ans === '' ? ''
                                                                                    :
                                                                                    addData?.questionList[i]?.options[opIndex]?.option_value === addData?.questionList[i]?.ans
                                                                                }
                                                                                id={`validationFormCheck${addData?.questionList[i]?.options[opIndex]}`}
                                                                                required={addData?.questionList[i]?.ans === '' ? true : false}
                                                                            />

                                                                        </CInputGroupText>
                                                                        <InputBox
                                                                            feedbackInvalid="Option is required"
                                                                            id="validationOption"
                                                                            placeholder="Option"
                                                                            type="Text"
                                                                            name='option_value'
                                                                            value={addData?.questionList[i]?.options[opIndex]?.option_value}
                                                                            onChange={(e) => addOptionValue(e.target.value, 'option_value', i, opIndex)}
                                                                            required={true}
                                                                        />
                                                                    </CInputGroup>
                                                                    {/* delete felid */}
                                                                    <div>
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
                                                    </div>
                                                    {parseInt(data?.question_type_id) === 1 &&
                                                        <div className='d-flex align-items-center justify-content-end'>
                                                            <div style={{ cursor: 'pointer', marginTop: '13px', fontWeight: '600', color: '#5856d6' }} onClick={() => handleAddFelid(i)}>
                                                                <CgMathPlus />
                                                                <span style={{ marginLeft: '5px' }}>Add options</span>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>

                                                {/* answer */}
                                                <div className={`${addData?.questionList[i]?.options?.length > 0 ? '' : 'mt-4'} `}>
                                                    <InputBox
                                                        feedbackInvalid="Answer is required"
                                                        id="validationAns"
                                                        label="Answer"
                                                        placeholder="Answer"
                                                        type="Text"
                                                        name='ans'
                                                        style={{ width: '200px' }}
                                                        value={addData?.questionList[i]?.ans}
                                                        onChange={(e) => addFelidValue(e.target.value, 'ans', i)}
                                                        required={true}
                                                        // readOnly={true}
                                                        disabled={addData?.questionList[i]?.options?.length > 0 ? true : false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* forms buttons */}
                            <div className="d-flex gap-3 d justify-content-center align-items-center mb-4">
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
