import React from 'react';
import {connect} from 'react-redux';
import {sortBy} from '../../actions/fetching_subreddit';

import {Dropdown} from 'semantic-ui-react';

const SortOptions = ({sortBy, sort}) => {
    return(
        <Dropdown text={sort}>
            <Dropdown.Menu>
                <Dropdown.Item text="relevence" name="relevance" onClick={()=>sortBy('relevance')}>
                </Dropdown.Item>
                <Dropdown.Item text="hot" name="hot" onClick={()=>sortBy('hot')}>
                </Dropdown.Item>
                <Dropdown.Item text="top" name="top" onClick={()=>sortBy('top')}>
                </Dropdown.Item>
                <Dropdown.Item text="new" name="new" onClick={()=>sortBy('new')}>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function mapDispatchToProps(dispatch){
    return{
        sortBy: sort => dispatch(sortBy(sort))
    }
}

function mapStateToProps(state){
    return{
        sort: state.sortPosts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortOptions);