
import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { initializeSettingList, deleteTodoFromDB } from '../actions/index';

import { Grid, Icon } from 'semantic-ui-react';


class SettingSidebarSubredditList extends Component{


    componentWillMount(){
        this.props.initializeSettingList();
    }




    render(){
        const { todos } = this.props;
        return(
            <Grid stackable columns={1} centered padded>
            {todos.map( todo =>  <Grid.Column key={todo._id}  
                        style={{ margin: '0.5em', height: 30 }} >
                        <Grid columns={3} >
                        <Grid.Column>
                        {todo.subreddit}
                        </Grid.Column>
                        <Grid.Column>12</Grid.Column>
                        <Grid.Column>
                            <Icon name='remove circle' color='red' 
                            onClick={()=>{
                                this.props.deleteTodoFromDB(todo)
                                }}/>
                        </Grid.Column>
                        </Grid>
                        </Grid.Column>)}
            </Grid>
        );
    }
}

function mapStateToProps(state){
    return {
        todos: state.todosFromBD
    }
}

export default connect(mapStateToProps, 
    { initializeSettingList, deleteTodoFromDB })(SettingSidebarSubredditList);