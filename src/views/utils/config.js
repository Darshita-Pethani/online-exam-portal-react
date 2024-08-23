import _nav from "../../_nav";

export const moduleList = {
    ROLES: "Roles",
    USERS: "Users",
    QUESTIONS: "Questions",
    QUESTION_TYPES: 'Question Types',
    RESULTS: "Results",
    USER_TESTS: "User Tests",
    SUBJECTS: 'Subjects',
    STANDARD: 'Standards',
    EXAMS: "Exams",
    EXAM_TYPE_LIST: "Exam Type List",
    DASHBOARD: "Dashboard",
}

export async function setPermissionInAction(navModules, modules, location) {
    try {
        let moduleData;

        for (const module of navModules) {
            if (module?.type === 'collapse') {
                moduleData = await setPermissionInAction(module?.items, modules, location);
                if (moduleData) break;
            } else {
                if (module?.to === location?.pathname.slice(1)) {
                    moduleData = module;
                    break; // Break the loop when a match is found
                }
            }
        }

        if (moduleData) {
            const getReadAccess = modules.filter((item) => item?.name === moduleData?.module);
            if (getReadAccess?.length > 0) {
                moduleData = getReadAccess[0]?.permissions;
            }
            // setPermissionData(getReadAccess[0]?.permissions);
            // if (!getReadAccess[0]?.permissions?.read_access) {
            //     dispatch({ type: MENU_OPEN, data: { id: "default", parentId: "" } });
            //     navigate("/dashboard");
            // }
        }

        return moduleData;
    } catch (error) {
        throw error;
    }
}
