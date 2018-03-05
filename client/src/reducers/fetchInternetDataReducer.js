import { combineReducers } from 'redux';

import { RECEIVE_POSTS, 
    REQUEST_POSTS,
    FAILURE_POSTS, 
    DUMP_RECIEVE_POSTS_FROM_STATE,
    SUBREDDIT_FETCH_CANCELLATION,
    ACTIVE_SUBREDDIT,
    SORT_SUBREDDIT_BY,
    DESTROY_ACTIVE_SUBREDDIT } from '../types';

import _ from 'lodash';

function statusOfPosts(state={
    subreddit: '',
    sort: 'new', 
    requested: false,
    cancelled: {status: false, reason: ''},
    failure: {status: false, count: 0},
    success: false}, 
    action)
    {
    switch(action.type){
        case REQUEST_POSTS: 
            return {
                requested: true,
                failure:
                        {
                        status: false, 
                        count: 0
                    },
                success: false,
                cancelled: {status: false, reason: ''},
                subreddit: action.subreddit,
                sort: action.sort
            };
        case FAILURE_POSTS:
            return {
                requested: false,
                failure:
                    {
                        status: true, 
                        count: state.failure.count++
                    },
                success: false,
                cancelled: {status: false, reason: ''},
                subreddit: action.subreddit,
                sort: action.sort
            };
        case SUBREDDIT_FETCH_CANCELLATION:
            return {
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
                        subreddit: action.subreddit,
                        sort: action.sort
                        }
        case RECEIVE_POSTS:
            return {
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
                subreddit: action.subreddit,
                sort: action.sort
            };
        default:
            return state;
    }
}

function postsMetaStatus(state={}, action){
    switch(action.type){
        case REQUEST_POSTS:
        case FAILURE_POSTS:
        case SUBREDDIT_FETCH_CANCELLATION:
        case RECEIVE_POSTS:
            return {...state,
            [`${action.subreddit}_${action.sort}`]: 
            statusOfPosts(state[`${action.subreddit}_${action.sort}`], action)
        };
    }
}

function subredditPosts(state={
    sort: 'new',
    posts: []
}, action){
    switch(action.type){
        case RECEIVE_POSTS: 
            return [...state, {sort: action.sort, posts: action.data}];
        default: return state;
    }
}

function receivePosts(state={}, action){
    switch(action.type){
        case REQUEST_POSTS:
        case FAILURE_POSTS:
        case SUBREDDIT_FETCH_CANCELLATION:
        case RECEIVE_POSTS:
            return {...state,
            [`${action.subreddit}_${action.sort}`]: 
            subredditPosts(state[`${action.subreddit}_${action.sort}`], action)
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

function activeSubreddit(state={subreddit: '', sort:'new'}, action){
    switch(action.type){
        case ACTIVE_SUBREDDIT:
            return {subreddit: action.subreddit, sort: action.sort};
        case DESTROY_ACTIVE_SUBREDDIT:{
            return null;
        }
        default:
            return state;    
    }
}

export const activeSort = (state) => {
    return state.activeSubreddit.sort;
}

export const activePosts = (state) => {
    let subreddit = state.activeSubreddit.subreddit;
    let sort = activeSort(state);
    if(state.receivePosts[`${subreddit}_${sort}`]){
                return state.receivePosts[`${subreddit}_${sort}`].posts;
            }else{
                return [];
            }
    }

    export const posts = combineReducers({
        activeSubreddit,
        receivePosts,
        postsMetaStatus
    });
    