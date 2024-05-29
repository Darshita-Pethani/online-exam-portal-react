import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// roles
const RoleList = React.lazy(() => import('./views/pages/role/index'));
const AddRole = React.lazy(() => import('./views/pages/role/addRole/index'));

// users
const UsersList = React.lazy(() => import('./views/pages/users/index'));
const AddUser = React.lazy(() => import('./views/pages/users/addUser/index'));

// subjects
const SubjectList = React.lazy(() => import('./views/pages/subject/index'));
const AddSubject = React.lazy(() => import('./views/pages/subject/addSubject/index'));

// exam
const ExamList = React.lazy(() => import('./views/pages/exam/index'));
const AddExam = React.lazy(() => import('./views/pages/exam/addExam/index'));

// exam type
const ExamTypeList = React.lazy(() => import('./views/pages/examType/index'));
const AddExamType = React.lazy(() => import('./views/pages/examType/addExamType/index'));

// standard
const StandardList = React.lazy(() => import('./views/pages/standard/index'));
const AddStandard = React.lazy(() => import('./views/pages/standard/addStandard/index'));

// question type
const QuestionTypeList = React.lazy(() => import('./views/pages/questionType/index'));
const AddQuestionType = React.lazy(() => import('./views/pages/questionType/addQuestionType/index'));

// question
const AddQuestion = React.lazy(() => import('./views/pages/exam/addQuestion/index'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },

  // pages route

  // role routes
  { path: '/pages/role/list', name: 'role', element: RoleList },
  { path: '/pages/role/add', name: 'add role', element: AddRole },
  { path: '/pages/role/edit', name: 'edit role', element: AddRole },

  // users routes
  { path: '/pages/users/list', name: 'user', element: UsersList },
  { path: '/pages/users/add', name: 'add role', element: AddUser },
  { path: '/pages/users/edit', name: 'edit role', element: AddUser },

  // subject routes
  { path: '/pages/subject/list', name: 'subject', element: SubjectList },
  { path: '/pages/subject/add', name: 'add subject', element: AddSubject },
  { path: '/pages/subject/edit', name: 'edit subject', element: AddSubject },

  // exam
  { path: '/pages/exam/list', name: 'exam', element: ExamList },
  { path: '/pages/exam/add', name: 'add exam', element: AddExam },
  { path: '/pages/exam/edit', name: 'edit exam', element: AddExam },

  // exam type
  { path: '/pages/exam-type/list', name: 'exam type', element: ExamTypeList },
  { path: '/pages/exam-type/add', name: 'add exam type', element: AddExamType },
  { path: '/pages/exam-type/edit', name: 'edit exam type', element: AddExamType },

  // standard
  { path: '/pages/standard/list', name: 'standard type', element: StandardList },
  { path: '/pages/standard/add', name: 'add standard type', element: AddStandard },
  { path: '/pages/standard/edit', name: 'edit standard type', element: AddStandard },

  // question type
  { path: '/pages/question-type/list', name: 'question-type type', element: QuestionTypeList },
  { path: '/pages/question-type/add', name: 'add question-type type', element: AddQuestionType },
  { path: '/pages/question-type/edit', name: 'edit question-type type', element: AddQuestionType },

  // question
  { path: '/pages/exam/question/add', name: 'add question type', element: AddQuestion },
  { path: '/pages/exam/question/edit', name: 'edit question type', element: AddQuestion },
]

export default routes
