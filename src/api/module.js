import { callGetApi } from "./api";

export const getModuleListApi = async () => {
    try {
        const response = await callGetApi({ url: 'module/list' });
        return response;
    } catch (err) {
        console.log('err:', err)
    }
}