import C from "./userConstants";

const unloadedState = {
  isFetching: false,
  name: "",
  email: "",
  age: 0,
  isToken: false
};

function userReducer(state = unloadedState, action) {
    if (state === undefined) {
        return unloadedState;
    }
    
    switch (action.type) {
        case C.LOGIN_USER_REQUEST:
            return { ...state, isFetching: true }
        case C.LOGIN_USER_SUCCESS:
            return { isFetching: false, ...action.payload.user, isToken: true }
        case C.LOGIN_USER_FAILURE:
            return { ...state, isFetching: false };

        default:
            return state;
    }
}

export default userReducer;
