import React, { Component } from 'react';

import { Button, Icon } from 'semantic-ui-react'



class OAuthPage extends Component{
    render(){
        return(
            <div className="ui container" >
                <Button color='facebook' name="facebook">
                    <Icon name='facebook' /> Log in with Facebook
                  </Button>
                  <Button color='twitter' name="twitter">
                    <Icon name='twitter' /> Log in with  Twitter
                  </Button>
                  <Button color='google plus' name="google">
                    <Icon name='google plus' /> Log in with  Google 
                  </Button>
            </div>
        );
    }
}

export default OAuthPage;