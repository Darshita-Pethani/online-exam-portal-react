import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Get ExamType data api...
export async function examTypeDataApi(data) {
    try {
        const response = await callPostApi({ url: "exam_type/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Delete ExamType data by id api
export async function deleteExamType(id) {
    try {
        const response = await callDeleteApi({ url: `exam_type/delete/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add ExamType data by id api
export async function addExamType(data) {
    try {
        const response = await callPostApi({ url: "exam_type/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Get ExamType data by id api
export async function getExamTypeDataByIdApi(id) {
    try {
        const response = await callGetApi({ url: `exam_type/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update data by id api
export async function updateExamTypeDataApi(data) {
    try {
        const response = await callPutApi({ url: "exam_type/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}