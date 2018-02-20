import { RECEIVE_POSTS, 
    REQUEST_POSTS,
    FAILURE_POSTS,
    SORT_SUBREDDIT_BY, 
    SUBREDDIT_FETCH_CANCELLATION } from '../types';

export function receivePosts(state={
    posts: [], 
    requested: false,
    cancelled: {status: false, reason: ''},
    failure: {status: false, count: 0},
    success: false}, 
    action={})
    {
    switch(action.type){
        case REQUEST_POSTS: 
            return {...state, requested: true};
        case FAILURE_POSTS:
            return {...state, requested: false,
                failure:
                {status: true, 
                count: state.failure.count++},
                success: false
            };
        case SUBREDDIT_FETCH_CANCELLATION:
            return {...state,
                requested: false,
                success: false,
                failure: {status: false, count: 0},
                cancelled: 
                {status: true, 
                    reason: action.reason}
                }
        case RECEIVE_POSTS:
            return {...state, 
                posts: action.data,
                requested: false,
                failure: {status: false, count: 0},
                cancelled: {status: false, reason: ''} ,
                success: true
            };
        default:
            return state;
    }
}

export function sortPosts(state='new', action){
    switch(action.type){
        case SORT_SUBREDDIT_BY:
            return action.sort;
        default:
            return state;
    }
}