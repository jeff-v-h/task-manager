import C from "./userConstants";
import userService from "../../services/userService";
import cookieService from "../../services/cookieService";

export const actionCreators = {
    login: (email, password) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState?.email !== email) {
            dispatch({ type: C.LOGIN_USER_REQUEST });
    
            try {
                const user = await userService.login(email, password);

                cookieService.setUserToken(user.token);
                delete user.token

                dispatch({
                    type: C.LOGIN_USER_SUCCESS,
                    payload: user
                });
                return;
            } catch (e) {
                dispatch({ type: C.LOGIN_USER_FAILURE });
                return Promise.reject(e);
            }
        }
    },
    logout: () => async (dispatch) => {
        dispatch({ type: C.LOGOUT_USER_REQUEST });
    
            try {
                const token = cookieService.getUserToken()
                await userService.logout(token);
                cookieService.removeUserToken()

                dispatch({ type: C.LOGOUT_USER_SUCCESS });
            } catch (e) {
                dispatch({ type: C.LOGOUT_USER_FAILURE });
            }
    }
};