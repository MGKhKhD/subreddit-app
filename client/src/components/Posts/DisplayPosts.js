import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table } from 'semantic-ui-react';
import CustomaryModal from '../../containers/CustomaryModal';
import ListLayout from './ListLayout';
import GridLayout from './GridLayout';

class DisplayPosts extends Component{
    render(){
        const {color, posts, subreddit, layout} = this.props;
        if(layout === 'list'){
            return <ListLayout color={color}
            posts={posts} subreddit={subreddit}/>;
        }else if(layout === 'grid'){
            return <GridLayout color={color}
            posts={posts} subreddit={subreddit}/>;
        }else if(layout === 'block'){
            return <div>Block</div>;
        }
    }
}

function mapStateToProps(state){
    return{
        layout: state.displayScheme
    };
}

export default connect(mapStateToProps)(DisplayPosts);
  
