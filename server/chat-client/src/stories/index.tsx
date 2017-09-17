import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import Navbar from '../components/navbar';
import RoomList from '../components/roomList';
import ChatWindow from '../components/chatWindow';
import CreateRoom from '../components/createRoom';
import ChatMessage from '../components/chatMessage';
import Chat from '../containers/chat';

import * as faker from 'faker/locale/ja';

let messages: number[] = [];
for (let i = 0; i < 50; i++) {
    messages.push(i);
}

let rooms: string[] = [];
for (let i = 0; i < 10; i++) {
    rooms.push(faker.internet.domainName());
}

storiesOf('chat', module)
    .add('main01', () => (
        <Chat
            navibar={<Navbar avaterImg={faker.image.avatar()} />}
            sidemenu={
                <RoomList
                    initActiveName={rooms[0]}
                    names={rooms}
                    onSelectRoom={action('onSelectRoom')}
                    onCreateRoom={action('onCreateRoom')}
                />
            }
            main={
                <ChatWindow
                    windowHeight={550}
                    roomName="sample Room01"
                    onSend={action('onSend')}
                >
                    {
                        messages.map(v => (
                            <ChatMessage
                                key={v}
                                fullname={faker.name.findName()}
                                name={`@${faker.name.firstName()}`}
                                img={faker.image.avatar()}
                                upload={faker.date.recent()}
                                message={faker.lorem.sentences(5)}
                            />
                        ))
                    }
                </ChatWindow>
            }

        />
    ))

    .add('modal', () => (
        <div className="container">

            <CreateRoom
                onCreate={action('onCreate')}
                onCancel={action('onCancel')}
            />
        </div>
    ))
    .add('modal Error', () => (
        <div className="container">

            <CreateRoom
                // tslint:disable-next-line:jsx-alignment
                onCreate={() => { throw new Error('some error'); }}
                onCancel={action('onCancel')}
            />
        </div>
    ))

    ;

storiesOf('Bulma', module)
    .add('start01', () => (
        <section className="section">
            <div className="container">
                <h1 className="title">
                    Hello World
      </h1>
                <p className="subtitle">
                    My first website with <strong>Bulma</strong>!
      </p>
            </div>
        </section>
    ));

storiesOf('Bulma02', module)
    .add('start01', () => (
        <div className="columns">
            <div className="column is-2">
                <button className="button">HELLOMMMM!</button>
            </div>
            <div className="column is-1">
                <button className="button is-primary">HELLO!</button>
            </div>
            <div className="column is-1">
                <button className="button is-primary is-large">HELLO!</button>
            </div>
        </div>
    ));

