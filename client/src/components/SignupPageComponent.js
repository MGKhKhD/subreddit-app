import React, { Component } from 'react';
import  isEmail  from 'validator/lib/isEmail';
import _ from 'lodash';

import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';



class SignupPageComponent extends Component{
  constructor(props){
    super(props);
    this.state={credentials: {
                email:'',
                password:'',
                dPassword: ''
              },
            errors: {},
            loading: false};

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({credentials: {...this.state.credentials, [e.target.name]: e.target.value}});
  }

  handleSubmit(){
    const errors = this.validateForm(this.state.credentials);
    this.setState({errors});
    if(_.isEmpty(errors)){
      this.setState({loading: true});
      this.props.submit(this.state.credentials).catch(err =>{
        this.setState({loading: false, errors: err.response.data.errors});
      });
    }
  }

  validateForm(data){
    const errors={};
    if(!data.password){
        errors.password = 'Enter password';
    }
    if(!data.dPassword){
      errors.dPassword = 'Confirm password';
    }
    if (data.password && data.dPassword){
      if(data.dPassword !== data.password){
        errors.unmatchedPassword = 'Unmached password';
      }
    }
    if(!isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    return errors;
}



    render(){
      const {credentials, errors, loading} = this.state;
        return(
            <div className='login-form'>
            <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
                height: 100%;
            }
            `}</style>
            <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
            >
            <Grid.Column style={{ maxWidth: 450 }}>
              {errors.email && <Message negative>
                <Message.Header>Something Wrong</Message.Header>
                <p>{errors.email}</p>
              </Message>}
                <Form size='large' onSubmit={this.handleSubmit} loading={loading}>
                  <Segment >
                    <Form.Input error={!!errors.email}
                      fluid
                      icon='user'
                      iconPosition='left'
                      placeholder='E-mail address (example@example.com)'
                      name="email"
                      onChange={this.handleChange}
                      value={credentials.email}
                    />
                    <Form.Input error={!!errors.password || !!errors.unmatchedPassword}
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      name="password"
                      onChange={this.handleChange}
                      value={credentials.password}
                    />
                    <Form.Input error={!!errors.dPassword || !!errors.unmatchedPassword}
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Confirm Password'
                      type='password'
                      name="dPassword"
                      onChange={this.handleChange.bind(this)}
                      value={credentials.dPassword}
                    />
                    {errors.unmatchedPassword && <Message negative>
                    <Message.Header >Password must match</Message.Header >
                    </Message >}
                  </Segment>
                  <Button type="submit" color='blue' fluid size='large'>Sign me up</Button>
                </Form>
          </Grid.Column>
        </Grid>
        </div>
        );
    }
} 


export default SignupPageComponent;