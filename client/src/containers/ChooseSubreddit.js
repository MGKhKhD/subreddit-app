import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { initializeSettingList } from '../actions/index';

import { Grid } from 'semantic-ui-react';

const colors = [
    'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue',
    'violet', 'purple', 'pink', 'brown', 'grey', 'black',
  ];

function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}


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
                        onClick={()=>this.props.chosenSubreddit(todo.subreddit, colors[indColor])} 
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
        initializeList: () => dispatch(initializeSettingList())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ChooseSubreddit);