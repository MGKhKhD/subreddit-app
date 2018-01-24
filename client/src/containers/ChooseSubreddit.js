import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { initializeSettingList } from '../actions/index';

import { Dropdown } from 'semantic-ui-react';


class ChooseSubreddit extends Component{
    handleChange(e){
        this.props.chosenSubreddit(e.target.value);
    }

    componentWillMount(){
        this.props.initializeList();
    }

    render(){
        return(
            <select onChange={this.handleChange.bind(this)} value={this.props.value}>
            {this.props.todos.map( todo => {
                if(todo.subreddit){
                    return ( <option key={todo._id} value={todo.subreddit}>{todo.subreddit}</option>);
                }
            })}
            </select>
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