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
        case C.LOGOUT_USER_REQUEST:
        case C.CREATE_USER_REQUEST:
            return { ...state, isFetching: true }

        case C.LOGIN_USER_FAILURE:
        case C.CREATE_USER_FAILURE:
            return { ...state, isFetching: false };

        case C.LOGOUT_USER_SUCCESS:
        case C.LOGOUT_USER_FAILURE:
            return { ...unloadedState }
        
        case C.LOGIN_USER_SUCCESS:
        case C.CREATE_USER_SUCCESS:
            return { ...action.payload, isFetching: false, isToken: true }

        default:
            return state;
    }
}

export default userReducer;
