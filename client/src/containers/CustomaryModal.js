import React, { Component } from 'react';
import { Modal, Icon } from 'semantic-ui-react';

import {Transition} from 'semantic-ui-react';


class CustomaryModal extends Component{
constructor(props){
    super(props);
    this.state={visible: true, clicked: false};
}

    render(){
        const {post, color }=this.props;
        const {visible, clicked} = this.state;
        const name = clicked ? 'bookmark' : 'bookmark outline';
        return(
            <Modal trigger={<Icon name="expand"/>}>
                <Modal.Header style={{color: color}}>{post.title}</Modal.Header>
                <Modal.Content scrolling>
                <Modal.Description> 
                <p>{post.selftext}</p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Transition animation={'pulse'} duration={1000} visible={visible} >
                    <Icon name={name} size='big' 
                    onClick={()=>this.setState({visible: !visible, clicked: !clicked})}/>
                </Transition>
                </Modal.Actions>
          </Modal>
        );
    }
}


export default CustomaryModal;