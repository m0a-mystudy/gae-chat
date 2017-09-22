import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'moment/locale/ja';

import ReadMore from './readMore';

interface State {
  scrollToTop: boolean;
}
interface Props extends React.Props<{}> {
  windowHeight: number;
  roomName: string;
  onSend: (message: string) => void;
  onReadMore?: () => void;
  isLoading?: boolean;
}

export default class ChatWindow extends React.Component<Props, State> {
  scrollView: HTMLDivElement;
  messageBody: HTMLInputElement;
  constructor(props: Props) {
    super(props);
    this.state = {
      scrollToTop: false,
    };

  }
  componentDidMount() {
    this.autoScroll();
  }
  componentDidUpdate() {
    this.autoScroll();
  }
  autoScroll() {
    if (this.state.scrollToTop) {
      this.scrollToTop();
    } else {
      this.scrollToBottom();
    }
  }
  scrollToTop() {
    let elm = ReactDOM.findDOMNode(this.scrollView);
    if (elm.scrollTo) {
      elm.scrollTo({ behavior: 'smooth', top: 0 });
    } else {
      elm.scrollTop = 0;
    }
    
  }

  scrollToBottom() {
    let elm = ReactDOM.findDOMNode(this.scrollView);
    if (elm.scrollTo) {
      elm.scrollTo({ behavior: 'smooth', top: elm.scrollHeight });
    } else {
      elm.scrollTop = elm.scrollHeight;
    }
  }

  sendAndClear() {
    this.props.onSend(this.messageBody.value);
    this.messageBody.value = '';
    this.setState({
      scrollToTop: false
    });
  }
  readMore() {
    if (this.props.onReadMore) { 
      this.props.onReadMore(); 
      this.setState({
        scrollToTop: true
      });
    }
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
            onClick={() => this.readMore()}
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
