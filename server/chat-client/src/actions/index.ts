
import * as api from 'gae-chat-client-api';
import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

// chat room一覧の取得
export const loadRooms = actionCreator.async<undefined, api.RoomCollection>('LOAD_ROOMS');

// chat message内のアカウント情報の収集
export interface FetchAccountPayload {
    googleUsrIDs: string[];
}
export const loadAccounts = actionCreator.async<FetchAccountPayload, api.Account[]>('LOAD_ACCOUNTS');

// jwtを元にして自分のアカント情報の収集
export const loadMyInfo = actionCreator.async<undefined, api.Account>('LOAD_MYINFO');

// chat room 新規作成
export const createRoom = actionCreator.async<{name: string}, api.Room>('CREATE_ROOM');

// room選択処理
export const selectRoom = actionCreator.async<{name: string}, api.Room>('SELECT_ROOM');
// selectRoom から開始してMessageの祝を行い以下のactionで設定する
export const loadMessages = actionCreator<api.MessageCollection>('LOAD_MESSAGES');

// message送信
export const postMessage = actionCreator.async<{roomName: string, message: string}, api.Message>('POST_MESSAGE');

// error処理
export const Error = actionCreator<Error>('ERROR');