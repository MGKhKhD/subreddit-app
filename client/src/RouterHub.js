import React from 'react';
import {Route, Link} from  'react-router-dom';
import {Menu, Dropdown} from 'semantic-ui-react';

import SettingPanel from './components/SettingPanel';
import Dashboard from './containers/Dashboard';

import HomePage from './containers/HomePage';
import SignupPageContainer from './containers/SignupPageContainer';



const RouterHub =({location}) =>(
    <div className="ui container">
        <Menu color="blue">
            <Menu.Item as={Link} to="/" >HomePage</Menu.Item>
            <Menu.Item as={Link} to="/dashboard" >Dashboard</Menu.Item>
            <Menu.Item as={Link} to="/signup" >Signup</Menu.Item>           
            <Menu.Item as={Link} to="/setting" >Setting</Menu.Item>
        </Menu>
        <Route location={location} exact path="/" component={HomePage}/>
        <Route location={location} path="/dashboard" component={Dashboard}/>
        <Route location={location}  path="/signup" component={SignupPageContainer}/>       
        <Route location={location} path="/setting" component={SettingPanel}/>
    </div>
);

export default RouterHub;
