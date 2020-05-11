import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import * as userActions from "../../store/user/userActions";
import { Form, Input, Button, Checkbox, message } from 'antd';
import style from "./login.scss";
 
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

class Login extends React.Component {
    onSubmit = async values => {
        const { login, history } = this.props;
        try {
            await login(values.username, values.password)
            history.push('/')
        } catch (e) {} // error shown from login action
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
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder="testuser@example.com" />
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
                        <Input.Password placeholder="Test123$" />
                    </Form.Item>

                    {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <div className={style.buttonContainer}>
                        <Button type="link" style={{ color: 'blue' }}>
                            <Link to="/signup">Sign Up</Link>
                        </Button>
                        <Button type="primary" htmlType="submit">Login</Button>
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
)(Login);
