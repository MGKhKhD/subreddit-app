import { DISPLAY_POSTS_LAYOUT, POSTS_PER_PAGE } from '../types';
import {createSyncAction} from './actionCreators';

export const displayPostsLayout = createSyncAction(DISPLAY_POSTS_LAYOUT, 'displayLayout');
export const postsPerPage = createSyncAction(POSTS_PER_PAGE, 'numberOfPosts');
