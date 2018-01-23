import React from 'react';
import TodoList from './TodoList';
import TodoForm from '../containers/TodoForm';
import TodoDetail from './TodoDetail';

import { Grid } from 'semantic-ui-react';

const SettingPanel = () =>(
        <Grid>
            <Grid.Column floated='left' width={5}>
                <TodoForm />
                <TodoList />
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
                <TodoDetail />
            </Grid.Column>
        </Grid>
);

export default SettingPanel;