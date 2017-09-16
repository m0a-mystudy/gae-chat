import * as React from 'react';

const logo = require('./logo.svg') as string;

interface Props extends React.Props<{}> {
  avaterImg?: string;
  onSignIn?(): void;
  onSignOut?(): void;
}

const SignOut = (props: { onSignOut?: () => void }) => (
  <div className="navbar-item is-tab">
    <div className="field is-grouped">
      <p className="control">
        <a 
          className="button is-primary"
          onClick={() => props.onSignOut && props.onSignOut()}
        >
          <span className="icon">
            <i className="fa fa-sign-out" />
          </span>
          <span>Logout</span>
        </a>
      </p>
    </div>
  </div>
);

const SignIn = (props: { onSignIn?: () => void }) => (
  <div className="navbar-item is-tab">
    <div className="field is-grouped">
      <p className="control">
        <a 
          className="button is-primary"
          onClick={() => props.onSignIn && props.onSignIn()}
        >
          <span className="icon">
            <i className="fa fa-sign-in" />
          </span>
          <span>Login</span>
        </a>
      </p>
    </div>
  </div>
);

const Navbar = (props: Props) => (
  <nav className="navbar is-light">
    <div className="navbar-brand">
      <a className="navbar-item" href="http://bulma.io">
        <img src={logo} width="155px" height="40px" />
      </a>

      <a className="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
        <span className="icon" style={{ color: '#333' }}>
          <i className="fa fa-lg fa-github" />
        </span>
      </a>
      <a className="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
        <span className="icon" style={{ color: '#55acee' }}>
          <i className="fa fa-lg fa-twitter" />
        </span>
      </a>
    </div>
    <div id="navMenuTransparentExample" className="navbar-menu">
      <div className="navbar-end">

        <a className="navbar-item is-hidden-desktop-only" href="https://github.com/jgthms/bulma" target="_blank">
          <span className="icon" style={{ color: '#333' }}>
            <i className="fa fa-lg fa-github" />
          </span>
        </a>
        <a className="navbar-item is-hidden-desktop-only" href="https://twitter.com/jgthms" target="_blank">
          <span className="icon" style={{ color: '#55acee' }}>
            <i className="fa fa-lg fa-twitter" />
          </span>
        </a>

        {
          props.avaterImg && (
            <div className="navbar-item" style={{ paddingRight: '0px' }} >
              <img src={props.avaterImg} />
            </div>
          )
        }
        
        {
          props.avaterImg ?  SignOut(props) : SignIn(props)
        }

      </div>
    </div>
  </nav>
);

export default Navbar;
