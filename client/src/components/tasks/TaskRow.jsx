import * as React from "react";
import { connect } from "react-redux";
import * as taskActions from "../../store/tasks/taskActions";
import { Input, Button, Spin } from 'antd';
import { CheckOutlined, MinusOutlined, PlusOutlined, EditOutlined, SaveOutlined, LoadingOutlined } from '@ant-design/icons';
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

const spinIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />

class TaskRow extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            description: props.description,
            completed: props.completed,
            isEditingDescription: props.isNew,
            showLoading: false
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
        
        const { completed, isEditingDescription, description} = this.state;

        try {
            // set state first to immediately change UI
            this.setState(prevState => ({
                completed: !prevState.completed,
                isEditingDescription: false 
            }))
            await updateTask(_id, { completed: !completed, description })
        } catch (e) {
            // return to previous state since update request failed
            this.setState({ completed, isEditingDescription })
        }
    }

    addNewTask = async () => {
        const { description, completed, isEditingDescription } = this.state;

        try {
            this.setState({ isEditingDescription: false })
            await this.props.createTask({ description, completed })
            this.setState({ description: "", completed: false })
        } catch (e) {
            this.setState({ description, completed, isEditingDescription })
        }
    }

    saveTask = async () => {
        const { _id, updateTask } = this.props
        const { description, isEditingDescription } = this.state

        try {
            this.setState(prevState => ({ 
                description,
                isEditingDescription: !prevState.isEditingDescription
            })) 
            await updateTask(_id, { description })
        } catch (e) {
            this.setState({ description, isEditingDescription })
        }
    }

    deleteTask = async () => {
        try {
            this.setState({ showLoading: true, isEditingDescription: false })
            await this.props.deleteTask(this.props._id)
        } catch (e) {
            this.setState({ showLoading: false })
        }
    } 

    render() {
        const size = "small";
        const { isEditingDescription, showLoading, description, completed } = this.state;

        return (
            <div className={style.taskRow}>
                <div className={style.saveDescButton}>
                    {this.props.isNew ? null
                        : !isEditingDescription || showLoading ? <Button icon={<EditOutlined />} onClick={this.toggleEditing} size={size} />
                        : <Button type="primary" icon={<SaveOutlined />} onClick={this.saveTask} size={size} />
                    }
                </div>
                <div className={style.taskInput}>
                    <Input disabled={!isEditingDescription || showLoading} value={description} onChange={this.handleValueChange} />                    
                </div>
                <div className={style.completedButton}>
                    {showLoading ? <Button disabled icon={<CheckOutlined />} size={size} />
                        : completed ? <Button type="primary" icon={<CheckOutlined />} size={size} onClick={this.handleCheckboxChange} />
                        : <Button icon={<CheckOutlined />} size={size} onClick={this.handleCheckboxChange} />
                    }
                </div>
                <div className={style.spinner}>
                    {showLoading && <Spin indicator={spinIcon} /> }
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
