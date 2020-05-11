import * as React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./login/Login";
import TaskDashboard from "./tasks/TaskDashboard";
import SignUp from "./signup/SignUp";

export default () => (
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <PrivateRoute path={["/", "/tasks"]} component={TaskDashboard} />
  </Switch>
);
