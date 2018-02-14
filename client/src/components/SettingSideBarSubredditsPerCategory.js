import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodoFromDB } from '../actions/index';

import { Grid, Icon, Menu } from 'semantic-ui-react';

const SettingSideBarSubredditsPerCategory = ({todos, deleteTodoFromDB}) => {
    return(<Menu.Menu>
            {todos.map( todo =>   <Menu.Item key={todo.subreddit} >
                {todo.subreddit}
                    <Icon name='remove circle' color='red' 
                    onClick={()=>{
                        deleteTodoFromDB(todo._id)
                        }}/>
                </Menu.Item>)}
                </Menu.Menu>
    );
}

export default connect(null, 
    { deleteTodoFromDB })(SettingSideBarSubredditsPerCategory);
