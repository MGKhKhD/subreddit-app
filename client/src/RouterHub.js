import React from 'react';
import {Route} from  'react-router-dom';
import { connect } from 'react-redux';

import SettingPanel from './components/SettingPanel';
import Dashboard from './containers/Dashboard';

import HomePage from './containers/HomePage';
import SignupPage from './containers/SignupPage';
import LoginPage from './containers/LoginPage'
import CustomeryNavbar from './components/CustomeryNavbar';
import UnAuthRoute from './containers/UnAuthRoute';
import AuthRoute from './containers/AuthRote';



const RouterHub =({ location, isAuthenticated}) =>(
    <div className="ui container">
        {isAuthenticated && <CustomeryNavbar />}
        <Route location={location} exact path="/" component={HomePage}/>
        <UnAuthRoute location={location} path="/login" component={LoginPage}/>  
        <UnAuthRoute location={location} path="/signup" component={SignupPage}/>  
        <AuthRoute location={location} path="/dashboard" component={Dashboard}/>             
        <AuthRoute location={location} path="/setting" component={SettingPanel}/>
    </div>
);

function mapStateToProps(state){
    return{
      isAuthenticated: !! state.loginEmailPassword.token
    }
  }

export default connect(mapStateToProps)(RouterHub);
