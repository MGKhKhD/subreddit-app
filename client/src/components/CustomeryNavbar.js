import React from 'react';
import {Link} from  'react-router-dom';
import {Menu, Dropdown, Icon} from 'semantic-ui-react';


const CustomeryNavbar = () => (
    <Menu attached='top'>      
      <Menu.Item  as={Link} to='/dashboard'>
        Fetch Subreddits
      </Menu.Item>
      <Menu.Item  as={Link} to='/settings'>Settings
      </Menu.Item>
      <Menu.Item  as={Link} to='/notes'>
        Notes 
      </Menu.Item>
      <Menu.Item  as={Link} to='/bookmarks'>
        Bookmarks
      </Menu.Item>
      <Menu.Item  position="right">
        Logout
      </Menu.Item>
    </Menu>
);

export default CustomeryNavbar;