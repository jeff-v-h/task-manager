import * as React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../store/tasks/taskActions";
import { Input, Button } from 'antd';
import { CheckOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import style from "./tasks.scss";
import PropTypes from 'prop-types';

const propTypes = {
    description: PropTypes.string,
    completed: PropTypes.bool,
    _id: PropTypes.string,
    isNew: PropTypes.bool
}

const defaultProps = {
    description: "",
    completed: false
}

class TaskRow extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            description: props.description,
            completed: props.completed
        }
    }

    handleValueChange = e => this.setState({ description: e.target.value })

    handleCheckboxChange = () => this.setState(prevState => ({ completed: !prevState.completed }))

    addNewTask = () => {
        const { description, completed } = this.state;
        this.props.createTask({ description, completed })
    }

    render() {
        const size = "small";
        return (
            <div className={style.taskRow}>
                <div className={style.taskInput}>
                    <Input value={this.state.description} onChange={this.handleValueChange} />
                </div>
                <div className={style.completedButton}>
                    {this.state.completed 
                        ? <Button type="primary" icon={<CheckOutlined />} size={size} onClick={this.handleCheckboxChange} />
                        : <Button icon={<CheckOutlined />} size={size} onClick={this.handleCheckboxChange} />
                    }
                </div>
                <div className={style.addRemoveButton}>
                    {this.props.isNew
                        ? <Button type="primary" color="blue" icon={<PlusOutlined />} onClick={this.addNewTask} size={size} />
                        : <Button type="primary" danger icon={<MinusOutlined />} size={size} />
                    }
                </div>
            </div>
        );
    }
}

TaskRow.propTypes = propTypes;
TaskRow.defaultProps = defaultProps;

export default connect(
    state => ({ tasks: state.tasks }),
    taskActions
)(TaskRow);
