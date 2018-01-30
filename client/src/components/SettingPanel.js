import React from 'react';
import TenativeTodoList from '../containers/TenativeTodoList';
import TodoForm from '../containers/TodoForm';
import TodoDetail from './setting_pages/TodoDetail';
import SavedSubredditList from '../components/SavedSubredditList';

import { Grid } from 'semantic-ui-react';

const SettingPanel = () =>(
        <Grid>
            <Grid.Column floated='left' width={5}>
                <TodoForm />
                <TenativeTodoList />
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
                <SavedSubredditList />
            </Grid.Column>
        </Grid>
);

export default SettingPanel;