import * as actions from '../actions';

// models
import Accounts from '../models/accounts';
import LoginToken from '../models/login';
import Rooms from '../models/rooms';
import Messages from '../models/messages';

import * as api from 'gae-chat-client-api';

import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { combineReducers } from 'redux-immutable';

import * as Immutable from 'immutable';

export interface State {
    accounts: Accounts;
    loginToken: LoginToken;
    rooms: Rooms;
    messages: Messages;
}

export const initStateRecord = Immutable.Record({
    accounts: new Accounts(),
    loginToken: new LoginToken(),
    rooms: new Rooms(),
    messages: new Messages(),
});

const accounts = reducerWithInitialState(new Accounts())
    .case(actions.loadAccounts.done, (state, payload) => (state.setAccounts(payload.result)))
    ;

const loginToken = reducerWithInitialState(new LoginToken())
    .case(actions.loadMyInfo.done, (state, payload) => (state.setMyAccount(payload.result)))
    ;

const rooms = reducerWithInitialState(new Rooms())
    .case(actions.loadRooms.done, (state, payload) => (state.setRooms(payload.result)))
    .case(actions.createRoom.done, (state, payload) => (state.setRooms([<api.Room> { name: payload.params.name }])))
    ;

const messages = reducerWithInitialState(new Messages())
    .case(actions.selectRoom.started, (state, payload) => {
            
            state = state.selectRoom(payload.name);
            state = state.setLoading(true);
            return state;
        }
    )
    .case(actions.setMessage, (state, payload) => {
        state = state.resetMessages(); // 初回取得なのでリセットする
        return state.setByPayload(payload);
    })
    .case(actions.loadMessagesMore.started, (state, payload) => state.setLoading(true))
    .case(actions.loadMessagesMore.done, (state, payload) => {
        state = state.setByPayload(payload.result);
        return state;
    })
    .case(actions.loadMessagesMore.failed, (state) => (state.setLoading(false)))

    ;

export default combineReducers({
    accounts,
    loginToken,
    rooms,
    messages,
});
