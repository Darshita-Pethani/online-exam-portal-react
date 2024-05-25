import { callPostApi, callDeleteApi, callPutApi, callGetApi } from "./api";

// Get standard data api...
export async function standardDataApi(data) {
    try {
        const response = await callPostApi({ url: "standard/list", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}

// Delete standard data by id api
export async function deleteStandard(id) {
    try {
        const response = await callDeleteApi({ url: `standard/delete/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add standard data by id api
export async function addStandard(data) {
    try {
        const response = await callPostApi({ url: "standard/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get standard data by id api
export async function getStandardDataByIdApi(id) {
    try {
        const response = await callGetApi({ url: `standard/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update data by id api
export async function updateStandardDataApi(data) {
    try {
        const response = await callPutApi({ url: "standard/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}