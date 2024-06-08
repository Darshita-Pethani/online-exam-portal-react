import { CButton, CCard, CFormCheck, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { SET_VIEW_PAPER } from "../../../action";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ViewPaper = (props) => {
    const dispatch = useDispatch();
    const paperPopup = useSelector((state) => state?.paperPopup);

    const onDragEnd =  (result) => {
        console.log('ok: ', result);
        if (!result.destination) {
            return;
        }
    }
    // aakhi navi banavani sort order thi 
    // source che eni current index che and destination thi navi index malse
    // uper paper ne min and hour ma add karvani che
    // sort the questions also
    return (
        <>
            <CModal
                scrollable
                visible={paperPopup}
                onClose={() => dispatch({ type: SET_VIEW_PAPER, paperPopup: false })}
                aria-labelledby="ScrollingLongContentExampleLabel2"
            >
                <CModalHeader>
                    <CModalTitle id="ScrollingLongContentExampleLabel2">Question</CModalTitle>
                </CModalHeader>
                
                <CModalBody>
                    <div className="container" style={{ padding: '12px' }}>
                        {props?.data?.map((que_data, index) => (
                            <CCard
                                key={index}
                                className="mb-3"
                                style={{
                                    border: 'none',
                                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px',
                                    padding: '15px',
                                    background: 'rgb(248, 249, 250)',
                                    borderRadius: '8px'
                                }}
                            >

                                <DragDropContext onDragEnd={onDragEnd}>
                                    <div>
                                        <div className="mb-3">
                                            <div className="d-flex align-items-center">
                                                <CFormLabel className="form-label me-3" style={{ fontWeight: '600' }}>
                                                    Que-{index + 1}
                                                </CFormLabel>
                                                <CFormLabel className="ms-auto" style={{ fontWeight: '500', padding: '4px 8px', borderRadius: '5px', background: '#f1f1f1' }}>
                                                    Mark: {que_data?.marks}
                                                </CFormLabel>
                                            </div>
                                            <div style={{
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                                padding: '10px',
                                                marginTop: '5px',
                                                background: '#f9f9f9'
                                            }}>
                                                <CFormLabel className="m-0" style={{ fontWeight: '500' }}>
                                                    {que_data?.question}
                                                </CFormLabel>
                                            </div>
                                        </div>

                                        {que_data?.options?.length > 0 && (
                                            <Droppable droppableId={`droppable-${index}`}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        className="ms-4"
                                                    >
                                                        {que_data?.options?.map((option_data, opt_index) => (
                                                            <Draggable
                                                                key={opt_index}
                                                                draggableId={`draggable-${index}-${opt_index}`}
                                                                index={opt_index}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="d-flex align-items-center gap-3 mb-2"
                                                                        style={{
                                                                            background: '#e9ecef',
                                                                            borderRadius: '5px',
                                                                            padding: '8px 12px',
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        <CFormCheck type="radio" name={`question_${index}`} />
                                                                        <div style={{ fontWeight: '500' }}>{option_data?.option_value}</div>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        )}
                                    </div>
                                </DragDropContext>
                            </CCard>
                        ))}
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={() => dispatch({ type: SET_VIEW_PAPER, paperPopup: false })}
                    >
                        Close
                    </CButton>
                </CModalFooter>
            </CModal >
        </>
    );
};

export default ViewPaper;
