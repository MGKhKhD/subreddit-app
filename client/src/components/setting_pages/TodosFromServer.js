import React, { Component } from 'react';

import { Table, Icon } from 'semantic-ui-react';


const TodoItemFromDB = ({todo}) => (
    <Table.Row >
        <Table.Cell>{todo}</Table.Cell>
        <Table.Cell>12</Table.Cell>
        <Table.Cell textAlign="right"><Icon name='remove circle' color='red'/></Table.Cell>       
    </Table.Row>
);

class TodosFromServer extends Component{
    render(){
        return(
            <div>
                <Table>
                    <Table.Body>
                        {this.props.todos.map(todo => {
                            if(todo.subreddit){
                                return (<TodoItemFromDB 
                                    key={todo._id} 
                                    todo={todo.subreddit}/>)
                            }else{
                                return null;
                            }
                        })}
                    </Table.Body>
                </Table>
        </div>
        );
    }
}

export default TodosFromServer;