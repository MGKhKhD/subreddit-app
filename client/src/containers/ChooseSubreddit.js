import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { initializeSettingList } from '../actions/index';
import {sortBy} from '../actions/fetching_subreddit';
import getRandomInt from '../utils/randomIntegerGenerator';

import { Grid } from 'semantic-ui-react';

const colors = [
    'red', 'orange', 'olive', 'green', 'teal', 'blue',
    'violet', 'purple', 'pink', 'brown', 'grey', 'black',
  ];




class ChooseSubreddit extends Component{
    handleClick(e){
        this.props.chosenSubreddit(e.target.value);
    }

    componentWillMount(){
        this.props.initializeList();
    }

    render(){
        return(
            <Grid stackable columns={1} centered padded>
            {this.props.todos.map( todo => {
                const indColor = getRandomInt(colors.length - 1);
                if(todo.subreddit){
                    return ( <Grid.Column key={todo._id}  color={colors[indColor]} 
                        style={{ margin: '0.5em', height: 50 }}
                        onClick={()=>{
                            this.props.chosenSubreddit(todo.subreddit, colors[indColor]);
                            this.props.sortBy('new', todo.subreddit);
                        }} 
                        value={this.props.value}>{todo.subreddit}
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

function mapDispatchToProps(dispatch){
    return {
        initializeList: () => dispatch(initializeSettingList()),
        sortBy: (sort, subreddit) => dispatch(sortBy(sort, subreddit))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(ChooseSubreddit);