import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Get role data api...
export async function subjectDataApi(data) {
    try {
        const response = await callPostApi({ url: "subject/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Delete role data by id api
export async function deleteSubject(id) {
    try {
        const response = await callDeleteApi({ url: `subject/delete/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add role data by id api
export async function addSubject(data) {
    try {
        const response = await callPostApi({ url: "subject/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get role data by id api
export async function getSubjectDataByIdApi(id) {
    try {
        const response = await callGetApi({ url: `subject/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update data by id api
export async function updateSubjectDataApi(data) {
    try {
        const response = await callPutApi({ url: "subject/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}