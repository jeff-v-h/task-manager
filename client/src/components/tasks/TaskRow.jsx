import * as React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../store/tasks/taskActions";
import { Input, Button } from 'antd';
import { CheckOutlined, MinusOutlined, PlusOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
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
            completed: props.completed,
            isEditingDescription: props.isNew
        }
    }

    toggleEditing = () => this.setState(prevState => ({
        isEditingDescription: !prevState.isEditingDescription
    }))

    handleValueChange = e => this.setState({ description: e.target.value })

    handleCheckboxChange = async () => {
        const { _id, updateTask, isNew } = this.props

        if (isNew)
            return this.setState(prevState => ({ completed: !prevState.completed }))
        
        try {
            await updateTask(_id, { 
                completed: !this.state.completed,
                description: this.state.description
            })
             this.setState(prevState => ({
                completed: !prevState.completed,
                isEditingDescription: false 
            }))
        } catch (e) {}
    }

    addNewTask = async () => {
        const { description, completed } = this.state;

        try {
            await this.props.createTask({ description, completed })
            this.setState({
                description: "",
                completed: false
            })
        } catch (e) {}
    }

    saveTask = async () => {
        const { _id, updateTask } = this.props
        const { description, completed } = this.state

        try {
            await updateTask(_id, { description, completed })
            this.setState(prevState => ({ 
                description,
                isEditingDescription: !prevState.isEditingDescription
            }))
        } catch (e) {}
    }

    deleteTask = () => this.props.deleteTask(this.props._id)

    render() {
        const size = "small";
        return (
            <div className={style.taskRow}>
                <div className={style.saveDescButton}>
                    {this.props.isNew ? null
                        : this.state.isEditingDescription ? <Button type="primary" icon={<SaveOutlined />} onClick={this.saveTask} size={size} />
                        : <Button icon={<EditOutlined />} onClick={this.toggleEditing} size={size} />
                    }
                </div>
                <div className={style.taskInput}>
                    <Input disabled={!this.state.isEditingDescription} value={this.state.description} onChange={this.handleValueChange} />                    
                </div>
                <div className={style.completedButton}>
                    {this.state.completed 
                        ? <Button type="primary" icon={<CheckOutlined />} size={size} onClick={this.handleCheckboxChange} />
                        : <Button icon={<CheckOutlined />} size={size} onClick={this.handleCheckboxChange} />
                    }
                </div>
                <div className={style.addRemoveButton}>
                    {this.props.isNew
                        ? <Button type="primary" icon={<PlusOutlined />} onClick={this.addNewTask} size={size} />
                        : <Button type="primary" danger icon={<MinusOutlined />} onClick={this.deleteTask} size={size} />
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
