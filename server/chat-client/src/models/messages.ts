import * as api from 'gae-chat-client-api';
import { Record, List } from 'immutable';

type MessageList = List<api.Message>;

interface MessagesInterface {
    list: MessageList;
    selectRoomName: string | undefined;
}
const MessagesRecord = Record(<MessagesInterface> {
    list: List<api.Message>(),
    selectRoomName: undefined,
});

export default class Messages extends MessagesRecord implements MessagesInterface {
    list: MessageList;
    selectRoomName: string | undefined;
    selectRoom(roomName: string): Messages {
        let next = <Messages> this;
        next = <Messages> next.set('selectRoomName', roomName);
        return next;
    }
    setMessages(messages: api.Message[]): Messages {
        let next = <Messages> this;
        next = <Messages> next.updateIn(['list'], (vals: api.Message[]) => messages);
        return next;
    }
}