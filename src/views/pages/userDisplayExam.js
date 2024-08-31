import { CCard, CCardBody, CCol, CForm, CFormCheck, CRow } from '@coreui/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormButton from '../forms/formButton'
import { InputBox } from '../forms/inputBox'
import { addUserAnswers } from '../../api/userExamEnroll'
import { useNavigate } from 'react-router-dom'
import { SET_SHOW_STUDENTS_QUESTIONS } from '../../store/action'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

const UserDisplayExam = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const questionList = useSelector((state) => state?.customization?.showStudentsQuestionList)

    const [selectedOptions, setSelectedOptions] = useState({
        exam_id: questionList[0].id,
        standard_id: questionList[0].standard_id,
        questionAns: [],
    })

    const checkedVal = (question_id, val) => {
        setSelectedOptions((prevState) => {
            const checkedQuesList = [...prevState?.questionAns]
            const findIndex = checkedQuesList.findIndex((item) => item.question_id == question_id)

            if (findIndex !== -1) {
                checkedQuesList[findIndex] = {
                    ...checkedQuesList[findIndex],
                    user_ans: val,
                }
            } else {
                checkedQuesList.push({
                    question_id: question_id,
                    user_ans: val,
                })
            }

            return {
                ...prevState,
                questionAns: checkedQuesList,
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to submit this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!',
        }).then(async (result) => {
            if (result?.isConfirmed) {
                const response = await addUserAnswers(selectedOptions)
                if (response.status === 200) {
                    dispatch({
                        type: SET_SHOW_STUDENTS_QUESTIONS,
                        payload: '',
                    })
                    navigate('/dashboard')
                }
            }
        })
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
                    <CCardBody style={{ padding: '30px' }}>
                        <CForm noValidate onSubmit={handleSubmit}>
                            <div className="row">
                                {questionList &&
                                    questionList[0]?.questions &&
                                    questionList[0]?.questions?.map((data, index) => {
                                        return (
                                            <div
                                                style={{
                                                    boxShadow: ' rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
                                                    padding: '20px',
                                                    borderRadius: '5px',
                                                    background: 'rgba(88, 86, 214, 0.03)',
                                                    marginBottom: '20px',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                <h6>Que- {index + 1}</h6>
                                                <div
                                                    style={{
                                                        padding: '10px',
                                                        borderRadius: '5px',
                                                        background: 'rgba(88, 86, 214, 0.11)',
                                                        marginTop: '20px',
                                                    }}
                                                >
                                                    {data?.question}
                                                </div>
                                                <div className="d-flex flex-wrap gap-3 justify-content-between">
                                                    {data?.options.length > 0 ? (
                                                        data?.options?.map((option) => (
                                                            <div
                                                                style={{
                                                                    width: '48%',
                                                                    padding: '10px',
                                                                    borderRadius: '5px',
                                                                    background: 'rgb(243 244 247)',
                                                                    marginTop: '20px',
                                                                    fontWeight: '500',
                                                                    border: '1px solid #80808024',
                                                                }}
                                                            >
                                                                <CFormCheck
                                                                    id={option?.id}
                                                                    label={option?.option_value}
                                                                    value={option?.option_value}
                                                                    onChange={(e) => checkedVal(data?.id, e.target.value)}
                                                                    checked={selectedOptions?.questionAns.find(
                                                                        (item) =>
                                                                            item?.user_ans === option?.option_value &&
                                                                            item?.question_id === data.id,
                                                                    )}
                                                                />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <InputBox
                                                            id="validationAns"
                                                            placeholder="ans..."
                                                            type="Text"
                                                            name="ans"
                                                            value={
                                                                selectedOptions?.questionAns.find(
                                                                    (item) => item?.question_id === data.id,
                                                                )?.user_ans
                                                            }
                                                            onChange={(e) => checkedVal(data?.id, e.target.value)}
                                                            style={{ marginTop: '20px' }}
                                                            required={false}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}

                                {/* buttons */}
                                <div className="d-flex gap-3 d justify-content-center align-items-center my-4">
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

export default UserDisplayExam
