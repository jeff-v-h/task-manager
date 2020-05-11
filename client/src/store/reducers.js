import userReducer from "./user/userReducer";
import taskReducer from './tasks/taskReducer';

const reducers = {
  user: userReducer,
  tasks: taskReducer
};

export default reducers;
