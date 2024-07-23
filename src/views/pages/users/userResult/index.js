// export default UserResult;
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUsersDataByIdApi } from "../../../../api/user";
import { CCardBody, CCard, CCardHeader, CCol, CRow } from "@coreui/react";
import FormButton from "../../../forms/formButton";

const UserResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [currentYearResult, setCurrentYearResult] = useState([]);
    const [previousYearsResults, setPreviousYearsResults] = useState([]);
    const [resultData, setResultData] = useState('');
    console.log('resultData: ', resultData);

    const resultList = async (id) => {
        const response = await getUsersDataByIdApi(id);
        if (response.status === 200) {
            setResultData(response?.data?.data?.user_exam_enrolls);
            const allResults = response?.data?.data?.user_exam_enrolls || [];
            const currentYear = new Date().getFullYear();
            const currentYearResults = allResults.filter(result => result?.result?.user_enroll_year == currentYear);
            const previousResults = allResults.filter(result => result?.result?.user_enroll_year != currentYear);

            setCurrentYearResult(currentYearResults);
            setPreviousYearsResults(previousResults);
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        resultList(location?.state?.id);
    }, []);
    const renderResultCard = (data) => {
        //  const match = previousYearsResults.find(product => product?.result?.user_enroll_year === data?.result?.user_enroll_year);
        return (
            <CCol xs="12" key={data?.id} className="mt-3">
                <CCard>
                    <CCardHeader><div style={{ fontSize: '16px', fontWeight: '600' }}>{data?.result?.user_enroll_year}</div></CCardHeader>
                    <CCardBody>
                        <div className="d-flex gap-3 my-2">
                            <div style={{ width: '40%', fontWeight: '500' }}>Standard</div><span>:</span><div>{data?.result?.exam?.standard?.name}</div>
                        </div>
                        <div className="d-flex gap-3 my-2">
                            <div style={{ width: '40%', fontWeight: '500' }}>Subject</div><span>:</span> <div>{data?.result?.exam?.subject?.name}</div>
                        </div>
                        <div className="d-flex gap-3 my-2">
                            <div style={{ width: '40%', fontWeight: '500' }}>Total Marks:</div><span>:</span><div>{data?.result?.exam?.total_marks}/{data?.result?.total_marks}</div>
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        )
    }

    // find string that have a numbers
    return (
        <CCardBody>
            <CCard className="mb-4">

                <div className="p-3">
                    <div style={{ padding: '10px 20px', background: '#cdcecf47', fontSize: '20px', fontWeight: 600, borderBottom: '2px solid', marginBottom: '20px' }}>{`${name?.full_name}'s Result`}</div>

                    <CRow>{currentYearResult?.length > 0 ?

                        currentYearResult.map(renderResultCard) : <p>No results for the current year.</p>}</CRow>

                    <CRow>{previousYearsResults?.length > 0 ? previousYearsResults.map(renderResultCard) : <p>No previous results available.</p>}</CRow>
                </div>


                {/* {previousYearsResults.map((data) => {
                    function allEqual(resultData) {
                        console.log('arr: ', resultData);
                        if (!resultData.length) return true;
                        return resultData.reduce(function (a, b) {
                            return (a === b) ? a : (!b);
                        }) === resultData[0];
                    }
                    console.log(allEqual(resultData));
                })} */}

                <Link to={'/pages/users/list'} style={{ textAlign: 'center' }}>
                    <FormButton
                        style={{
                            color: 'white', fontSize: '16px', fontWeight: '500',
                            backgroundColor: 'var(--cui-secondary)',
                            marginBottom: '20px'
                        }}
                        label='Back'
                        hoverBgColor='#44484b'
                        hoverFontColor='white'
                    />
                </Link>
            </CCard>
        </CCardBody>
    )
}

export default UserResult;
