import { post } from "../helpers/apiHelper";
import { message } from "antd";
import { keys } from "../helpers/keys";

const { apiUrl } = keys;

const userService = {
    login: async (email, password) => {
        try {
            const url = `${apiUrl}/users/login`;
            const resp = await post(url, { email, password });
            return resp.data;
        } catch (e) {
            message.error(e);
            return Promise.reject(e);
        }
    }
}

export default userService;