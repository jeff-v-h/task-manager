import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { actionCreators } from "../../store/user/userActions";
import { Form, Input, Button, Checkbox } from 'antd';
import style from "./tasks.scss";

class TaskDashboard extends React.Component { 
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                Show Tasks
            </div>
        );
    }
}

export default compose(
  withRouter,
  connect(
    state => state.tasks,
    actionCreators
  )
)(TaskDashboard);
