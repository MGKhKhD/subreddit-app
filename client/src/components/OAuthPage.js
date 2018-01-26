import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react'



class OAuthPage extends Component{
    render(){
        return(
            <div className="ui container" >
                <Button color='facebook'>
                    <Icon name='facebook' /> Facebook
                  </Button>
                  <Button color='twitter'>
                    <Icon name='twitter' /> Twitter
                  </Button>
                  <Button color='google plus'>
                    <Icon name='google plus' /> Google Plus
                  </Button>
                  <Button color='linkedin'>
                    <Icon name='linkedin' /> LinkedIn
                  </Button>
                  <Button color='instagram'>
                    <Icon name='instagram' /> Instagram
                  </Button>
            </div>
        );
    }
}

export default OAuthPage;