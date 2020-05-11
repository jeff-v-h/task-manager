import * as React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./login/Login";
import TaskDashboard from "./tasks/TaskDashboard";

export default () => (
  <Switch>
    <Route path="/login" component={Login} />
    <PrivateRoute path={["/", "/tasks"]} component={TaskDashboard} />
  </Switch>
);
