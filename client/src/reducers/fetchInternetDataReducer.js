import { RECEIVE_POSTS, 
    REQUEST_POSTS,
    FAILURE_POSTS,
    SORT_SUBREDDIT_BY, 
    DUMP_RECIEVE_POSTS_FROM_STATE,
    SUBREDDIT_FETCH_CANCELLATION,
    ACTIVE_SUBREDDIT,
    DESTROY_ACTIVE_SUBREDDIT } from '../types';

import _ from 'lodash';

export function posts(state={
    posts: [], 
    requested: false,
    cancelled: {status: false, reason: ''},
    failure: {status: false, count: 0},
    success: false}, 
    action={})
    {
    switch(action.type){
        case REQUEST_POSTS: 
            return {...state,
                requested: true,
                failure:
                        {
                        status: false, 
                        count: 0
                    },
                success: false,
                cancelled: {status: false, reason: ''},
                subreddit: action.subreddit
            };
        case FAILURE_POSTS:
            return {...state,
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
            return {...state,
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
            return {...state,
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
                updatedAt: action.receivedAt,
                subreddit: action.subreddit
            };
        default:
            return state;
    }
}

export function receivePosts(state={}, action){
    switch(action.type){
        case RECEIVE_POSTS:
        case FAILURE_POSTS:
        case SUBREDDIT_FETCH_CANCELLATION:
        case RECEIVE_POSTS:
            return {...state,
            [action.subreddit]: posts(state[action.subreddit], action)
        };
        case DUMP_RECIEVE_POSTS_FROM_STATE:
            {
                _.forEach(state, obj => {
                    for (let member in obj) delete obj[member];
                });
                for (let key in state) delete state[key];
                return state;
            }            
        default: return state;
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

export function activeSubreddit(state={}, action){
    switch(action.type){
        case ACTIVE_SUBREDDIT:
            return action.subreddit;
        case DESTROY_ACTIVE_SUBREDDIT:{
            return null;
        }
        default:
            return state;    
    }
}