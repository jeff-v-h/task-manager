import { post } from "../helpers/apiHelper";
import { message } from "antd";
import { keys } from "../helpers/keys";

const { apiUrl } = keys;

const userService = {
    login: async (email, password) => {
        try {
            const url = `${apiUrl}/api/users/login`;
            const resp = await post(url, { email, password });
            return resp.data;
        } catch (e) {
            message.error(e);
            return Promise.reject(e);
        }
    },
    logout: async (token) => {
        try {
            const url = `${apiUrl}/api/users/logout`;
            await post(url, null, token);
            return;
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

export default userService;