import React from 'react';
import {  Link } from  'react-router-dom';
import { connect } from 'react-redux';
import LogoutButton from './LogoutButton';

import { Grid, Button, Divider, Segment } from 'semantic-ui-react';
import OAuthPage from '../components/OAuthPage';


const HomePage = ({ isAuthenticated, history }) => (
    <div className="ui container ">
      {!isAuthenticated? (<Segment padded>
                            <Button primary fluid as={Link} to='/login'>Login</Button>
                            <Divider horizontal>Or</Divider>
                            <Button secondary fluid as={Link} to='/signup'>Sign Up Now</Button>
                            <Divider horizontal>Or Signup with</Divider>
                            <OAuthPage />
                          </Segment>) 
                          :
                        (<Segment padded><LogoutButton history={history}/></Segment>)}
  </div>
);

function mapStateToProps(state){
  return{
    isAuthenticated: !! state.loginEmailPassword.token
  }
}

export default connect(mapStateToProps)(HomePage);