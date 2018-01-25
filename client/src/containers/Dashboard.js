import React, { Component } from 'react';
import { Button, Message} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchSubreddit } from '../actions/fetching_subreddit';


import DisplayPosts from '../components/posts/DisplayPosts';
import ChooseSubreddit from './ChooseSubreddit';


class Dashboard extends Component{
    state = {posts: [], 
        loading: false, 
        errors: {},
    selectedSubreddit: ''};

    setSubreddit = (subreddit) => {
        this.setState({loading: true, selectedSubreddit: subreddit});
        this.props.fetchSubreddit(subreddit)
        .then(response => {
            this.setState({posts: response.payload, loading: false});
        }).catch(err => {
            console.log(err);
            this.setState({errors: err});
        });
    }

    render(){
        const { posts, loading, errors, selectedSubreddit, showingModal } = this.state;
        return(
            <div>
                <ChooseSubreddit value={selectedSubreddit}
                chosenSubreddit={this.setSubreddit}>Fetch Data</ChooseSubreddit>
                {Object.keys(errors).length > 0 && 
                                <Message negative>
                                    <Message.Header>
                                        No Data To Fetch!
                                    </Message.Header>
                                </Message>}
                {(posts.length > 0) && <DisplayPosts
                posts={posts} subreddit={selectedSubreddit}/>}   
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