import React from 'react';
import {Link} from  'react-router-dom';
import {Menu, Dropdown} from 'semantic-ui-react';


const CustomeryNavbar = () => (
    <Menu color="blue">
        <Menu.Item as={Link} to="/" >HomePage</Menu.Item>
        <Menu.Item as={Link} to="/dashboard" >Dashboard</Menu.Item>
        <Menu.Item as={Link} to="/signup" >Signup</Menu.Item>           
        <Menu.Item as={Link} to="/setting" >Setting</Menu.Item>
    </Menu>
);

export default CustomeryNavbar;