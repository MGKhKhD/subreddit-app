import { RECEIVE_POSTS, 
    SORT_SUBREDDIT_BY, 
    REQUEST_POSTS,
    FAILURE_POSTS,
    SUBREDDIT_FETCH_CANCELLATION,
    RECEIVE_SAMPLE_POST,
    DUMP_RECIEVE_POSTS_FROM_STATE,
    ACTIVE_SUBREDDIT,
    DESTROY_ACTIVE_SUBREDDIT } from '../types';
import api from '../apiCalls';
import {createSyncAction} from './actionCreators';

export const requestPosts = createSyncAction(REQUEST_POSTS, 'subreddit');
export const failurePosts = createSyncAction(FAILURE_POSTS, 'subreddit');
export const receivePosts = createSyncAction(RECEIVE_POSTS, 'data', 'subreddit', 'receivedAt');
export const sortBy = createSyncAction(SORT_SUBREDDIT_BY, 'sort');
export const setAbortFetchPosts = createSyncAction(SUBREDDIT_FETCH_CANCELLATION, 'subreddit', 'reason');
export const dumpReceivePosts = createSyncAction(DUMP_RECIEVE_POSTS_FROM_STATE);
export const unsetActiveSubreddit = createSyncAction(DESTROY_ACTIVE_SUBREDDIT);
export const setActiveSubreddit = createSyncAction(ACTIVE_SUBREDDIT, 'subreddit')

export const watchActiveSubreddit = subreddit => (dispatch) => {
     dispatch(setActiveSubreddit(subreddit));
};

export const abortFetchPosts = (subreddit, reason) => (dispatch, getState) => {
    dispatch(setAbortFetchPosts(subreddit, reason));
    const shouldAbort = getState().receivePosts[subreddit].cancelled.status;
    const sort = getState().sortPosts;
    if (shouldAbort && reason === 'leave_page'){
        return api.fetchFromInternet.fetchSubredditData(subreddit, sort, true)
        .catch(err => {
            if (err.name === 'AbortError') {
              dispatch(dumpReceivePosts());
            }});
    }else if (shouldAbort && reason === 'click_subreddit'){
        return api.fetchFromInternet.fetchSubredditData(subreddit, sort, true)
        .catch(err => console.log('click_new_subreddit', err));
    }
}

export const fetchSubredditToDisplay = (subreddit, sort) => (dispatch) => {
    dispatch(requestPosts(subreddit));
    return api.fetchFromInternet.fetchSubredditData(subreddit, sort, false)
    .then(jsonData => {
        let mappedData = jsonData.data.children.map(child => child.data);
        dispatch(receivePosts(mappedData, subreddit, Date.now()));
        dispatch(watchActiveSubreddit(subreddit));
    })
    .catch(err => dispatch(failurePosts(subreddit)));    
};

export const refreshPosts = (subreddit) => (dispatch, getState) => {
    // Todo: automatically cheking if 10 min passes from the last update and inform user the possibility of refresh
    let activeSubreddit = getState().activeSubreddit;
    if(activeSubreddit && activeSubreddit === subreddit){
        let sort = getState().sortPosts;
        let lastUpdate = getState().receivePosts[subreddit].updatedAt;
        let timeSpan = Date.now() - lastUpdate;
        if(timeSpan > 10 * 60 * 1000){
            return api.fetchFromInternet.fetchSubredditData(subreddit, sort, false)
            .then(jsonData => {
                let mappedData = jsonData.data.children.map(child => child.data);
                dispatch(receivePosts(mappedData, subreddit, Date.now()))
            })
            .catch(err => dispatch(failurePosts(subreddit)));
        }else{
            console.log('no need to refresh');
        }
    }else{
        console.log('Refresh is denied');
    }     
}

