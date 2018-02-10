import {SAVE_BOOKMARK, DELETE_BOOKMARK, FETCH_BOOKMARKS} from '../types';
import api from '../apiCalls';
import {createSyncAction} from './actionCreators';

const bookmarks = createSyncAction(FETCH_BOOKMARKS, 'bookmarks');

export const saveBookmark = data => dispatch =>
api.bookmarkAPI.saveBookmark(data);

export const deleteBookmark = title => dispatch =>
api.bookmarkAPI.deleteBookmark(title);

export const fetchBookmarks = () => dispatch =>
api.bookmarkAPI.fetchBookmarks().then(response => dispatch(bookmarks(response.data.bookmarks)))