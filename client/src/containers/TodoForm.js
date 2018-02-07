import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfSubredditExist } from '../actions/index';

import { Button, Form, Message } from 'semantic-ui-react';

const MessageDisplay = ({ errors }) => {   
    if(errors.emptyInput){
        return (<Message negative>
            <Message.Header>
            {errors.emptyInput}
            </Message.Header>
        </Message>);
    }else if(errors.dublicated){
        return (<Message negative>
            <Message.Header>
            {errors.dublicated}
            </Message.Header>
        </Message>);
    }else if(errors.nonExisting){
        return (<Message negative>
            <Message.Header>
            {errors.nonExisting}
            </Message.Header>
        </Message>);
    }
}

class TodoForm extends Component{
    constructor(props){
        super(props);
        this.state={text: '', loading: false,
                    errors:{}
                };

        this.submit = this.submit.bind(this);
    }

    submit(e){
        e.preventDefault();
        const text = this.state.text.trim();
        this.setState({loading: true});
        const errors = this.validateInput(text);
        this.setState({errors});
        if (Object.keys(errors).length === 0){
            this.props.checkIfSubredditExist(text)
            .catch(err => {
                if(err){
                   this.setState({...this.state, errors:{...this.state.errors, nonExisting: 'The subreddit seems doe not exist.'}})
                }
            }); 
        }                    
        this.setState({text: '', loading: false});
    }


    validateInput(text){
        let errors = {};
        if(!text){
            errors.emptyInput = 'Invalid input';
        }
        if(!errors.emptyInput){ 
            this.props.todos.map(todo => {
                if(todo.subreddit === text){
                    errors.dublicated = 'Subreddit is already saved in your list.';
                }
            });
        }       
        return errors;
    }



    render(){
        const {  errors, loading } = this.state;
        return(
                <Form onSubmit={this.submit} loading={loading}>
                    {Object.keys(errors).length > 0 && <MessageDisplay errors={errors} />}
                    <Form.Field >
                        <Form.Input type="text" 
                        placeholder="Add New Subreddit" 
                        onChange={(e) => {
                            this.setState({text: e.target.value});
                        }}                       
                        value={this.state.text} width={10}/>
                        <Button type="submit" primary>Submit</Button>
                        <Button secondary>Undo dismisses</Button>
                    </Form.Field>
                </Form>
        )
    }
}

function mapStateToProps(state){
    return {
        todos: state.todosFromBD,
    };
}

function mapDispatchToProps(dispatch){
    return {
        checkIfSubredditExist: subject => dispatch(checkIfSubredditExist(subject))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);