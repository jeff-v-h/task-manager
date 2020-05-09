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

export const get = (url, showDefaultErrorMsg = true) => {
    return axios.get(url, AxiosConfig).catch(e => {
        if (showDefaultErrorMsg) {
            const msg = defaultErrorMessage(e);
            return Promise.reject(msg);
        }
        return Promise.reject(e);
    });
};

export const post = (url, payload, showDefaultErrorMsg = true) => {
    return axios.post(url, payload, AxiosConfig).catch((e) => {
        if (showDefaultErrorMsg) {
            const msg = defaultErrorMessage(e);
            return Promise.reject(msg);
        }
        return Promise.reject(e);
    });
};

export const put = (url, payload, showDefaultErrorMsg = true) => {
    return axios.put(url, payload, AxiosConfig).catch((e) => {
        if (showDefaultErrorMsg) {
            const msg = defaultErrorMessage(e);
            return Promise.reject(msg);
        }
        return Promise.reject(e);
    });
};


export const defaultErrorMessage = (error) => {
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
