import { Record as ImmutableRecord } from 'immutable';

import { loadingBarReducer } from 'react-redux-loading-bar';
import { combineReducers } from 'redux-immutable';

import { accountsReducer } from './accounts';
import accounts_map from './accounts_map';
import alerts from './alerts';
import announcements from './announcements';
import blocks from './blocks';
import boosts from './boosts';
import compose from './compose';
import contexts from './contexts';
import conversations from './conversations';
import custom_emojis from './custom_emojis';
import domain_lists from './domain_lists';
import { dropdownMenuReducer } from './dropdown_menu';
import filters from './filters';
import followed_tags from './followed_tags';
import height_cache from './height_cache';
import history from './history';
import listAdder from './list_adder';
import listEditor from './list_editor';
import lists from './lists';
import markers from './markers';
import media_attachments from './media_attachments';
import meta from './meta';
import { modalReducer } from './modal';
import mutes from './mutes';
import { notificationPolicyReducer } from './notification_policy';
import { notificationRequestsReducer } from './notification_requests';
import notifications from './notifications';
import picture_in_picture from './picture_in_picture';
import polls from './polls';
import push_notifications from './push_notifications';
import { relationshipsReducer } from './relationships';
import search from './search';
import server from './server';
import settings from './settings';
import status_lists from './status_lists';
import statuses from './statuses';
import suggestions from './suggestions';
import tags from './tags';
import timelines from './timelines';
import trends from './trends';
import user_lists from './user_lists';

const reducers = {
  announcements,
  dropdownMenu: dropdownMenuReducer,
  timelines,
  meta,
  alerts,
  loadingBar: loadingBarReducer,
  modal: modalReducer,
  user_lists,
  domain_lists,
  status_lists,
  accounts: accountsReducer,
  accounts_map,
  statuses,
  relationships: relationshipsReducer,
  settings,
  push_notifications,
  mutes,
  blocks,
  boosts,
  server,
  contexts,
  compose,
  search,
  media_attachments,
  notifications,
  height_cache,
  custom_emojis,
  lists,
  listEditor,
  listAdder,
  filters,
  conversations,
  suggestions,
  polls,
  trends,
  markers,
  picture_in_picture,
  history,
  tags,
  followed_tags,
  notificationPolicy: notificationPolicyReducer,
  notificationRequests: notificationRequestsReducer,
};

// We want the root state to be an ImmutableRecord, which is an object with a defined list of keys,
// so it is properly typed and keys can be accessed using `state.<key>` syntax.
// This will allow an easy conversion to a plain object once we no longer call `get` or `getIn` on the root state

// By default with `combineReducers` it is a Collection, so we provide our own implementation to get a Record
const initialRootState = Object.fromEntries(
  Object.entries(reducers).map(([name, reducer]) => [
    name,
    reducer(undefined, {
      // empty action
    }),
  ]),
);

const RootStateRecord = ImmutableRecord(initialRootState, 'RootState');

const rootReducer = combineReducers(reducers, RootStateRecord);

export { rootReducer };
