import React, { Component } from 'react';
import _ from 'lodash';

import { Message, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchSubredditToDisplay, 
        abortFetchPosts,
        unsetActiveSubreddit } from '../actions/fetching_subreddit';


import DisplayPosts from '../components/posts/DisplayPosts';
import ChooseSubreddit from './ChooseSubreddit';
import PostsDisplayOptions from '../components/posts/PostsDisplayOptions';
import PostsPagination from '../components/posts/PostsPagination';

 

class Dashboard extends Component{
    state = { 
        postsToDisplay: [],
        loading: false, 
        errors: {},
        selectedSubreddit: ''
    };


    componentWillReceiveProps(nextProps){
        if(nextProps.sort !== this.props.sort){
            this.setSubreddit(this.state.selectedSubreddit, nextProps.sort);
        }
    }

    componentWillUnmount(){
        if(this.state.selectedSubreddit && this.props.receivePosts[this.state.selectedSubreddit].posts){
            this.props.abortFetchPosts(this.state.selectedSubreddit, 'leave_page');
        }
        this.props.unsetActiveSubreddit();
    }
 
    setSubreddit = (subreddit, color) => {
        const { selectedSubreddit } = this.state;
        if(selectedSubreddit){
            if(subreddit !== this.props.receivePosts[selectedSubreddit].subreddit && this.props.receivePosts[selectedSubreddit].posts){
                this.props.abortFetchPosts(selectedSubreddit, 'click_subreddit');
            }
        }

        this.setState({loading: true, selectedSubreddit: subreddit, color: color});
        const { receivePosts } = this.props;
        if(receivePosts[subreddit]){
            let lastUpdate = receivePosts[subreddit].updatedAt;
            let timeSpan = Date.now() - lastUpdate;
            if(timeSpan > 10 * 60 * 1000 ){
                this.props.fetchSubreddit(subreddit, this.props.sort);
            }
        }else{
            this.props.fetchSubreddit(subreddit, this.props.sort);
        }
    }

    render(){
        const { loading, errors, selectedSubreddit, showingModal, color } = this.state;
        const { receivePosts } = this.props;
        let posts = [];
        if(selectedSubreddit){
            posts = receivePosts[selectedSubreddit].posts;
        }
        if(this.props.isConfirmed){
            return(
                <div className='ui container'> 
                    <Grid columns={2} stackable> 
                        <Grid.Column width={2}>              
                            <ChooseSubreddit value={selectedSubreddit}
                            chosenSubreddit={this.setSubreddit}>Fetch Data</ChooseSubreddit>
                            {Object.keys(errors).length > 0 && 
                                            <Message negative>
                                                <Message.Header>
                                                    No Data To Fetch!
                                                </Message.Header>
                                            </Message>}
                        </Grid.Column>
                        <Grid.Column width={14}>
                        {(posts.length > 0) && 
                            <Grid>
                                <Grid.Row>
                                    <PostsDisplayOptions 
                                    layout={this.props.displayScheme}
                                    subreddit={selectedSubreddit}/>                        
                                </Grid.Row>
                                <Grid.Row>
                                    <DisplayPosts
                                    posts={this.state.postsToDisplay} subreddit={selectedSubreddit}/>
                                </Grid.Row>
                                {!!posts && 
                                    <Grid.Row>
                                    <PostsPagination posts={posts} 
                                    displayPosts={(posts) => this.setState({postsToDisplay: posts})}/>
                                </Grid.Row>
                                }
                            </Grid>
                        } 
                        </Grid.Column>  
                    </Grid>
                </div>
            );
        }else{
            return(
                <Message negative>
                    <Message.Header>
                        Please confirm your email.
                    </Message.Header>
                </Message>
            );
        }
    }
} 

function mapDispatchToProps(dispatch){
    return {
        fetchSubreddit: (subject, sort) => dispatch(fetchSubredditToDisplay(subject, sort)),
        abortFetchPosts: (subreddit, reason) => dispatch(abortFetchPosts(subreddit, reason)),
        unsetActiveSubreddit: () => dispatch(unsetActiveSubreddit())
    };
}

function mapStateToProps(state){
    return {
        isConfirmed: state.authState.confirmed,
        displayScheme: state.displayScheme,
        sort: state.sortPosts,
        receivePosts: state.receivePosts,
        activeSubreddit: state.activeSubreddit
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);