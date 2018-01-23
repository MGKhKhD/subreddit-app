import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { addTodo } from '../actions/index.js';
import { checkIfSubredditExist } from '../actions/index.js';

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
                    errors:{}
                };

        this.submit = this.submit.bind(this);
    }

    submit(e){
        e.preventDefault();
        if(!this.state.text.trim()){
            return false;
        }        
        this.props.checkIfSubredditExist(this.state.text)
        .then(res => this.setState({mounted: true}))
        .catch(err => {
            this.setState({mounted: true})
            this.setState({errors: err});
        });        
        this.setState({text: '', errors: {}, loading: false});
    }



    render(){
        const { loading, errors, mounted } = this.state;
        return(
                <Form onSubmit={this.submit} loading={loading}>
                {mounted && <MessageDisplay errors={errors} />}
                    <Form.Field >
                        <Form.Input type="text" 
                        placeholder="Search for subreddit" 
                        onChange={(e) => {
                            this.setState({text: e.target.value});
                        }}                       
                        value={this.state.text} width={6}/>
                        <Button type="submit" primary>Add Todo</Button>
                    </Form.Field>
                </Form>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        checkIfSubredditExist: subject => dispatch(checkIfSubredditExist(subject))
        //submitForm: text => dispatch(addTodo(text))
    };
}


export default connect(null, mapDispatchToProps)(TodoForm);