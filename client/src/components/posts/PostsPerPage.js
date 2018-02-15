import React from 'react';
import {connect} from 'react-redux';
import {Dropdown} from 'semantic-ui-react';
import {postsPerPage} from '../../actions/display_actions';

const PostsPerPage = ({postsPerPage, numPostsPerPage}) => {
    const options = [5, 10, 20, 50, 100];
    return(
        <Dropdown text={`#posts ${numPostsPerPage}`}>
            <Dropdown.Menu>
                {options.map(option => <Dropdown.Item key ={option} text={option} 
                onClick={() => postsPerPage(option)}>
                </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}


export default connect(state => ({numPostsPerPage: state.displayScheme.numPostsPerPage})
                , { postsPerPage })(PostsPerPage);