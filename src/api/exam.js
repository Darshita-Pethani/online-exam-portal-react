import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Get exam data api...
export async function examDataApi(data) {
    try {
        const response = await callPostApi({ url: "exam/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Delete exam data by id api
export async function deleteExam(id) {
    try {
        const response = await callDeleteApi({ url: `exam/delete/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add exam data by id api
export async function addExam(data) {
    try {
        const response = await callPostApi({ url: "exam/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get exam data by id api
export async function getExamDataByIdApi(id) {
    try {
        const response = await callGetApi({ url: `exam/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update data by id api
export async function updateExamDataApi(data) {
    try {
        const response = await callPutApi({ url: "exam/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}