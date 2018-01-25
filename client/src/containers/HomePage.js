import React from 'react';
import {  withRouter } from  'react-router-dom';

import LoginForm from '../components/LoginForm';
import OAuthForm from '../components/OAuthPage';

import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react'


const SignupButton = withRouter(({history}) => (
    <Button secondary 
        onClick={()=>history.push('/singup')}>
        Sign Up
    </Button>
));

const HomePage = () => (
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
        <Header as='h2' color='blue' textAlign='center'>
          <Icon name="sign in" />
          {' '}Log-in to your account
        </Header>
            <LoginForm />
        <Message>
          New user? <SignupButton />
        </Message>
            <OAuthForm />
      </Grid.Column>
    </Grid>
  </div>
);

export default HomePage;