import { post } from "../helpers/apiHelper";
import { keys } from "../helpers/keys";

const { apiUrl } = keys;

const userService = {
    login: async (email, password) => {
        try {
            const url = `${apiUrl}/api/users/login`;
            const resp = await post(url, { email, password });
            return resp.data;
        } catch (e) {
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
    },
    createUser: async (user) => {
        try {
            const url = `${apiUrl}/api/users`;
            const resp = await post(url, user, null, false);
            return resp.data;
        } catch (e) {
            let msg = "User unable to be created";
            if (e?.response?.data?.error) {
                msg = e.response.data.error
            } else if (e) {
                msg = e;
            }

            return Promise.reject(msg);
        }
    }
}

export default userService;