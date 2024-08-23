import React from 'react'
import CIcon from '@coreui/icons-react'
import { cibHackhands, cibQuora, cibStackbit, cilBook, cilListRich, cilPenAlt, cilPeople, cilSpeedometer, cilUser } from '@coreui/icons'
import { FaUsers } from 'react-icons/fa'
import { CNavGroup, CNavItem } from '@coreui/react'
import { ImUserTie } from 'react-icons/im'
import { SiGitbook } from 'react-icons/si'
import { GiNotebook, GiStack } from 'react-icons/gi'
import { PiSealQuestionFill } from 'react-icons/pi'
import { IoNewspaper } from 'react-icons/io5'
import { moduleList } from './views/utils/config'

const _nav = [
    // dashboard
    {
        component: CNavItem,
        type: 'item',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        module: moduleList.DASHBOARD,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    // role
    {
        component: CNavItem,
        type: 'item',
        name: 'Role',
        to: 'pages/role/list',
        // icon: <ImUserTie customClassName="nav-icon" style={{ marginRight: '0.75rem' }} />,
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        module: moduleList.ROLES,
    },
    // user
    {
        component: CNavItem,
        type: 'item',
        name: 'Users',
        to: 'pages/users/list',
        // icon: <FaUsers customClassName="nav-icon" style={{ marginRight: '0.75rem' }} />,
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
        module: moduleList.USERS,
    },
    // standard
    {
        component: CNavItem,
        type: 'item',
        name: 'Standard',
        to: 'pages/standard/list',
        // icon: <GiStack customClassName="nav-icon" style={{ marginRight: '0.75rem' }} />,
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        module: moduleList.STANDARD,
    },
    // subject
    {
        component: CNavItem,
        type: 'item',
        name: 'Subject',
        to: 'pages/subject/list',
        // icon: <SiGitbook customClassName="nav-icon" style={{ marginRight: '0.75rem' }} />,
        icon: <CIcon icon={cibStackbit} customClassName="nav-icon" />,
        module: moduleList.SUBJECTS,
    },
    // question types
    {
        component: CNavItem,
        type: 'item',
        name: 'Question Type',
        to: 'pages/question-type/list',
        // icon: <PiSealQuestionFill customClassName="nav-icon" style={{ marginRight: '0.75rem' }} />,
        icon: <CIcon icon={cibQuora} customClassName="nav-icon" />,
        module: moduleList.QUESTION_TYPES,
    },
    // exam
    {
        component: CNavGroup,
        type: 'collapse',
        name: 'Exam',
        to: 'pages/exam/list',
        // icon: <GiNotebook customClassName="nav-icon" style={{ marginRight: '0.75rem' }} />,
        icon: <CIcon icon={cilPenAlt} customClassName="nav-icon" />,
        module: moduleList.EXAMS,
        items: [
            {
                component: CNavItem,
                name: 'Exam Type',
                type: 'item',
                to: 'pages/exam-type/list',
                module: moduleList.EXAM_TYPE_LIST,
            },
            {
                component: CNavItem,
                name: 'Exam',
                type: 'item',
                to: 'pages/exam/list',
                module: moduleList.EXAMS,
            },
        ],
    },
]

export default _nav
