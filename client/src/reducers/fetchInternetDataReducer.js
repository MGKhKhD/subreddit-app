import { RECEIVE_POSTS, 
    REQUEST_POSTS,
    FAILURE_POSTS, 
    DUMP_RECIEVE_POSTS_FROM_STATE,
    SUBREDDIT_FETCH_CANCELLATION,
    ACTIVE_SUBREDDIT,
    SORT_SUBREDDIT_BY,
    DESTROY_ACTIVE_SUBREDDIT } from '../types';

import _ from 'lodash';

export function posts(state={
    posts: [{
        sort: 'new',
        posts: []
    }], 
    requested: false,
    cancelled: {status: false, reason: ''},
    failure: {status: false, count: 0},
    success: false}, 
    action={})
    {
    switch(action.type){
        case REQUEST_POSTS: 
            return {...state,
                posts: [...state.posts, {...state, sort: action.sort}],
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
                posts: [...state.posts, {...state, sort: action.sort}],
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
                posts: [...state.posts, , {sort: action.sort, posts: action.data}], 
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
        case REQUEST_POSTS:
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


export const activeSort = (state) => {
    let subreddit = state.activeSubreddit;
    return receivePosts[subreddit]? receivePosts[subreddit].posts.sort : 'new';
}

export const activePosts = (state) => {
    let subreddit = state.activeSubreddit;
    let sort = activeSort(state);
    if(receivePosts[subreddit]){
        for (let key in receivePosts[subreddit].posts){
            if(sort === receivePosts[subreddit].posts[key].sort){
                return receivePosts[subreddit].posts[key].posts;
            }else{
                return [];
            }
        }
    }
}