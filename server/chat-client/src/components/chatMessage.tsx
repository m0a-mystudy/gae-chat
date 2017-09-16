import * as React from 'react';
import * as moment from 'moment';
import 'moment/locale/ja';
// import * as faker from 'faker';

interface Props extends React.Props<{}> {
    fullname: string;
    name: string;
    img: string;
    upload: Date;
    message: string;
}

const ChatMessage = (props: Props) => (
    <div className="box">
        <article className="media">
            <div className="media-left">
                <figure className="image is-64x64">
                    <img src={props.img} alt="Image" height="64px" width="64px" />
                </figure>
            </div>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>{props.fullname}</strong> <small>{props.name}</small> <small>{moment(props.upload).fromNow()}</small>
                        <br />
                        {props.message}
                    </p>
                </div>
            </div>
        </article>
    </div>

);

export default ChatMessage;