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

// user forgot password
export async function userForgotPasswordUsingOtpApi(data) {
    try {
        const response = await callPostApi({ url: "user/forgotPassword/otp", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}
