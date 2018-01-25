import React, { Component } from 'react';

import LoginForm from '../components/LoginForm';

import { Header, Segment, Button } from 'semantic-ui-react'



class OAuthPage extends Component{
    render(){
        return(
            <Segment >
                <Header as='h4' color='blue' textAlign='center'>
                Log-in with
                </Header>
                <Button color='facebook' icon='facebook' />
                <Button color='twitter' icon='twitter' />
                <Button color='linkedin' icon='linkedin' />
                <Button color='google plus' icon='google plus' />
            </Segment>
        );
    }
}

export default OAuthPage;