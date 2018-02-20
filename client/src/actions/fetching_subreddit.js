import { RECEIVE_POSTS, 
    SORT_SUBREDDIT_BY, 
    REQUEST_POSTS,
    FAILURE_POSTS,
    SUBREDDIT_FETCH_CANCELLATION,
    RECEIVE_SAMPLE_POST,
    SUBREDDIT_FETCH_CANCELLATION_SAVE_OR_DISMISS_TODO } from '../types';
import api from '../apiCalls';
import {createSyncAction} from './actionCreators';

export const requestPosts = createSyncAction(REQUEST_POSTS, 'subreddit');
export const failurePosts = createSyncAction(FAILURE_POSTS, 'subreddit');
export const receivePosts = createSyncAction(RECEIVE_POSTS, 'data');
export const sortBy = createSyncAction(SORT_SUBREDDIT_BY, 'sort');
export const abortFetchPosts = createSyncAction(SUBREDDIT_FETCH_CANCELLATION, 'subreddit', 'reason');

export const fetchCancellationOfSubredditInSaveOrDismissTodo = createSyncAction(SUBREDDIT_FETCH_CANCELLATION_SAVE_OR_DISMISS_TODO, 'subreddit')

export const fetchSubredditToDisplay = (subreddit, sort) => (dispatch, getState) => {
    const shouldAbort = getState().receivePosts.cancelled.status;
    const isRequested = getState().receivePosts.requested;
    if(!shouldAbort){
        dispatch(requestPosts(subreddit));
        return api.fetchFromInternet.fetchSubredditData(subreddit, sort, false)
        .then(jsonData => {
            let mappedData = jsonData.data.children.map(child => child.data);
            return dispatch(receivePosts(mappedData))
        })
        .catch(err => dispatch(failurePosts(subreddit)));
    }else if (shouldAbort && isRequested){
        return api.fetchFromInternet.fetchSubredditData(subreddit, sort, true)
        .catch(err => console.log(err));
    }    
};

export const refreshPosts = (subreddit) => dispatch => 
api.fetchFromInternet.fetchData(subreddit)
.then(jsonData => {
    let mappedData = jsonData.data.children.map(child => child.data);
    return dispatch(receivePosts(mappedData))
});

