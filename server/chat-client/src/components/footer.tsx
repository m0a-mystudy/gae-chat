
import * as React from 'react';

interface Props extends React.Props<{}> { }

const Footer = (props: Props) => (
  <footer
    className="footer"
    style={{
      height: '20px'
    }}
  >
    <div className="container">
      <div className="content has-text-centered">
        <p>
          <strong>GAE chat</strong> by <a href="https://m0a.github.io">m0a</a>.
          The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
          <a className="icon" href="https://github.com/m0a-mystudy/gae-chat">
            <i className="fa fa-github" />
          </a>
          .
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;