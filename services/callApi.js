import axios from "axios";
import { getHeaders } from './createHeaders'

export const callApi = (endpoint, method, obj, responseType, timeout) => {
    const header = getHeaders();
    const bodyStream = obj.bodyStream || '';
    return new Promise((resolve, reject) => {
        axios({
            url: endpoint,
            method: method, 
            headers: header,
            data: bodyStream,
            responseType: responseType || "json", // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            timeout: timeout || 20000
        }).then(res => resolve(res.data)).catch(err => {
            console.log(err.response.data);
            return reject(err.response.data);
        });
    });
};
