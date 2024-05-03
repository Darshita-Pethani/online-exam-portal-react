import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Get role data api...
export async function roleDataApi(data) {
    try {
        const response = await callPostApi({ url: "role/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

