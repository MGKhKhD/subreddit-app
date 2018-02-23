import { CONTENT_IS_UP_TO_DATE } from '../message_types';
import { createSyncAction } from './actionCreators';

export const addMessage = createSyncAction(CONTENT_IS_UP_TO_DATE);