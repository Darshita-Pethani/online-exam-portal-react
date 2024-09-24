import React from 'react';
import {
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import moment from 'moment';
import styled from 'styled-components';

const BeforeDiv = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 15px;
    &:before {
        content: "";
        width: 20px;
        height: 20px;
        background: #e7e7fa;
        border-radius: 100%;
        border: 1px solid;
    }
`
const ResultView = (props) => {
    const { data } = props;
    const currentYear = moment().year();

    const columns = [
        { key: 'exam_id', label: 'Exam', _props: { scope: 'col' } },
        { key: 'subject_id', label: 'Subject', _props: { scope: 'col' } },
        { key: 'standard_id', label: 'Standard', _props: { scope: 'col' } },
        { key: 'exam.date', label: 'Exam Date', _props: { scope: 'col' } },
        { key: 'total_right_ans_marks', label: 'Right Answer Marks', _props: { scope: 'col' } },
        { key: 'exam.total_marks', label: 'Total Marks', _props: { scope: 'col' } },
    ];

    return (
        <>
            <BeforeDiv>Current Year Result </BeforeDiv>
            <CTable striped hover responsive bordered align="middle">
                <CTableHead color="dark">
                    <CTableRow>
                        {columns.map((col, index) => (
                            <CTableHeaderCell key={index} {...col._props}>
                                {col.label}
                            </CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {data?.map((item, index) => {
                        const examDate = moment(item?.exam?.date);
                        const isHighlighted = examDate.year() === currentYear;

                        return (
                            <CTableRow key={index}>
                                <CTableDataCell style={isHighlighted ? { backgroundColor: '#e7e7fa' } : {}}>{item?.exam?.exam_type?.name}</CTableDataCell>
                                <CTableDataCell style={isHighlighted ? { backgroundColor: '#e7e7fa' } : {}}>{item?.exam?.subject?.name}</CTableDataCell>
                                <CTableDataCell style={isHighlighted ? { backgroundColor: '#e7e7fa' } : {}}>{item?.user?.standard_user_relation?.standard?.name}</CTableDataCell>
                                <CTableDataCell style={isHighlighted ? { backgroundColor: '#e7e7fa' } : {}}>{examDate.format('Do MMM YYYY')}</CTableDataCell>
                                <CTableDataCell style={isHighlighted ? { backgroundColor: '#e7e7fa' } : {}}>{item?.total_right_ans_marks}</CTableDataCell>
                                <CTableDataCell style={isHighlighted ? { backgroundColor: '#e7e7fa' } : {}}>{item?.exam.total_marks}</CTableDataCell>
                            </CTableRow>
                        );
                    })}
                </CTableBody>
            </CTable>
        </>
    );
};

export default ResultView;
