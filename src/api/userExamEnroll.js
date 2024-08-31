import { callGetApi, callPostApi } from "./api";

// Add exam answer by id api
export async function addUserAnswers(data) {
    try {
        const response = await callPostApi({ url: "user_exam_enroll/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// show student result using token.
export async function showUserResult() {
    try {
        const response = await callGetApi({ url: "result/getresult" });
        return response;
    } catch (error) {
        throw error;
    }
}