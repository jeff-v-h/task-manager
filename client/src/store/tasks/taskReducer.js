import C from "./taskConstants";

const unloadedState = {
  isFetching: false,
  list: [],
  description: "",
  _id: "",
  completed: false
};

function taskReducer(state = unloadedState, action) {
    if (state === undefined) {
        return unloadedState;
    }
    let list;
    
    switch (action.type) {
        case C.CREATE_TASK_REQUEST:
        case C.GET_ALL_TASKS_REQUEST:
        case C.GET_TASK_REQUEST:
        case C.UPDATE_TASK_REQUEST:
            return { ...state, isFetching: true }

        case C.CREATE_TASK_FAILURE:
        case C.GET_ALL_TASKS_FAILURE:
        case C.GET_TASK_FAILURE:
        case C.UPDATE_TASK_FAILURE:
            return { ...state, isFetching: false };

        case C.CREATE_TASK_SUCCESS:
            list = [...state.list, action.payload]
            return { ...state, list, isFetching: false }

        case C.GET_ALL_TASKS_SUCCESS:
            return { ...state, list: action.payload, isFetching: false }

        case C.GET_TASK_SUCCESS:
            return { ...state, ...action.payload, isFetching: false }

        case C.UPDATE_TASK_SUCCESS:
            list = state.list.map(t => (t._id === action.payload._id) ? action.payload : t)
            return { ...state, list, ...action.payload, isFetching: false }
        
        case C.DELETE_TASK_SUCCESS:
            list = state.list.filter(t => t._id !== action.payload)
            return { ...unloadedState, list }

        case C.CLEAR_TASKS:
            return unloadedState

        default:
            return state;
    }
}

export default taskReducer;
