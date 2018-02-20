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
export const receivePosts = createSyncAction(RECEIVE_POSTS, 'data', 'subreddit');
export const sortBy = createSyncAction(SORT_SUBREDDIT_BY, 'sort');
export const setAbortFetchPosts = createSyncAction(SUBREDDIT_FETCH_CANCELLATION, 'subreddit', 'reason');

export const fetchCancellationOfSubredditInSaveOrDismissTodo = createSyncAction(SUBREDDIT_FETCH_CANCELLATION_SAVE_OR_DISMISS_TODO, 'subreddit')

export const newRequestPosts = (subreddit, sort) => dispatch => {
    dispatch(requestPosts(subreddit));
    return api.fetchFromInternet.fetchSubredditData(subreddit, sort, false)
    .then(jsonData => {
        let mappedData = jsonData.data.children.map(child => child.data);
        dispatch(receivePosts(mappedData, subreddit))
    })
    .catch(err => dispatch(failurePosts(subreddit)));
}

export const abortFetchPosts = (subreddit, reason) => (dispatch, getState) => {
    dispatch(setAbortFetchPosts(subreddit, reason));
    const shouldAbort = getState().receivePosts.cancelled.status;
    const reason = getState().receivePosts.cancelled.reason;
    const sort = getState().sortPosts;
    if (shouldAbort && reason === 'leave_page'){
        return api.fetchFromInternet.fetchSubredditData(subreddit, sort, true)
        .catch(err => console.log('ff', err));
    }else if (shouldAbort && reason === 'click_subreddit'){
        return api.fetchFromInternet.fetchSubredditData(subreddit, sort, true)
        .catch(err => console.log('ff', err));
    }
}

export const fetchSubredditToDisplay = (subreddit, sort) => (dispatch) => {
    return dispatch(newRequestPosts(subreddit, sort));    
};

export const refreshPosts = (subreddit) => dispatch => 
api.fetchFromInternet.fetchData(subreddit)
.then(jsonData => {
    let mappedData = jsonData.data.children.map(child => child.data);
    return dispatch(receivePosts(mappedData))
});

