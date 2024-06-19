import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Get question data api...
export async function questionDataApi(data) {
    try {
        const response = await callPostApi({ url: "question/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Delete question data by id api
export async function deleteQuestion(id) {
    try {
        const response = await callDeleteApi({ url: `question/delete/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add question data by id api
export async function addQuestion(data) {
    try {
        const response = await callPostApi({ url: "question/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get question data by id api
export async function getQuestionDataByIdApi(id) {
    try {
        const response = await callGetApi({ url: `question/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update data by id api
export async function updateQuestionDataApi(data) {
    try {
        const response = await callPutApi({ url: "question/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// update question sort order
export async function updateOptionSortOrder(data) {
    try {
        const response = await callPutApi({ url: "question/sort/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}