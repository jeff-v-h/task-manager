import C from "./userConstants";

const unloadedState = {
  isFetching: false,
  name: "",
  email: "",
  age: 0,
  token: ""
};

function userReducer(state = unloadedState, action) {
    if (state === undefined) {
        return unloadedState;
    }
    
    switch (action.type) {
        case C.LOGIN_USER_REQUEST:
            return { ...state, isFetching: true }
        case C.LOGIN_USER_SUCCESS:
            const { token, user } = action.payload;
            return { isFetching: false, token, ...user }
        case C.LOGIN_USER_FAILURE:
            return { ...state, isFetching: false };

        default:
            return state;
    }
}

export default userReducer;
