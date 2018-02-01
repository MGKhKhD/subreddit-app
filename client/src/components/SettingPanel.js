import React from 'react';
import TenativeTodoList from '../containers/TenativeTodoList';
import TodoForm from '../containers/TodoForm';
import TodoDetail from './setting_pages/TodoDetail';
import SettingSidebarSubredditList from '../components/SettingSidebarSubredditList';
import SettingSidebarCategories from '../components/SettingSidebarCategories';

import { Grid } from 'semantic-ui-react';

const SettingPanel = () =>(
        <Grid>
            <Grid.Column floated='left' width={10}>
                <TodoForm />
                <TenativeTodoList />
            </Grid.Column>
            <Grid.Column floated='right' width={3}>
                <SettingSidebarCategories />
                <SettingSidebarSubredditList />
            </Grid.Column>
        </Grid>
);

export default SettingPanel;