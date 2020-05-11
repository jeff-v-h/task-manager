import axios from "axios";

const AxiosConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Cache-Control": "no-cache, no-store",
        Pragma: "no-cache",
    },
    // timeout: 30000
};

export const get = (url, token = null, showDefaultErrorMsg = true) => {
    const config = getConfig(token);
    return axios.get(url, config).catch(e => parseError(e, showDefaultErrorMsg));
};

export const post = (url, data, token = null, showDefaultErrorMsg = true) => {
    const config = getConfig(token);
    return axios.post(url, data, config).catch(e => parseError(e, showDefaultErrorMsg));
};

export const update = (url, data, token = null, showDefaultErrorMsg = true) => {
    const config = getConfig(token);
    return axios.patch(url, data, config).catch(e => parseError(e, showDefaultErrorMsg));
};

export const deleteRequest = (url, data, token = null, showDefaultErrorMsg = true) => {
    const config = getConfig(token);
    return axios.delete(url, data, config).catch(e => parseError(e, showDefaultErrorMsg));
};

const getConfig = (token) => {
    const config = { ...AxiosConfig }
    if (token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
}

const parseError = (e, showDefaultErrorMsg) => {
    if (showDefaultErrorMsg) {
        const msg = defaultErrorMessage(e);
        return Promise.reject(msg);
    }
    return Promise.reject(e);
}

const defaultErrorMessage = (error) => {
    let errorMsg = "Server error";
    if (error.code === "ECONNABORTED") {
        errorMsg = "Request timeout";
    } else if (error.response?.status === 400) {
        errorMsg = "Invalid data";
    } else if (error.response?.status === 401) {
        errorMsg = "Unauthorised";
    } else if (error.response?.status === 404) {
        errorMsg = "Not found";
    }
    return errorMsg;
};
