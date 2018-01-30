import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveTodoDB, initializeSettingList, deleteTodoFromList } from '../actions/index.js';
import TodosFromServer from '../components/setting_pages/TodosFromServer';
import SubredditCardItem from './SubredditCardItem';

import { Card, Icon, Button } from 'semantic-ui-react';


class TenativeTodoList extends Component{

    render(){
        return(
            <div>
                <Card.Group >
                        {this.props.todos.map(todo => (<SubredditCardItem 
                        key={todo.todo} 
                        todo={todo}
                        onSave={() => this.props.onSaveClick(todo)}
                        onDismiss={() => this.props.onDismissClick(todo.todo)}/>))}
                </Card.Group>
        </div>
        );
    }
}

function mapStateToProps(state){
    return{
        todos: state.todos
    };
}

function mapDispatchToProps(dispatch){
    return {
        onSaveClick: todo => dispatch(saveTodoDB(todo)),
        onDismissClick: text => dispatch(deleteTodoFromList(text))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(TenativeTodoList);