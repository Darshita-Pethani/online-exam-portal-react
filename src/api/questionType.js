import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Get question type data api...
export async function questionTypeDataApi(data) {
    try {
        const response = await callPostApi({ url: "question_type/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Delete question type data by id api
export async function deleteQuestionType(id) {
    try {
        const response = await callDeleteApi({ url: `question_type/delete/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add question type data by id api
export async function addQuestionType(data) {
    try {
        const response = await callPostApi({ url: "question_type/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get question type data by id api
export async function getQuestionTypeByIdApi(id) {
    try {
        const response = await callGetApi({ url: `question_type/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update data by id api
export async function updateQuestionType(data) {
    try {
        const response = await callPutApi({ url: "question_type/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}