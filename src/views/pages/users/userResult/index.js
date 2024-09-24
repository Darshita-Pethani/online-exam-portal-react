import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUsersDataByIdApi } from "../../../../api/user";
import {
    CCardBody,
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
} from "@coreui/react";
import FormButton from "../../../forms/formButton";
import moment from 'moment';

const UserResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [results, setResults] = useState([]);

    const resultList = async (id) => {
        const response = await getUsersDataByIdApi(id);
        if (response.status === 200) {
            const allResults = response?.data?.data?.user_exam_enrolls || [];
            setResults(allResults);
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        resultList(location?.state?.id);
    }, []);

    // Group results by year
    const groupResultsByYear = (results) => {
        const groupedResults = results.reduce((acc, result) => {
            const year = result?.result?.user_enroll_year;
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(result);
            return acc;
        }, {});

        return groupedResults;
    };

    const groupedResults = groupResultsByYear(results);

    const renderResultRows = (data) => {
        const examDate = moment(data?.result?.exam?.date);
        return (
            <CTableRow key={data?.id}>
                <CTableDataCell>{data?.result?.exam?.exam_type?.name}</CTableDataCell>
                <CTableDataCell>{data?.result?.exam?.subject?.name}</CTableDataCell>
                <CTableDataCell>{data?.result?.exam?.standard?.name}</CTableDataCell>
                <CTableDataCell>{examDate.format('Do MMM YYYY')}</CTableDataCell>
                <CTableDataCell>{data?.result?.total_right_ans_marks}</CTableDataCell>
                <CTableDataCell>{data?.result?.exam?.total_marks}</CTableDataCell>
            </CTableRow>
        );
    };

    return (
        <CCardBody>
            <CTable striped hover responsive bordered align="middle">
                <CTableHead color="dark">
                    <CTableRow>
                        <CTableHeaderCell scope="col">Exam</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Standard</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Exam Date</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Total Right Marks</CTableHeaderCell>
                        <CTableHeaderCell scope="col">Total Marks</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {Object.entries(groupedResults).map(([year, results]) => (
                        <>
                            <CTableRow key={`year-${year}`}>
                                <CTableDataCell colSpan={6} style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa' }}>
                                    {year}
                                </CTableDataCell>
                            </CTableRow>
                            {results.map(renderResultRows)}
                        </>
                    ))}
                    {results.length === 0 && (
                        <CTableRow>
                            <CTableDataCell colSpan={5}>No results available.</CTableDataCell>
                        </CTableRow>
                    )}
                </CTableBody>
            </CTable>

            <Link to={'/pages/users/list'} style={{ textAlign: 'center' }}>
                <FormButton
                    style={{
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '500',
                        backgroundColor: 'var(--cui-secondary)',
                        marginBottom: '20px'
                    }}
                    label='Back'
                    hoverBgColor='#44484b'
                    hoverFontColor='white'
                />
            </Link>
        </CCardBody>
    );
};

export default UserResult;
