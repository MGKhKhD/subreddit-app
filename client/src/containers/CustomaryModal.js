import React, { Component } from 'react';
import { Modal, Icon, Button, Header, Image } from 'semantic-ui-react';


class CustomaryModal extends Component{
    render(){
        const {post, subreddit}=this.props;
        return(
            <Modal trigger={<Icon name="window maximize"/>}>
                <Modal.Header>{post.title}</Modal.Header>
                <Modal.Content scrolling>
                <Modal.Description> 
                <p>{post.selftext}</p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                     <Icon name='bookmark' />
                </Modal.Actions>
          </Modal>
        );
    }
}


export default CustomaryModal;