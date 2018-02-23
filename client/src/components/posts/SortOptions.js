import React from 'react';
import {connect} from 'react-redux';
import {sortBy} from '../../actions/fetching_subreddit';
import {getSort} from '../../reducers/rootReducer';

import {Dropdown} from 'semantic-ui-react';

const SortOptions = ({sortBy, sort, subreddit}) => {
    return(
        <Dropdown text={sort}>
            <Dropdown.Menu>
                <Dropdown.Item text="relevence" name="relevance" 
                onClick={()=>sortBy('relevance', subreddit)}>
                </Dropdown.Item>
                <Dropdown.Item text="hot" name="hot" onClick={()=>sortBy('hot', subreddit)}>
                </Dropdown.Item>
                <Dropdown.Item text="top" name="top" onClick={()=>sortBy('top', subreddit)}>
                </Dropdown.Item>
                <Dropdown.Item text="new" name="new" onClick={()=>sortBy('new', subreddit)}>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

function mapDispatchToProps(dispatch){
    return{
        sortBy: (sort, subreddit) => dispatch(sortBy(sort, subreddit))
    }
}

function mapStateToProps(state){
    return{
        sort: getSort(state),
        subreddit: state.activeSubreddit
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortOptions);