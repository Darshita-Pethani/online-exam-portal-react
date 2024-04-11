import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// user login
export async function userLogin(data) {
    try {
        const response = await callPostApi({ url: "user/sign_in", body: data });
        return response
    } catch (error) {
        throw error;
    }
}