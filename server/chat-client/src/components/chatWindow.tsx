import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'moment/locale/ja';

import ReadMore from './readMore';
interface Props extends React.Props<{}> {
  windowHeight: number;
  roomName: string;
  onSend: (message: string) => void;
  onReadMore?: () => void;
  isLoading?: boolean;
}

export default class ChatWindow extends React.Component<Props, {}> {
  scrollView: HTMLDivElement;
  messageBody: HTMLInputElement;
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    let elm = ReactDOM.findDOMNode(this.scrollView);
    elm.scrollTo({ behavior: 'smooth', top: elm.scrollHeight });
  }
  sendAndClear() {
    this.props.onSend(this.messageBody.value);
    this.messageBody.value = '';
  }
  render() {
    const { roomName, windowHeight, children } = this.props;
    // const { message } = this.state;
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
          ref={(el: HTMLDivElement) => { this.scrollView = el; }}
          style={{
            overflowY: 'scroll',
            height: `${windowHeight}px`
          }}
        >
          <ReadMore  
            onClick={() => {
              if (this.props.onReadMore) { this.props.onReadMore(); }}
            }
            isLoading={this.props.isLoading}
          />

          {children}
        </div>
        <footer className="card-footer">
          <div className="field card-footer-item has-addons">
            <p className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="shift + enter で送信"
                ref={(el: HTMLInputElement) => { this.messageBody = el; }}
                onKeyUp={
                  (ev) => {
                    // shift + enter
                    if (ev.keyCode === 13 && ev.shiftKey) {
                      this.sendAndClear();
                    }
                  }
                }
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
