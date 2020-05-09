import C from "./userConstants";
import userService from "../../services/userService";

export const actionCreators = {
    login: (email, password) => async (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState?.email !== email) {
            dispatch({ type: C.LOGIN_USER_REQUEST });
    
            try {
                dispatch({
                    type: C.LOGIN_USER_SUCCESS,
                    payload: await userService.login(email, password)
                });
            } catch (e) {
                dispatch({ type: C.LOGIN_USER_FAILURE });
            }
        }
    },
  };