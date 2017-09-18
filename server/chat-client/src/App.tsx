import * as React from 'react';

import Navigation from './Navigation';
// import Footer from './components/footer';
import RoomList from './components/roomList';
import ChatWindow from './components/chatWindow';
import CreateRoom from './components/createRoom';
import ChatMessage from './components/chatMessage';
import Chat from './containers/chat';

import * as api from 'gae-chat-client-api';

import { connect } from 'react-redux';
import * as actions from './actions';

// models

import LoginToken from './models/login';
import Rooms from './models/rooms';
import Messages from './models/messages';
import Accounts from './models/accounts';

import * as reducers from './reducers';
// import * as faker from 'faker/locale/ja';

import { AnyAction } from 'typescript-fsa';

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

interface DispatchProps {
    loadRooms(): AnyAction;
    loadAccounts(googleIds: string[]): AnyAction;
    createRoom(name: string): AnyAction;
    selectRoom(name: string): AnyAction;
    postMessage(roomName: string, message: string): AnyAction;
}

const mapDispatchProps = (dispatch: Redux.Dispatch<{}>, ownProps: {}): DispatchProps => ({
    loadRooms: () => dispatch(actions.loadRooms.started(undefined)),
    loadAccounts: googleUsrIDs => dispatch(actions.loadAccounts.started({ googleUsrIDs })),
    createRoom: name => dispatch(actions.createRoom.started({ name })),
    selectRoom: name => dispatch(actions.selectRoom.started({ name })),
    postMessage: (roomName, message) => dispatch(actions.postMessage.started({ roomName, message }))
});

interface State {
    isOpenModal: boolean;
}
class App extends React.Component<Props &  DispatchProps, State> {
    constructor(props: Props & DispatchProps) {
        super(props);
        this.state = {
            isOpenModal: false
        };
    }
    componentDidMount() {
        const { loadRooms } = this.props;
        loadRooms();
    }
    componentWillReceiveProps(nextProps: Readonly<Props & DispatchProps>) {
        if (nextProps.messages !== this.props.messages) {
            this.loadAccountsByMessage();
        }

        const { selectRoom } = this.props;

        let selectRoomName = this.props.messages.selectRoomName;
        if (selectRoomName === undefined) {
            selectRoomName = 'generics';
            selectRoom(selectRoomName);
        }

    }
    loadAccountsByMessage() {
        const { loadAccounts } = this.props;

        // storeに保有してないaccount情報を探す。
        const Ids = this.props.messages.list.map((m: api.Message) => m.auther);
        const accountDict = this.props.accounts.dict; 
        let fetchIds: string[] = [];
        Ids.forEach((id: string) => {
            if (!accountDict.get(id) && fetchIds.indexOf(id) < 0) {
                fetchIds.push(id);
            }
        });
        if (fetchIds.length > 0) {
            loadAccounts(fetchIds);
        }

    }

    render() {
        const { isOpenModal } = this.state;
        const {
            rooms,
            accounts,
            selectRoom,
            postMessage,

        } = this.props;

        const roomNames = rooms.list.toArray().map(r => r ? r.name : '');
        const messages = this.props.messages.list;
        const selectRoomName = this.props.messages.selectRoomName;
        if (!selectRoomName) { return null; }

        const accountsDict = accounts.dict;

        return (
            <div>
                {
                    isOpenModal &&
                    <CreateRoom
                        onCreate={(name) => {
                            selectRoom(name);
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
                            initActiveName={selectRoomName}
                            names={roomNames}
                            onSelectRoom={selectRoom}
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
                                    postMessage(roomName, message);
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

export default connect(mapStateToProps, mapDispatchProps)(App);
