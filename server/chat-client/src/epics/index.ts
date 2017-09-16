import { State } from 'reducers';
import { epicDependencies } from './dependencies';
import * as actions from '../actions';
import { Action } from 'redux';
import * as Rx from 'rxjs';
import 'typescript-fsa-redux-observable';
import { combineEpics, Epic, createEpicMiddleware } from 'redux-observable';

type ChatEpic = Epic<Action, State, typeof epicDependencies>;

// 自分自身の情報を取得してstoreに設定する
const loadMyInfoEpic: ChatEpic =
    (action$, store, depends) => action$.ofAction(actions.loadMyInfo.started)
        .mergeMap(action => {
            return depends.fetchMyInfo$(depends.fetchOptions(store.getState()))
                .map(payload => actions.loadMyInfo.done({
                    params: action.payload,
                    result: payload
                }))
                .catch(error => Rx.Observable.of(actions.loadMyInfo.failed({
                    params: action.payload,
                    error
                })));
        });

// room一覧の取得と設定
const loadRoomsEpic: ChatEpic =
    (action$, store, depends) => action$.ofAction(actions.loadRooms.started)
        .mergeMap(action => {
            return depends.fetchRooms$()
                .map(roomCollection => actions.loadRooms.done({
                    params: action.payload,
                    result: roomCollection
                }))
                .catch(error => Rx.Observable.of(actions.loadRooms.failed({
                    params: action.payload,
                    error
                })));
        });
// room新規作成
const createRoomEpic: ChatEpic =
    (action$, store, depends) => action$.ofAction(actions.createRoom.started)
        .mergeMap(action => {
            return depends.createRoom$({ description: '', name: action.payload.name }, depends.fetchOptions(store.getState()))
                .map(payload => actions.createRoom.done({
                    params: action.payload,
                    result: payload
                }))
                .catch(error => Rx.Observable.of(actions.createRoom.failed({
                    params: action.payload,
                    error
                })));
        });

// messageの取得
const loadMessagesEpic: ChatEpic =
    (action$, store, depends) => action$.ofAction(actions.selectRoom.started)
        .mergeMap(action => {
            return depends.fetchMessages$(action.payload.name)
                .map(payload => actions.loadMessages(payload))
                .catch(error => Rx.Observable.of(actions.selectRoom.failed({
                    params: action.payload,
                    error
                })));
        });

// message登録
const postMessageEpic: ChatEpic =
    (action$, store, depends) => action$.ofAction(actions.postMessage.started)
        .mergeMap(action => {
            const { roomName, message } = action.payload;
            const auther = store.getState().loginToken.name;
            return depends.postMessage$(roomName, message, auther, store.getState().loginToken.fetchOptions())
                .map(payload => actions.postMessage.done({
                    params: action.payload,
                    result: payload,
                }))
                .catch(error => Rx.Observable.of(actions.postMessage.failed({
                    params: action.payload,
                    error
                })));
        });

// 上記メッセージ登録完了に合わせてメッセージの取得を行う
const postMessagedoneEpic: ChatEpic =
    (action$, store, depends) => action$.ofAction(actions.postMessage.done)
        .mergeMap(action => {
            return Rx.Observable.of(actions.selectRoom.started({
                name: action.payload.params.roomName
            }));
        });

// account情報の取得
const loadAccountsEpic: ChatEpic = 
(action$, store, depends) => action$.ofAction(actions.loadAccounts.started)
    .mergeMap(action => {
        return depends.fetchAccounts$(action.payload.googleUsrIDs)
            .map(payload => actions.loadAccounts.done({
                params: action.payload,
                result: payload
            }))
            .catch(error => Rx.Observable.of(actions.loadAccounts.failed({
                params: action.payload,
                error
            })));
    });

export const epics = combineEpics(
    loadMyInfoEpic,
    loadRoomsEpic,
    createRoomEpic,
    loadMessagesEpic,
    postMessageEpic,
    postMessagedoneEpic,
    loadAccountsEpic,
);

export const epicMiddleware = createEpicMiddleware(epics, { dependencies: epicDependencies });
