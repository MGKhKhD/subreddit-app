import { RECEIVE_POSTS } from '../types';
import api from '../apiCalls';

export function receivePosts(subreddit, jsonData){
    return{
        type: RECEIVE_POSTS,
        payload: jsonData.data.children.map(child => child.data)
    };
}


export const fetchSubreddit = (subreddit) => dispatch => 
api.fetchFromInternet.fetchData(subreddit)
.then(jsonData => dispatch(receivePosts(subreddit, jsonData)));