import React, { useEffect, useMemo, useState } from 'react'
import { CCardBody } from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import TableContainer from '../../../components/TableContainer'
import "bootstrap/dist/css/bootstrap.min.css"
import { statusData } from '../../utils/helper'
import UpdateStatus from '../../../components/updateStatus'
import { allDispatch } from '../../../store/allDispatch'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { DeleteRecord } from '../../../components/deleteRecord'
import FormButton from '../../forms/formButton'
import { deleteQuestionType, questionTypeDataApi } from '../../../api/questionType'
import { setPermissionInAction } from '../../utils/config'
import { useSelector } from 'react-redux'
import _nav from '../../../_nav'

const QuestionTypeList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showNotification } = allDispatch();

    const [questionTypeList, setQuestionTypeList] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const modules = useSelector((state) => state?.user?.moduleData);
    const [accessData, setAccessData] = useState(null);

    const [defaultFilter, setDefaultFilter] = useState({
        "currentPage": 1,
        "itemsPerPage": 5,
        "sortBy": [],
        "filters": []
    });

    const roleData = async () => {
        const response = await questionTypeDataApi(defaultFilter);
        if (response?.status === 200) {
            setQuestionTypeList(response?.data?.data?.rows);
            setRowCount(response?.data?.data?.count);
        } else if (response?.status === 401) {
            navigate("/");
        }
    }

    const hasPermissionData = async () => {
        let response = await setPermissionInAction(_nav, modules, location)
        setAccessData(response)
    }

    useEffect(() => {
        hasPermissionData()
    }, [])

    const columns = useMemo(() => {
        let baseColumns = [
            {
                accessorKey: 'name',
                header: 'QUESTION TYPE',
                size: 150,
                Cell: ({ row }) => <>{row?.original?.name || "-"}</>
            },
        ]

        let statusColumn = {
            accessorKey: 'status',
            header: 'STATUS',
            size: 150,
            filterVariant: 'select',
            mantineFilterSelectProps: {
                data: statusData,
            },
            Cell: ({ row }) => (
                <>
                    <UpdateStatus
                        data={row}
                        tableNameProp='question_types'
                        // writeAccess={common?.access?.write_access ? true : false}
                        setStatusUpdate={setStatusUpdate}
                    />
                </>
            ),
        }

        let actionColumn = {
            accessorKey: 'action',
            header: 'ACTION',
            size: 150,
            enableColumnFilter: false,
            enableSorting: false,
            enableHiding: false, // hide thase j ny aa column ane hide thy pn ske aa proprty thi
            Cell: ({ row }) => (
                <>
                    <div style={{ display: "flex", alignItems: "center", gap: '10px', justifyContent: 'center' }}>
                        {accessData?.write_access && (
                            <div style={{ background: "rgb(88 86 214 / 8%)" }} className='editDeleteButton edit'
                            >
                                <CiEdit style={{ color: 'rgb(4 0 255)' }}
                                    onClick={() => getQuestionTypeDataById(row?.original?.id)}
                                />
                            </div>
                        )}

                        {accessData?.delete_access && (
                            <div style={{ background: "rgb(238 51 94 / 10%)" }} className='editDeleteButton delete'>
                                <MdDelete style={{ color: 'rgb(238,51,94)' }}
                                    onClick={() => (DeleteRecord(row?.original?.id, deleteQuestionType, showNotification, setStatusUpdate))} />
                            </div>
                        )}
                    </div>
                </>
            ),
        }

        if (accessData?.write_access || accessData?.delete_access) {
            baseColumns.push(statusColumn, actionColumn)
        }

        return baseColumns;
    }, [accessData]);

    // Get question type data by id
    const getQuestionTypeDataById = async (id) => {
        navigate('/pages/question-type/edit', {
            state: {
                id: id,
                editData: true
            }
        });
    }

    // userEffect ma questionTypeList arry etle nathi lakhyi km k network ma eni apis call tha tha kare che
    // to statusUpdate thi thy jase aama khali statusUpdate pr j list joiye etle
    useEffect(() => {
        roleData(defaultFilter);
    }, [defaultFilter, statusUpdate]);

    return (
        <CCardBody>
            {accessData?.write_access && (
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <FormButton
                        style={{
                            color: 'white', fontSize: '16px', fontWeight: '500', marginBottom: '24px',
                            backgroundColor: 'var(--cui-primary)'
                        }}
                        hoverBgColor='#4846db'
                        hoverFontColor='white'
                        label='Add Question Type'
                        onClick={() => navigate('/pages/question-type/add')}
                    />
                </div>
            )}

            <div style={{ marginBottom: '24px' }}>
                <TableContainer
                    title='Question Type'
                    columns={columns}
                    data={questionTypeList}
                    defaultFilter={defaultFilter}
                    setDefaultFilter={setDefaultFilter}
                    rowCount={rowCount}
                />
            </div>
        </CCardBody>
    )
}

export default QuestionTypeList
