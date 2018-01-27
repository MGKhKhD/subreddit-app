import React from 'react';
import {Link} from  'react-router-dom';
import {Menu, Dropdown, Icon} from 'semantic-ui-react';


const CustomeryNavbar = () => (
    <Menu attached='top' as={Link} to='/dashboard'>
      <Dropdown item icon='wrench' simple>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Icon name='dropdown' />
            <span className='text'>Setting</span>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/dashboard/setting/subreddits'>Subreddits</Dropdown.Item>
              <Dropdown.Item as={Link} to='/dashboard/setting/notes'>Notes</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item as={Link} to='/dashboard/bookmarks'>Bookmarks</Dropdown.Item>
          <Dropdown.Item as={Link} to='/dashboard/profile'>Edit Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Signout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item position='right'>
        Fetch Subreddits
      </Menu.Item>
    </Menu>
);

export default CustomeryNavbar;