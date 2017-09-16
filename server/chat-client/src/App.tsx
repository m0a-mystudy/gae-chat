import * as React from 'react';

import Navigation from './Navigation';
// import Footer from './components/footer';
import RoomList from './components/roomList';
import ChatWindow from './components/chatWindow';
import CreateRoom from './components/createRoom';
import ChatMessage from './components/chatMessage';
import Chat from './containers/chat';

import * as api from 'gae-chat-client-api';

import { connect, DispatchProp } from 'react-redux';
import * as actions from './actions';

// models

import LoginToken from './models/login';
import Rooms from './models/rooms';
import Messages from './models/messages';
import Accounts from './models/accounts';

import * as reducers from './reducers';
// import * as faker from 'faker/locale/ja';

interface Props extends React.Props<{}> {
    loginToken: LoginToken;
    rooms: Rooms;
    messages: Messages;
    accounts: Accounts;
}

const mapStateToProps = (state: reducers.State, ownProps: {}): Props => ({
    ...ownProps,
    loginToken: state.loginToken,
    rooms: state.rooms,
    messages: state.messages,
    accounts: state.accounts,
});

interface State {
    isOpenModal: boolean;
}
class App extends React.Component<Props & DispatchProp<State>, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpenModal: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch(actions.loadRooms.started(undefined));
        }

    }
    loadAccountsByMessage() {
        const { dispatch } = this.props;
        if (dispatch === undefined) {
            return;
        }

        // storeに保有してないaccount情報を探す。
        const Ids = this.props.messages.list.map((m: api.Message) => m.auther);
        // console.group('loadAccountsByMessage');
        // console.log('this.props.messages.list', this.props.messages.list);
        // console.log('Ids', Ids);

        const accountDict = this.props.accounts.dict; // . //.map((a: api.Account) => a.googleUserID);
        // console.log('accountDict', accountDict);
        let fetchIds: string[] = [];
        Ids.forEach((id: string) => {
            if (!accountDict.get(id) && fetchIds.indexOf(id) < 0) {
                fetchIds.push(id);
            }
        });
        // console.log('fetchIds', fetchIds);
        // console.groupEnd();

        dispatch(actions.loadAccounts.started({ googleUsrIDs: fetchIds }));
    }

    render() {
        const { isOpenModal } = this.state;
        const {
            dispatch,
            rooms,
            accounts,
        } = this.props;
        if (!dispatch) { return null; }

        const roomNames = rooms.list.toArray().map(r => r ? r.name : '');
        const messages = this.props.messages.list;
        let selectRoomName = this.props.messages.selectRoomName;
        if (selectRoomName === undefined) {
            selectRoomName = 'generics';
        }

        this.loadAccountsByMessage();

        const accountsDict = accounts.dict;
        console.log('accountsDict', accountsDict);

        return (
            <div>
                {
                    isOpenModal &&
                    <CreateRoom
                        onCreate={(name) => {
                            dispatch(actions.createRoom.started({ name }));
                            this.setState(
                                { isOpenModal: false }
                            );
                        }}
                        onCancel={() => {
                            this.setState(
                                { isOpenModal: false }
                            );
                        }
                        }
                    />
                }
                <Chat
                    navibar={<Navigation />}
                    sidemenu={
                        <RoomList
                            names={roomNames}
                            onSelectRoom={(name) => dispatch(actions.selectRoom.started({ name }))}
                            onCreateRoom={() => {
                                this.setState({ isOpenModal: true });
                            }}
                        />
                    }
                    main={
                        <ChatWindow
                            windowHeight={550}
                            roomName={selectRoomName}
                            onSend={
                                (message) => {
                                    const roomName = selectRoomName;
                                    if (message.length === 0 || roomName === undefined) {
                                        return;
                                    }
                                    dispatch(actions.postMessage.started({
                                        roomName,
                                        message
                                    }));
                                }
                            }
                        >
                            {
                                messages.map((v: api.Message) => {
                                    const a = accountsDict.get(v.auther);
                                    if (a === undefined) { return null; }
                                    const name = a.name || '';
                                    const img = `data:image/png;base64,${a.picture}`;
                                    return (
                                        <ChatMessage
                                            key={v.id}
                                            fullname={name}
                                            name={`@${v.auther}`}
                                            img={img}
                                            upload={new Date(v.created)}
                                            message={v.content}
                                        />);
                                })
                            }
                        </ChatWindow>
                    }

                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
