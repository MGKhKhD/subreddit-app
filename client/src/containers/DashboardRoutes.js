import React from 'react';
import {Route, Link} from  'react-router-dom';
import AuthRoute from './AuthRote';

import {Menu} from 'semantic-ui-react';
import AuthRote from './AuthRote';
import SettingPanel from '../components/SettingPanel';
import Dashboard from './Dashboard';
import LogoutButton from './LogoutButton';

const BookmarksPage = () =>(<div>Bookmarks</div>);
const Notes = () =>(<div>Notes</div>);

const DashboardRoutes = ({ match, location, history }) =>(
    <div>
        <Menu>
            <Menu.Item as={Link} to={`${match.url}/settings`}>Settings</Menu.Item>
            <Menu.Item as={Link} to={`${match.url}/bookmarks`}>Bookmarks</Menu.Item>
            <Menu.Item as={Link} to={`${match.url}/notes`}>Notes</Menu.Item>
            <Menu.Item as={Link} to={`${match.url}/signout`}><LogoutButton history={history} /></Menu.Item>
        </Menu>
        <AuthRote location={location}  path={`${match.url}/settings`} component={SettingPanel}/>
        <AuthRote location={location}  path={`${match.url}/bookmarks`} component={BookmarksPage}/>
        <AuthRote location={location}  path={`${match.url}/notes`} component={Notes}/>
        <AuthRote location={location}  path={match.url} exact component={Dashboard} />
    </div>

);

export default DashboardRoutes;