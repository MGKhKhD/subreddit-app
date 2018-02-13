import { RECEIVE_POSTS, SORT_SUBREDDIT_BY } from '../types';
import api from '../apiCalls';

export function receivePosts(subreddit, jsonData){
    return{
        type: RECEIVE_POSTS,
        payload: jsonData.data.children.map(child => child.data)
    };
}

export function sortBy(sort){
    return {
        type: SORT_SUBREDDIT_BY,
        payload: sort
    }
}


export const fetchSubreddit = (subreddit, sort) => dispatch => 
api.fetchFromInternet.fetchData(subreddit, sort)
.then(jsonData => dispatch(receivePosts(subreddit, jsonData)));

export const refreshPosts = (subreddit) => dispatch => 
api.fetchFromInternet.fetchData(subreddit)
.then(jsonData => dispatch(receivePosts(subreddit, jsonData)));