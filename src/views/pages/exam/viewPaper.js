import { CButton, CCard, CFormCheck, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTooltip } from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import { SET_VIEW_PAPER } from "../../../action";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { updateOptionSortOrder, updateQuestionSortOrder } from "../../../api/question";
import { getExamDataByIdApi } from "../../../api/exam";
import { useEffect, useState } from "react";
import { TbDragDrop2 } from "react-icons/tb";
import { RxDragHandleDots2 } from "react-icons/rx";
import styled from 'styled-components';

const StyledButton = styled(CButton)`
  cursor: inherit !important; 
  padding: 0 !important;
  &:first-child:active {
    border-color: transparent !important; 
  }
`;

const ViewPaper = (props) => {
    const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const paperPopup = useSelector((state) => state?.paperPopup);

    const getExamDataById = async () => {
        const response = await getExamDataByIdApi(props?.data);
        if (response?.status === 200) {
            setData(response?.data?.data?.questions);
        }
    }
    // for option darg
    const onOptionDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }
        let newSortOrder = result?.destination?.index;
        let data = {
            new_sort_order: newSortOrder + 1,
            id: result?.draggableId
        }
        await updateOptionSortOrder(data);
        const response = await getExamDataByIdApi(props?.data);
        if (response?.status === 200) {
            setData(response?.data?.data?.questions);
        }
    }

    // for question drag
    const onQuestionDragEnd = async (result) => {
        if (!result.destination) {
            return;
        }
        let newSortOrder = result?.destination?.index;
        let data = {
            new_sort_order: newSortOrder + 1,
            id: result?.draggableId
        }
        await updateQuestionSortOrder(data);
        const response = await getExamDataByIdApi(props?.data);
        if (response?.status === 200) {
            setData(response?.data?.data?.questions);
        }
    }

    useEffect(() => {
        getExamDataById()
    }, [])

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
                        <DragDropContext onDragEnd={onQuestionDragEnd}>
                            <Droppable droppableId='droppable-question' >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {data?.map((que_data, index) => (
                                            <Draggable
                                                key={`draggable-${que_data?.id}`}
                                                draggableId={`${que_data?.id}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        className="d-flex align-items-center gap-3 mb-2"
                                                        style={{
                                                            borderRadius: '5px',
                                                            padding: '8px 12px',
                                                            ...provided.draggableProps.style
                                                        }}
                                                    >
                                                        <div style={{
                                                            width: '100%',
                                                            position: 'relative',
                                                        }}>
                                                            {
                                                                data?.length > 1 &&
                                                                <div
                                                                    // jya pn drag karvu hoy icon thi j drag thay to ena mate {...provided.dragHandleProps} lakhi devani
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        position: 'absolute',
                                                                        zIndex: 1,
                                                                        fontSize: '20px',
                                                                        top: '-14px',
                                                                        right: 0,

                                                                    }}
                                                                >
                                                                    <CTooltip
                                                                        content="Drag question"
                                                                        placement="top"
                                                                    >
                                                                        <StyledButton><TbDragDrop2 /></StyledButton>
                                                                    </CTooltip>
                                                                </div>
                                                            }
                                                            <CCard
                                                                key={index}
                                                                style={{
                                                                    border: 'none',
                                                                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px',
                                                                    padding: '15px',
                                                                    background: 'rgb(248, 249, 250)',
                                                                    borderRadius: '8px',
                                                                    width: '100%',
                                                                }}
                                                            >
                                                                <div>
                                                                    <div className="mb-3 mt-2">
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
                                                                        <DragDropContext onDragEnd={onOptionDragEnd}>
                                                                            <Droppable droppableId={`${index + 1}`} key={`droppable-${index}`}>
                                                                                {(provided) => (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.droppableProps}
                                                                                    >
                                                                                        {que_data?.options?.map((option_data, opt_index) => (
                                                                                            <Draggable
                                                                                                key={`draggable-${option_data?.id}`}
                                                                                                draggableId={`${option_data?.id}`}
                                                                                                index={opt_index}
                                                                                            >
                                                                                                {(provided) => (
                                                                                                    <div
                                                                                                        ref={provided.innerRef}
                                                                                                        {...provided.draggableProps}
                                                                                                        className="d-flex align-items-center gap-3 mb-2"
                                                                                                        style={{
                                                                                                            ...provided.draggableProps.style
                                                                                                        }}
                                                                                                    >
                                                                                                        <div {...provided.dragHandleProps} >
                                                                                                            <CTooltip
                                                                                                                content="Drag option"
                                                                                                                placement="top"
                                                                                                            >
                                                                                                                <StyledButton><RxDragHandleDots2 /></StyledButton>
                                                                                                            </CTooltip>
                                                                                                        </div>
                                                                                                        <div
                                                                                                            className="d-flex align-items-center gap-3 mb-2"
                                                                                                            style={{
                                                                                                                background: '#e9ecef',
                                                                                                                borderRadius: '5px',
                                                                                                                padding: '8px 12px',
                                                                                                                width: '100%'
                                                                                                            }}>
                                                                                                            <CFormCheck type="radio" name={`question_${index}`} disabled />
                                                                                                            <div style={{ fontWeight: '500' }}>{option_data?.option_value}</div>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                )}
                                                                                            </Draggable>
                                                                                        ))}
                                                                                        {provided.placeholder}
                                                                                    </div>
                                                                                )}
                                                                            </Droppable>
                                                                        </DragDropContext>
                                                                    )}

                                                                </div>
                                                            </CCard>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
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
