import React, { Component } from 'react';
import { Modal, Icon } from 'semantic-ui-react';


class CustomaryModal extends Component{
    render(){
        const {post, color }=this.props;
        return(
            <Modal trigger={<Icon name="expand"/>}>
                <Modal.Header style={{color: color}}>{post.title}</Modal.Header>
                <Modal.Content scrolling>
                <Modal.Description> 
                <p>{post.selftext}</p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                     <Icon name='bookmark outline' size='large' />
                </Modal.Actions>
          </Modal>
        );
    }
}


export default CustomaryModal;