import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveTodoDB, initializeSettingList } from '../actions/index.js';
import TodosFromServer from '../components/setting_pages/TodosFromServer';

import { Table, Icon, Radio, Button } from 'semantic-ui-react';


const TodoItem = ({todo, onClick}) => (
    <Table.Row onClick={onClick} style={{color: todo.saved? "green": "red"}}>
        <Table.Cell>{todo.todo}</Table.Cell>
        <Table.Cell textAlign="right">{!todo.saved?  
        <Button icon='save' /> 
        : 
        <Icon color='green' name='checkmark' size='large' />}</Table.Cell>         
    </Table.Row>
);

class TenativeTodoList extends Component{
    constructor(props){
        super(props);
        this.state={listInitialized: false, loading: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
            this.setState({listInitialized: true, loading: true});
            this.props.initializeList();
    }

    render(){
        const {listInitialized, loading} = this.state;
        return(
            <div>
                <Table>
                    <Table.Body>
                        {this.props.todos.map(todo => (<TodoItem 
                        key={todo.id} 
                        todo={todo}
                        onClick={() => this.props.onTodoClick(todo)}/>))}
                    </Table.Body>
                </Table>
            {!listInitialized? 
            <Button fluid  loading={loading}
            onClick={this.handleClick}>
            Active Subreddits</Button> :
            <TodosFromServer todos={this.props.todosFromBD}/>
            }
        </div>
        );
    }
}

function mapStateToProps(state){
    return{
        todos: state.todos,
        todosFromBD: state.todosFromBD
    }
}

function mapDispatchToProps(dispatch){
    return {
        onTodoClick: todo => dispatch(saveTodoDB(todo)),
        initializeList: () => dispatch(initializeSettingList())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(TenativeTodoList);