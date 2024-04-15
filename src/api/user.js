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

// user otp verification
export async function userOtpVerificationApi(data) {
    try {
        const response = await callPostApi({ url: "user/otp_verification", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// user reset password
export async function userResetPasswordApi(data, id) {
    try {
        const response = await callPutApi({ url: `user//otp_verification/reset_password/${id}`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}
