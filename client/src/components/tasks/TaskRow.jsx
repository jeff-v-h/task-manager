import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as userActions from "../../store/user/userActions";
import { Form, Input, Button, Checkbox } from 'antd';
import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
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

    handleCheckboxChange = () => this.setState(prevState => ({ completed: !prevState.completed }))

    render() {
        return (
            <div className={style.taskRow}>
                <div className={style.taskInput}>
                    <Input value={this.state.value} onChange={this.handleValueChange} />
                </div>
                <div className={style.completedButton}>
                    {this.state.completed ? (
                        <Button type="primary" icon={<CheckOutlined />} size="small" onClick={this.handleCheckboxChange} />
                    ) : (
                        <Button icon={<CheckOutlined />} size="small" onClick={this.handleCheckboxChange} />
                    )}
                </div>
                <div className={style.addRemoveButton}>
                   <Button type="primary" danger icon={<MinusOutlined />} size="small" />
                </div>
            </div>
        );
    }
}

TaskRow.propTypes = propTypes;

export default connect(
    state => ({ tasks: state.tasks }),
    userActions
)(TaskRow);
