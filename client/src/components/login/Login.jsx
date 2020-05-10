import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { actionCreators } from "../../store/user/userActions";
import { Form, Input, Button, Checkbox } from 'antd';
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
    onSubmit = values => {
        this.props.login(values.username, values.password)
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

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default compose(
  withRouter,
  connect(
    state => state.user,
    actionCreators
  )
)(Login);
