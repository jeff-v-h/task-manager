import React from "react";
import { Menu } from "antd";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { actionCreators } from "../../store/user/userActions";
import cookiesService from '../../services/cookieService';
import style from "./navbar.scss";

const Item = Menu.Item;

class NavBar extends React.Component {
    state = {
        current: "tasks",
    };

    handleClickAppMain = () => this.props.history.push('/')

    handleClick = (e) => this.setState({ current: e.key });

    logout = () => {
        const { history, logout } = this.props;
        logout();
        history.push('/login')
    }


    render() {
        const { user } = this.props;
        const isAuthenticated = user.isToken || cookiesService.getUserToken()
        return (
            <div className={style.navbar}>
                <div className={style.navAppName} onClick={this.handleClickAppMain}>Task Manager</div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className={style.navMenu}
                >
                    {isAuthenticated && (
                        <Item key="tasks">
                            <Link to="/tasks">Tasks</Link>
                        </Item>
                    )}
                    {isAuthenticated ? (
                        <Item key="logout" className={style.right} onClick={this.logout}>
                            Logout
                        </Item>
                    ) : (
                        <Item key="login" className={style.right}>
                            <Link to="/login">Login</Link>
                        </Item>
                    )}
                </Menu>
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect(
      state => ({ user: state.user }),
      actionCreators
    )
)(NavBar);