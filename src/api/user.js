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
        const response = await callPutApi({ url: `user/otp_verification/reset_password/${id}`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// user log out
export async function userLogoutApi(data, id) {
    try {
        const response = await callPostApi({ url: `user/sign_out`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// user status update
export async function statusUpdateApi(data) {
    try {
        const response = await callPostApi({ url: `utils/update/status`, body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Get users data api...
export async function usersDataApi(data) {
    try {
        const response = await callPostApi({ url: "user/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Get users data by id api
export async function getUsersDataByIdApi(id) {
    try {
        const response = await callGetApi({ url: `user/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add user from another user
export async function addUser(data) {
    try {
        const response = await callPostApi({ url: "user/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Update user from another user
export async function updateUser(data) {
    try {
        const response = await callPutApi({ url: "user/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Delete user from another user by id
export async function deleteUser(id) {
    try {
        const response = await callDeleteApi({ url: `user/delete/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Get user enroll list
export async function GetUserEnrollList(data) {
    try {
        const response = await callPostApi({ url: "user_exam_enroll/getDataByexamId/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}