import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchSubreddit } from '../actions/fetching_subreddit';


import { Card, Icon, Button } from 'semantic-ui-react';


class SubredditCardItem extends Component{
    constructor(props){
        super(props);
        this.state= {posts: []};
    }

    componentWillMount(){
        this.props.fetchSubreddit(this.props.todo.todo)
        .then(response => 
            this.setState({posts: response.payload}));
    }


    render(){
        const {todo, onSave, onDismiss } = this.props;
        const { posts } = this.state;
        const post = _.sample(posts);
        return(
            <Card >
            <Card.Content>
                <Card.Header style={{color: todo.saved? "green": "red"}}>
                  {todo.todo}
                </Card.Header>
                <Card.Meta>
                {!!post? post.domain: ''}
                </Card.Meta>
                <Card.Description>
                  {!!post? post.title: ''}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green' onClick={() => onSave()}>Save</Button>
                    <Button basic color='red' onClick={() => onDismiss()}>>Dismiss</Button>
                </div>
              </Card.Content>       
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchSubreddit: text => dispatch(fetchSubreddit(text))
    }
}

export default connect(null, mapDispatchToProps)(SubredditCardItem);