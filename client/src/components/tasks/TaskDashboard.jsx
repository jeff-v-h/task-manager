import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as taskActions from "../../store/tasks/taskActions";
import TaskRow from './TaskRow';
import style from "./tasks.scss";

class TaskDashboard extends React.Component { 
    componentDidMount() {
        this.props.getTasks()
    }

    render() {
        return (
            <div className={style.checkListContainer}>
                <div className={style.checklist}>
                    {this.props.tasks.list.map(task => {
                        return <TaskRow key={task._id} {...task} />
                    })}
                    <TaskRow isNew />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ tasks: state.tasks })
const mapDispatchToProps = {
    ...taskActions
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(TaskDashboard);
