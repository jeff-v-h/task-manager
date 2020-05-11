import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as userActions from "../../store/user/userActions";
import { Form, Input, Button, Checkbox } from 'antd';
import style from "./tasks.scss";
import PropTypes from 'prop-types';

const propTypes = {
    description: PropTypes.string,
    completed: PropTypes.bool,
    _id: PropTypes.string
}

class TaskRow extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            value: props.description,
            completed: props.completed
        }
    }

    handleValueChange = e => this.setState({ value: e.target.value })

    handleCheckboxChange = e => this.setState({ completed: e.target.checked })

    render() {
        return (
            <div className={style.taskRow}>
                <Input value={this.state.value} onChange={this.handleValueChange} />
                <Checkbox checked={this.state.completed} onChange={this.handleCheckboxChange} />
                <Button danger>-</Button>
            </div>
        );
    }
}

TaskRow.propTypes = propTypes;

export default connect(
    state => ({ tasks: state.tasks }),
    userActions
)(TaskRow);
