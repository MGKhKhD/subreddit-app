import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfSubredditExist, initializeSettingList, addTodo } from '../actions/index';

import { Button, Form, Message } from 'semantic-ui-react';

const MessageDisplay = (props) => {
    if(Object.keys(props.errors).length > 0){ 
        return (<Message negative>
            <Message.Header>
                Invalid Subredit!
            </Message.Header>
        </Message>);
    }else if(Object.keys(props.errors).length === 0){
        return (<Message positive>
                <Message.Header>
                    Subreddit Added.
                </Message.Header>
        </Message>);
    }
    
}

class TodoForm extends Component{
    constructor(props){
        super(props);
        this.state={text: '', 
                    loading: false,
                    mounted: false,
                    dublicated: false,
                    errors:{}
                };

        this.submit = this.submit.bind(this);
    }

    submit(e){
        e.preventDefault();
        if(!this.state.text.trim()){
            return false;
        }
        let dublicated = false; 
        this.props.todos.map(todo => {
            if(todo.subreddit === this.state.text.trim()){
                dublicated = true;
                this.setState({dublicated, mounted: true});
                return false;
            }
        });       
        this.props.checkIfSubredditExist(this.state.text)
        .then(res => this.setState({mounted: true}))
        .catch(err => {
            this.setState({mounted: true})
            this.setState({errors: err});
        });        
        this.setState({text: '', errors: {}, loading: false});
    }

    componentWillMount(){
        this.props.initializeList();
    }



    render(){
        const { loading, errors, mounted, dublicated } = this.state;
        return(
                <Form onSubmit={this.submit} loading={loading}>
                    {mounted && !dublicated && <MessageDisplay errors={errors} />}
                    {mounted && dublicated && <MessageDisplay errors="Subreddit already saved" />}
                    <Form.Field >
                        <Form.Input type="text" 
                        placeholder="Add New Subreddit" 
                        onChange={(e) => {
                            this.setState({text: e.target.value});
                        }}                       
                        value={this.state.text} width={10}/>
                        <Button type="submit" primary>Submit</Button>
                    </Form.Field>
                </Form>
        )
    }
}

function mapStateToProps(state){
    return {
        todos: state.todosFromBD
    };
}

function mapDispatchToProps(dispatch){
    return {
        checkIfSubredditExist: subject => dispatch(checkIfSubredditExist(subject)),
        initializeList: () => dispatch(initializeSettingList()),
        addSubreddit: text => dispatch(addTodo(text))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);