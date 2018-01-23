import React, { Component } from 'react';
import { Button, Message} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchSubreddit } from '../actions/fetching_subreddit';

import DisplayPosts from './DisplayPosts';

class Dashboard extends Component{
    state = {posts: [], 
        loading: false, 
        errors: {}};

    onClick = () => {
        this.setState({loading: true});
        this.props.fetchSubreddit('news')
        .then(response => {
            this.setState({posts: response.payload, loading: false});
        }).catch(err => {
            console.log(err);
            this.setState({errors: err});
        });
    }

    render(){
        const { posts, loading, errors } = this.state;
        return(
            <div>
                <Button primary onClick={this.onClick}>Fetch Data</Button>
                {Object.keys(errors).length > 0 && 
                                <Message negative>
                                    <Message.Header>
                                        No Data To Fetch!
                                    </Message.Header>
                                </Message>}
                {(posts.length > 0) && <DisplayPosts posts={posts}/>}
            </div>
        );
    }
} 

function mapDispatchToProps(dispatch){
    return {
        fetchSubreddit: subject => dispatch(fetchSubreddit(subject))
    };
}

export default connect(null, mapDispatchToProps)(Dashboard);