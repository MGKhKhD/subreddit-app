import React, { Component } from 'react';
import { Button, Message, Grid, Segment, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchSubreddit } from '../actions/fetching_subreddit';


import DisplayPosts from '../components/posts/DisplayPosts';
import ChooseSubreddit from './ChooseSubreddit';

const DisplayOptions = () => (
                            <Grid columns={5} textAlign='center'>
                            <Grid.Column><Icon name='block layout' size='large'/></Grid.Column>
                            <Grid.Column><Icon name='grid layout' size='large'/></Grid.Column>
                            <Grid.Column><Icon name='list layout' size='large'/></Grid.Column>
                            <Grid.Column><Icon name='refresh' size='large'/></Grid.Column>
                            <Grid.Column><Icon name='search' size='large'/></Grid.Column>
                            </Grid>)
 

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
                                    <DisplayOptions />                        
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
        isConfirmed: state.authState.confirmed
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);