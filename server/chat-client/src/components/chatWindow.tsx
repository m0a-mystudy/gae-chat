import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'moment/locale/ja';

interface State {
  message: string;
}

interface Props extends React.Props<{}> {
  windowHeight: number;
  roomName: string;
  onSend: (message: string) => void;
}

export default class ChatWindow extends React.Component<Props, State> {
  messageEnd:  HTMLDivElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      message: ''
    };
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    let elm = ReactDOM.findDOMNode(this.messageEnd);
    elm.scrollIntoView({ behavior: 'smooth' });
  }
  sendAndClear() {
    this.props.onSend(this.state.message);
    this.setState({message: ''});
    this.scrollToBottom();
  }
  render() {
    const { roomName, windowHeight, children } = this.props;
    const { message } = this.state;
    return (
      <div
        className="card"
      >
        <header className="card-header">
          <p className="card-header-title">
            {roomName}
          </p>

        </header>
        <div
          className="card-content"
          style={{
            overflowY: 'scroll',
            height: `${windowHeight}px`
          }}
        >
          {children}
          {<div ref={(el: HTMLDivElement) => {this.messageEnd = el; }} />}
        </div>
        <footer className="card-footer">
          <div className="field card-footer-item has-addons">
            <p className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="shift + enter で送信"
                onKeyUp={
                  (ev) => {
                    // shift + enter
                    if (ev.keyCode === 13 && ev.shiftKey) { 
                      this.sendAndClear(); 
                    }
                  }
                }
                onChange={ev => (this.setState({message: ev.target.value}))}
                value={message}
              />
            </p>
            <p className="control">
              <button
                className="button is-primary"
                onClick={() => { this.sendAndClear(); }}
              >
                Send
              </button>
            </p>
          </div>

        </footer>
      </div>

    );
  }
}
