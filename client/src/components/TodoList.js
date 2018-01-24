import React from 'react';
import { connect } from 'react-redux';
import { saveTodoDB } from '../actions/index.js';

import { Table, Icon, Radio } from 'semantic-ui-react';

const TodoItem = ({todo, onClick}) => (
    <Table.Row onClick={onClick} style={{color: todo.saved? "green": "red"}}>
        <Table.Cell>{todo.todo}</Table.Cell>
        <Table.Cell>{!todo.saved?  
        <Radio label='Save to Database' /> 
        : 
        <Icon color='green' name='checkmark' size='large' />}</Table.Cell>         
    </Table.Row>
);

const TodoList = (props) =>(
        <Table>
            <Table.Body>
                {props.todos.map(todo => (<TodoItem 
                key={todo.id} 
                todo={todo}
                onClick={() => props.onTodoClick(todo)}/>))}
            </Table.Body>
        </Table>
);

function mapStateToProps(state){
    return{
        todos: state.todos,
        updateSavedFlag: state.updateSavedFlag
    }
}

function mapDispatchToProps(dispatch){
    return {
        onTodoClick: todo => dispatch(saveTodoDB(todo))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);