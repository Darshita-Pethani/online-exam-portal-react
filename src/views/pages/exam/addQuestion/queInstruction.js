import { cilBurn } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CAlert, CFormLabel } from "@coreui/react";

const Instruction = (props) => {
    return (
        <div className="card p-0 mb-5" style={{ borderTop: '3px solid #b07474' }} >
            <div className="card-header">
                <h6 className="card-title" style={{ fontSize: '17px', marginTop: '8px' }}>General Instruction</h6>
            </div>
            <div className="card-body question_card">
                <div className='row' style={{ padding: '0 20px' }}>
                    <div className='que_label_parent'>
                        <CFormLabel className="form-label question_label">Exam Name</CFormLabel>
                        <span className='d-none d-sm-block'>:</span>
                        <p>{props?.examData?.exam_type?.name}</p>
                    </div>
                    <div className='que_label_parent'>
                        <CFormLabel className="form-label question_label">Exam Start Date</CFormLabel>
                        <span className='d-none d-sm-block'>:</span>
                        <p>{props?.examData?.date}</p>
                    </div>
                    <div className='que_label_parent'>
                        <CFormLabel className="form-label question_label">Exam Duration</CFormLabel>
                        <span className='d-none d-sm-block'>:</span>
                        <p>{props?.examData?.exam_duration}</p>
                    </div>
                    <div className='que_label_parent'>
                        <CFormLabel className="form-label question_label">Total Question Mark</CFormLabel>
                        <span className='d-none d-sm-block'>:</span>
                        <p>{props?.examData?.total_marks}</p>
                    </div>
                    <div className='que_label_parent'>
                        <CFormLabel className="form-label question_label">Total Question</CFormLabel>
                        <span className='d-none d-sm-block'>:</span>
                        <p>{props?.examData?.total_questions}</p>
                    </div>
                    <div className='que_label_parent'>
                        <CFormLabel className="form-label question_label">Subject</CFormLabel>
                        <span className='d-none d-sm-block'>:</span>
                        <p>{props?.examData?.subject?.name}</p>
                    </div>
                    <CAlert color="danger" className="d-flex align-items-center mb-0" style={{
                        border: 0, borderRadius: 0, borderLeft: '5px solid #b07474'
                    }}>
                        <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
                        <div>If you submit the form, then you can't change or edit <b>Exam</b>.</div>
                    </CAlert>
                </div>
            </div>
        </div>
    )
}

export default Instruction