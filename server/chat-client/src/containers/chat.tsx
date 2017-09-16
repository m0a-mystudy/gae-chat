import * as React from 'react';
import Footer from '../components/footer';

interface Props extends React.Props<{}> {
    navibar: JSX.Element;
    sidemenu: JSX.Element;
    main: JSX.Element;
}

const Chat = (props: Props) => (
    <div className="container">
        <div className="columns">
            <div className="column">
                {props.navibar}
            </div>
        </div>
        <div className="columns">
            <div className="column is-one-quarter">
                {props.sidemenu}
            </div>
            <div className="column">
                {props.main}
            </div>
        </div>
        <Footer />
    </div>
);

export default Chat;
