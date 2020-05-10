import React from 'react';
import { Route, Redirect } from "react-router-dom";
import cookiesService from "../../services/cookieService";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            cookiesService.getUserToken()
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}

export default PrivateRoute;