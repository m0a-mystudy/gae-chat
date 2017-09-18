
import * as api from 'gae-chat-client-api';
import * as Rx from 'rxjs';
import { State } from '../reducers';

const runOptions = { fetch, baseURL: location.origin + '/api' };

export const epicDependencies = {
    fetchAccounts$: (googleIDs: string[]) => (
        Rx.Observable.fromPromise(api.AccountApiFp.accountShow({ ids: googleIDs })(runOptions.fetch, runOptions.baseURL))
    ),
    fetchMyInfo$: (options: Object | undefined) =>
        Rx.Observable.fromPromise(api.AccountApiFp.accountShowMe(options)(runOptions.fetch, runOptions.baseURL)),
    fetchRooms$: () =>
        Rx.Observable.fromPromise(api.RoomApiFp.roomList({ limit: 100, offset: 0 })(runOptions.fetch, runOptions.baseURL)),
    createRoom$: (payload: api.RoomPayload, options: Object | undefined) =>
        Rx.Observable.fromPromise(api.RoomApiFp.roomPost({ payload }, options)(runOptions.fetch, runOptions.baseURL)),
    fetchMessages$: (roomName: string, nextCursor?: string) =>
        Rx.Observable.fromPromise(api.MessageApiFp.messageList({ name: roomName, nextCursor})(runOptions.fetch, runOptions.baseURL)),
    postMessage$: (roomName: string, message: string, auther: string, options: Object | undefined) =>
        Rx.Observable.fromPromise(api.MessageApiFp.messagePost({
            name: roomName,
            payload: { content: message, auther, created: new Date() }},                                                     
                                                               options)(runOptions.fetch, runOptions.baseURL)),
    fetchOptions: (state: State) => state.loginToken.fetchOptions()
};
