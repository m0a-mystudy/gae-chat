import * as api from 'gae-chat-client-api';
import { Record, List } from 'immutable';

type RoomList = List<api.Room>;

interface RoomsInterface {
    list: RoomList;
}
const RoomsRecord = Record(<RoomsInterface> {
    list: List<api.Room>(),
});

export default class Rooms extends RoomsRecord implements RoomsInterface {
    list: RoomList;
    setRooms(rooms: api.Room[]): Rooms {
        console.group('setRooms');
        let next = <Rooms> this;
        next = <Rooms> next.updateIn(['list'], (list: RoomList) => {
            return list.push(...rooms);
        });
        console.log(next);
        console.groupEnd();
        return next;
    }
}