import React from 'react';
import {Link} from  'react-router-dom';
import {Menu} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {logout} from '../actions/authentication';

const CustomeryNavbar = (props) => (
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
      <Menu.Item  position="right" onClick={() => props.logout()}>
        Logout
      </Menu.Item>
    </Menu>
);

export default connect(null, { logout })(CustomeryNavbar);