import * as api from 'gae-chat-client-api';
import { Record, List } from 'immutable';

type MessageList = List<api.Message>;

interface MessagesInterface {
    list: MessageList;
    nextCursor: string | undefined;
    selectRoomName: string | undefined;
    isLoading: boolean;

}
const MessagesRecord = Record(<MessagesInterface> {
    list: List<api.Message>(),
    nextCursor: undefined,
    selectRoomName: undefined,
    isLoading: false,
});

export default class Messages extends MessagesRecord implements MessagesInterface {
    list: MessageList;
    nextCursor: string | undefined;
    selectRoomName: string | undefined;
    isLoading: boolean;
    setLoading(flag: boolean): Messages {
        let next = <Messages> this;
        next = <Messages> next.set('isLoading', flag);
        return next;
    }
    selectRoom(roomName: string): Messages {
        let next = <Messages> this;
        next = <Messages> next.set('selectRoomName', roomName);
        return next;
    }
    resetMessages(): Messages {
        return <Messages> this.setIn(['list'], List<api.Message>());
    }
    setByPayload(resp: api.ResponseMessages): Messages {
        let next = <Messages> this.withMutations((ms: Messages) => {
            ms.updateIn(['list'], (vals: api.Message[]) => vals.push(...resp.messages));
            ms.set('nextCursor', resp.next);
            ms.set('isLoading', false);
        });
        return next;
    }
}