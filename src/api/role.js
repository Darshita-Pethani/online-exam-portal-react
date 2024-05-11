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

// Delete role data by id api
export async function deleteRole(id) {
    try {
        const response = await callDeleteApi({ url: `role/delete/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Add role data by id api
export async function addRole(data) {
    try {
        const response = await callPostApi({ url: "role/add", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}


// Get role data by id api
export async function getRoleDataByIdApi(id) {
    try {
        const response = await callGetApi({ url: `role/${id}` });
        return response;
    } catch (error) {
        throw error;
    }
}

// Update data by id api
export async function updateRoleDataApi(data) {
    try {
        const response = await callPutApi({ url: "role/update", body: data });
        return response;
    } catch (error) {
        throw error;
    }
}