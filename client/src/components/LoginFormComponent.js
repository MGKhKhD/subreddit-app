import React, { Component } from 'react';
import  isEmail  from 'validator/lib/isEmail';
import _ from 'lodash';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

class LoginFormComponent extends Component{
  constructor(props){
    super(props);
    this.state={credentials: {email:'', password:''},
                loading: false,
              errors: {}
            };
  }

  handleChange(e){
    this.setState({credentials: {...this.state.credentials, [e.target.name]:e.target.value}});
  }

  handleSubmit(){
    const errors = this.validateForm(this.state.credentials);
    this.setState({errors});
    if(_.isEmpty(errors)){
      this.setState({loading: true});
      this.props.submit(this.state.credentials)
      .catch(err => { 
        this.setState({loading: false});
        if(err.response){
        this.setState({errors: err.response.data.errors});
      }});
  }
}

  validateForm(data){
    const errors={};
    if(!data.password){
        errors.password = 'Enter password';
    }
    if(!isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    return errors;
}




  render(){
    const { loading, credentials, errors} = this.state;
    return(
          <Form size='large' onSubmit={this.handleSubmit.bind(this)} loading={loading}>
            {errors.global && <Message negative>
                  <Message.Header>Something Wrong</Message.Header>
                  <p>{errors.global}</p>
            </Message>}
            <Segment stacked>
              <Form.Input error={!!errors.email}
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                name="email"
                onChange={this.handleChange.bind(this)}
                value={credentials.email}
              />
              <Form.Input error={!!errors.password}
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                onChange={this.handleChange.bind(this)}
                value={credentials.password}
              />
              <Button type='submit' primary fluid size='large'>Login</Button>
            </Segment>
          </Form>
    );
  }
}

export default LoginFormComponent