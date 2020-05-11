import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import * as userActions from "../../store/user/userActions";
import { Form, Input, Button, Checkbox, message } from 'antd';
import style from "./signup.scss";
 
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class SignUp extends React.Component {
    onSubmit = async values => {
        const { createAccount, history } = this.props;
        if (values.password !== values.confirmpassword) {
            return message.error("Passwords do not match");
        }

        try {
            delete values.confirmpassword
            await createAccount({ ...values })
            message.success('Account created successfully!')
            history.push('/')
        } catch (e) {} // errors displayed via service
    };

    render() {
        return (
            <div className={style.centerContainer}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={this.onSubmit}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email Username"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmpassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password again to confirm!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div className={style.buttonContainer}>
                        <Button type="primary" htmlType="submit">Create</Button>
                    </div>

                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user })

export default compose(
    withRouter,
    connect(mapStateToProps, userActions)
)(SignUp);
