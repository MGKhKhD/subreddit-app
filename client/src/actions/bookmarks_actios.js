import {SAVE_BOOKMARK, DELETE_BOOKMARK, FETCH_BOOKMARKS} from '../types';
import api from '../apiCalls';

export const saveBookmark = data => dispatch =>
api.bookmarkAPI.saveBookmark(data);

export const deleteBookmark = title => dispatch =>
api.bookmarkAPI.deleteBookmark(title);

export function bookmarks(bookmarks){
    return{
        type: FETCH_BOOKMARKS,
        payload: bookmarks
    };
}

export const fetchBookmarks = () => dispatch =>
api.bookmarkAPI.fetchBookmarks().then(response => dispatch(bookmarks(response.data.bookmarks)))