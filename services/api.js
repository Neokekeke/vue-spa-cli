import callApi from "./callApi";
import { getBaseName } from "./server";

// eg: 获取result api
export const TestKoa = {
    getResult: data => callApi(getBaseName + '/getResult', "GET", data)
};
