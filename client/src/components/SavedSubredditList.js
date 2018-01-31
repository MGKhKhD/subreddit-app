
import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { initializeSettingList } from '../actions/index';

import { Grid, Icon } from 'semantic-ui-react';


class SavedSubredditList extends Component{


    componentWillMount(){
        this.props.initializeSettingList();
    }

    componentWillReceiveProps(nextProps){
        nextProps.initializeSettingList();
    }


    render(){
        const { todos } = this.props;
        return(
            <Grid stackable columns={1} centered padded>
            {todos.map( todo => {
                if(todo.subreddit){
                    return ( <Grid.Column key={todo._id}  
                        style={{ margin: '0.5em', height: 30 }} >
                        <Grid columns={3} >
                        <Grid.Column>
                        {todo.subreddit}
                        </Grid.Column>
                        <Grid.Column>12</Grid.Column>
                        <Grid.Column><Icon name='remove circle' color='red' />
                        </Grid.Column>
                        </Grid>
                        </Grid.Column>);
                }
            })}
            </Grid>
        );
    }
}

function mapStateToProps(state){
    return {
        todos: state.todosFromBD
    }
}



export default connect(mapStateToProps, { initializeSettingList })(SavedSubredditList );