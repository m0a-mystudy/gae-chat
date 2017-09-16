import * as React from 'react';
import * as actions from './actions';
import Navbar from './components/navbar';

import { connect, DispatchProp } from 'react-redux';

import LoginToken from './models/login';
import * as reducers from './reducers';

interface Props extends React.Props<{}> {
    loginToken: LoginToken;
}

const mapStateToProps = (state: reducers.State, ownProps: {}): Props => ({
    ...ownProps,
    loginToken: state.loginToken,
});

interface State {
    isOpenModal: boolean;
}
class Navigation extends React.Component<Props & DispatchProp<State>, State> {
    componentDidMount() {
        const { loginToken, dispatch } = this.props;
        if (loginToken.isLogin() && !loginToken.image && dispatch) {
            dispatch(actions.loadMyInfo.started(undefined));
        }
    }
    render() {
        const { loginToken } = this.props;
        return (
            <Navbar
                avaterImg={loginToken.image}
                onSignIn={
                    () => {
                        location.href = `/login`;
                    }}
                onSignOut={
                    () => {
                        // sessionStorage.removeItem('signedtoken');
                    }
                }
            />
        );
    }
}

export default connect(mapStateToProps)(Navigation);
