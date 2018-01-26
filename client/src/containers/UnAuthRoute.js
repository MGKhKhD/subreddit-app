import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UnAuthRoute = ({  isAuthenticated, component: Component, ...rest}) => (
    <Route {...rest} render={props=> !isAuthenticated? 
        (<Component {...props}/>) : (<Redirect to="/dashboard"/>)}/>
);

function mapStateToProps(state){
    return{
        isAuthenticated: !!state.loginEmailPassword.token
    }
}

export default connect(mapStateToProps)(UnAuthRoute);