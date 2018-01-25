import React from 'react';
import {Route, Link} from  'react-router-dom';
import {Menu, Dropdown} from 'semantic-ui-react';

import SettingPanel from './components/SettingPanel';
import Dashboard from './containers/Dashboard';


const HomePage = () => (
    <div>
        HomePage
    </div>
);


const LoginPage = () => (
    <div>
        Login
    </div>
);



const RouterHub =() =>(
    <div className="ui container">
        <Menu>
            <Menu.Item as={Link} to="/" position="right">HomePage</Menu.Item>
            <Menu.Item as={Link} to="/dashboard" position="right">Dashboard</Menu.Item>
            <Menu.Item as={Link} to="/login" position="right">Login</Menu.Item>           
            <Menu.Item as={Link} to="/setting" position="right">Setting</Menu.Item>
        </Menu>
        <Route exact path="/" component={HomePage}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/login" component={LoginPage}/>       
        <Route path="/setting" component={SettingPanel}/>
    </div>
);

export default RouterHub;
