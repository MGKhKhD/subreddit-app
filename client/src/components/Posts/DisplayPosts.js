import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table } from 'semantic-ui-react';
import CustomaryModal from '../../containers/CustomaryModal';
import ListLayout from './ListLayout';
import GridLayout from './GridLayout';
import BlockLayout from './BlockLayout';

class DisplayPosts extends Component{
    render(){
        const {posts, subreddit, layout, numPostsPerPage} = this.props;
        if(layout === 'list'){
            return <ListLayout 
            posts={posts} subreddit={subreddit}/>;
        }else if(layout === 'grid'){
            return <GridLayout 
            posts={posts} subreddit={subreddit}/>;
        }else if(layout === 'block'){
            return <BlockLayout 
            posts={posts} subreddit={subreddit}/>;
        }
    }
}

function mapStateToProps(state){
    return{
        layout: state.displayScheme.display,
        numPostsPerPage: state.displayScheme.numPostsPerPage
    };
}

export default connect(mapStateToProps)(DisplayPosts);
  
