import React, { Component } from 'react';
import { Message, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchSubreddit } from '../actions/fetching_subreddit';


import DisplayPosts from '../components/posts/DisplayPosts';
import ChooseSubreddit from './ChooseSubreddit';
import PostsDisplayOptions from '../components/posts/PostsDisplayOptions';


 

class Dashboard extends Component{
    state = {posts: [], 
        loading: false, 
        errors: {},
    selectedSubreddit: '',
color: ''};

    setSubreddit = (subreddit, color) => {
        this.setState({loading: true, selectedSubreddit: subreddit, color: color});
        this.props.fetchSubreddit(subreddit)
        .then(response => {
            this.setState({posts: response.payload, loading: false});
        }).catch(err => {
            this.setState({errors: err});
        });
    }

    render(){
        const { posts, loading, errors, selectedSubreddit, showingModal, color } = this.state;
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
                        <Segment>
                            <Grid>
                                <Grid.Row>
                                    <PostsDisplayOptions 
                                    layout={this.props.displayScheme}
                                    subreddit={selectedSubreddit}/>                        
                                </Grid.Row>
                                <Grid.Row>
                                    <DisplayPosts color={color}
                                    posts={posts} subreddit={selectedSubreddit}/>
                                </Grid.Row>
                            </Grid>
                        </Segment>
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
        fetchSubreddit: subject => dispatch(fetchSubreddit(subject))
    };
}

function mapStateToProps(state){
    return {
        isConfirmed: state.authState.confirmed,
        displayScheme: state.displayScheme
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);