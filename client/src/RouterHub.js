import React from 'react';
import {Route, Link} from  'react-router-dom';
import {Menu} from 'semantic-ui-react';

import SettingPanel from './components/SettingPanel';
import Dashboard from './components/Dashboard';


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
            <Link to="/" className="ui menue-item">HomePage</Link>
            <Link to="/login" className="ui menue-item">Login</Link>
            <Link to="/dashboard" className="ui menue-item">Dashboard</Link>
            <Link to="/setting" className="ui menue-item">Setting</Link>
        </Menu>
        <Route exact path="/" component={HomePage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/setting" component={SettingPanel}/>
    </div>
);

export default RouterHub;
