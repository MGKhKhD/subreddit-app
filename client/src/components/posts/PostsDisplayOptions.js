import React, {
    Component
} from 'react';

import { connect } from 'react-redux';
import {displayPostsLayout } from '../../actions/display_actions';
import { refreshPosts } from '../../actions/fetching_subreddit';

import { Grid, Icon, Dropdown } from 'semantic-ui-react';

import SortOptions from './SortOptions';
import PostsPerPage from './PostsPerPage';


class PostsDisplayOptions extends Component {

    render() {
        return ( <Grid columns ='7' textAlign = 'center' >
                        <Grid.Column> <Icon name = 'block layout'
                        size = 'large'
                        onClick = { () => this.props.displayAction('block')
                        }
                        /></Grid.Column>
                        <Grid.Column > <Icon name = 'grid layout'
                        size = 'large'
                        onClick = { () => this.props.displayAction('grid')
                        }
                        /></Grid.Column>
                        <Grid.Column> <Icon name = 'list layout'
                        size = 'large'
                        onClick = { () => this.props.displayAction('list')
                        }
                        /></Grid.Column>
                        <Grid.Column> <Icon name = 'refresh'
                        size = 'large'
                        onClick = { () => this.props.refreshAction(this.props.subreddit)
                        }
                        /></Grid.Column>
                        <Grid.Column > <Icon name = 'search'
                        size = 'large'
                        /></Grid.Column>
                        <Grid.Column > 
                            <SortOptions /> 
                        </Grid.Column>
                        <Grid.Column > 
                            <PostsPerPage /> 
                        </Grid.Column>
            </Grid >);
        }
    }

function mapDispatchToProps(dispatch){
    return {
        displayAction: action => dispatch(displayPostsLayout(action)),
        refreshAction: subreddit => dispatch(refreshPosts(subreddit))
    };
}

 export default connect(null, mapDispatchToProps)(PostsDisplayOptions);