import { RECEIVE_POSTS, SORT_SUBREDDIT_BY } from '../types';
import api from '../apiCalls';
import {createSyncAction} from './actionCreators';

export const receivePosts = createSyncAction(RECEIVE_POSTS, 'data');
export const sortBy = createSyncAction(SORT_SUBREDDIT_BY, 'sort');

export const fetchSubreddit = (subreddit, sort) => dispatch => 
api.fetchFromInternet.fetchData(subreddit, sort)
.then(jsonData => {
    let mappedData = jsonData.data.children.map(child => child.data);
    return dispatch(receivePosts(mappedData))
});

export const refreshPosts = (subreddit) => dispatch => 
api.fetchFromInternet.fetchData(subreddit)
.then(jsonData => {
    let mappedData = jsonData.data.children.map(child => child.data);
    return dispatch(receivePosts(mappedData))
});