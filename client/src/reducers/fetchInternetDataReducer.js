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
            return {posts:[],
                requested: true,
                failure:
                        {
                        status: false, 
                        count: 0
                    },
                success: false,
                cancelled: {status: false, reason: ''},
                subreddit: action.subreddit};
        case FAILURE_POSTS:
            return {posts:[],
                requested: false,
                failure:
                    {
                        status: true, 
                        count: state.failure.count++
                    },
                success: false,
                cancelled: {status: false, reason: ''},
                subreddit: action.subreddit
            };
        case SUBREDDIT_FETCH_CANCELLATION:
            return {posts:[],
                requested: false,
                success: false,
                failure: 
                        {
                            status: false, 
                            count: 0
                        },
                cancelled: 
                        {
                            status: true, 
                            reason: action.reason
                        },
                subreddit: action.subreddit
                        }
        case RECEIVE_POSTS:
            return {
                posts: action.data,
                requested: false,
                failure: 
                    {
                        status: false, 
                        count: 0
                    },
                cancelled: 
                    {
                        status: false, 
                        reason: ''
                    } ,
                success: true,
                subreddit: action.subreddit
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