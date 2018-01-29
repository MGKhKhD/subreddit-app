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
import ConfimationPage from './containers/ConfirmationPage';

const BookmarksPage = () =>(<div>Bookmarks</div>);
const SettingNotes = () =>(<div>Notes</div>);

const RouterHub =({ location, isAuthenticated}) =>(
    <div className="ui container">
        {isAuthenticated && <CustomeryNavbar />}
        <Route location={location} exact path="/" component={HomePage}/>
        <Route location={location}  path="/confirmation/:token" component={ConfimationPage}/>
        <UnAuthRoute location={location} exact path="/login" component={LoginPage}/>  
        <UnAuthRoute location={location} exact path="/signup" component={SignupPage}/>  
        <AuthRoute location={location} exact path="/dashboard" component={Dashboard}/>  
        <AuthRoute location={location} exact path="/settings" component={SettingPanel}/> 
        <AuthRoute location={location} exact path="/notes" component={SettingNotes}/> 
        <AuthRoute location={location} exact path="/bookmarks" component={BookmarksPage}/>          
    </div>
);

function mapStateToProps(state){
    return{
      isAuthenticated: !! state.authState.token
    }
  }

export default connect(mapStateToProps)(RouterHub);
