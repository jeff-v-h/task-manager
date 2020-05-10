import C from "./taskConstants";
import taskService from "../../services/taskService";
import cookieService from "../../services/cookieService";

export const actionCreators = {
    create: (task) => async (dispatch) => {
        dispatch({ type: C.CREATE_TASK_REQUEST });

        try {
            const token = cookieService.getUserToken()
            const createdTask = await taskService.create(token)

            dispatch({ type: C.CREATE_TASK_SUCCESS, payload: createdTask });
        } catch (e) {
            dispatch({ type: C.CREATE_TASK_FAILURE });
        }
    },
    getAll: (filters) => async (dispatch) => {
        dispatch({ type: C.GET_ALL_TASKS_REQUEST });

        try {
            const token = cookieService.getUserToken()
            const tasks = await taskService.getAll(filters, token)

            dispatch({ type: C.GET_ALL_TASKS_SUCCESS, payload: tasks });
        } catch (e) {
            dispatch({ type: C.GET_ALL_TASKS_FAILURE });
        }
    },
    get: (id) => async (dispatch, getState) => {
        const appState = getState();
        const taskFromList = appState.tasks?.list.find(t => t._id === id);
        if (taskFromList) {
            return dispatch({ type: C.GET_TASK_SUCCESS, payload: taskFromList });
        }
 
        dispatch({ type: C.GET_TASK_REQUEST });

        try {
            const token = cookieService.getUserToken()
            const task = await taskService.get(id, token)

            dispatch({ type: C.GET_TASK_SUCCESS, payload: task });
        } catch (e) {
            dispatch({ type: C.GET_TASK_FAILURE });
        }
    },
    update: (id, data) => async (dispatch) => {
        dispatch({ type: C.UPDATE_TASK_REQUEST });

        try {
            const token = cookieService.getUserToken()
            const task = await taskService.update(id, data, token)

            dispatch({ type: C.UPDATE_TASK_SUCCESS, payload: task });
        } catch (e) {
            dispatch({ type: C.UPDATE_TASK_FAILURE });
        }
    },
    delete: (id) => async (dispatch) => {
        dispatch({ type: C.DELETE_TASK_REQUEST });

        try {
            const token = cookieService.getUserToken()
            const task = await taskService.delete(id, token)

            dispatch({ type: C.DELETE_TASK_SUCCESS, payload: task._id });
        } catch (e) {
            dispatch({ type: C.DELETE_TASK_FAILURE });
        }
    },
};