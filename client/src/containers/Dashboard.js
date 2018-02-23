import React, { Component } from 'react';
import _ from 'lodash';

import { Message, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchSubredditToDisplay, 
        abortFetchPosts,
        unsetActiveSubreddit } from '../actions/fetching_subreddit';
import {getSort, getPosts} from '../reducers/rootReducer';


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

    reSetSubreddit = (subreddit, newSort, oldSort) => {
        if(subreddit){
            if(this.props.receivePosts[subreddit].requested
            ){
                this.props.abortFetchPosts(subreddit, oldSort,'click_subreddit_sort');
            }
        }

        this.setState({loading: true});
        this.props.fetchSubreddit(subreddit, newSort);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.sort !== this.props.sort){
            this.reSetSubreddit(this.state.selectedSubreddit, nextProps.sort, this.props.sort);
        }
    }

    componentWillUnmount(){
        if(this.state.selectedSubreddit && 
            this.props.posts &&
            this.props.receivePosts[this.state.selectedSubreddit].requested){
            this.props.abortFetchPosts(this.state.selectedSubreddit, this.props.sort, 'leave_page');
        }
        this.props.unsetActiveSubreddit();
    }
 
    setSubreddit = (subreddit, color) => {
        const { selectedSubreddit } = this.state;
        if(selectedSubreddit){
            if(subreddit !== this.props.receivePosts[selectedSubreddit].subreddit && 
                this.props.posts &&
                this.props.receivePosts[this.state.selectedSubreddit].requested
            ){
                this.props.abortFetchPosts(selectedSubreddit, this.props.sort, 'click_subreddit');
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
        const { posts } = this.props;
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
                        {(!!posts) && 
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
        sort: getSort(state),
        posts: getPosts(state),
        receivePosts: state.receivePosts,
        activeSubreddit: state.activeSubreddit
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);