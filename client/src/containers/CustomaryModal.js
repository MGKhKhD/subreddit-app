import React, { Component } from 'react';
import { connect } from 'react-redux';
import {saveBookmark, deleteBookmark} from '../actions/bookmarks_actios';

import { Modal, Icon, Image } from 'semantic-ui-react';
import {Transition} from 'semantic-ui-react';


class CustomaryModal extends Component{
    constructor(props){
        super(props);
        this.state={visible: true};
    }

    handleClick(){
        const {visible, clicked} = this.state;
        const {post, subreddit }=this.props;
        const data = {
            title: post.title,
            body: post.selftext,
            meta:{
                subreddit: subreddit,
                url: post.url,
                num_comments: post.num_comments,
                author: post.author,
                score: post.score,
                createdAt: post.created
            },
        }

        this.setState({visible: !visible});
        return this.props.saveBookmark(data);
    }

    render(){
        const {post, color, subreddit }=this.props;
        const {visible} = this.state;
        const name = !visible ? 'bookmark' : 'bookmark outline';
        const imageUrl =  post.preview ? post.preview.images[0].source.url : 
        'https://i.redd.it/4qezgmi0x87z.png';
        return(
            <Modal trigger={<Icon name="expand"/>}>
                <Modal.Header style={{color: color}}>{post.title}</Modal.Header>
                <Modal.Content scrolling>
                <Image wrapped size='medium' src={imageUrl} />
                <Modal.Description> 
                <p>{post.selftext}</p>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Transition animation={'pulse'} duration={1000} visible={visible} >
                    <Icon name={name} size='big' 
                    onClick={ this.handleClick.bind(this)}/>
                </Transition>
                </Modal.Actions>
          </Modal>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        saveBookmark: data => dispatch(saveBookmark(data)),
        deleteBookmark: title => dispatch(deleteBookmark(title))
    };
}


export default connect(null, mapDispatchToProps)(CustomaryModal);