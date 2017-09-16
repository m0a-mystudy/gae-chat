import { Record } from 'immutable';
import * as base64 from 'base-64';
import { Account } from 'gae-chat-client-api';

const subToken = (token: string): string => {
    return token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
};

interface TokenInterface {
    exp: number;
    sub: string;
}
const parseToken = (token: string): TokenInterface | undefined => {
    try {
        const next = JSON.parse(base64.decode(subToken(token)));
        if (next && next.exp) {
            return next;
        }
    } catch (e) {
        return;
    }
    return;
};

interface LoginInterface {
    name: string;
    image: string | undefined;
}
const LoginRecord = Record(<LoginInterface> {
    name: '',
    image: undefined,
});

export default class Login extends LoginRecord implements LoginInterface {
    name: string;
    image: string | undefined;

    clearToken(): void {
        sessionStorage.removeItem('signedtoken');
    }
    getToken(): string {
        return sessionStorage.getItem('signedtoken') || '';
    }

    setMyAccount(account: Account): Login {

        let image: string | undefined = undefined;
        if (account.picture !== '') {
            image = `data:image/png;base64,${account.picture}`;
        }
        
        let next = <Login> this.set('name', account.name).set('image', image);
        return next;
    }
    logout(): Login {
        this.clearToken();
        let next = <Login> this.set('name', '')
            .set('image', '');
        return next;
    }

    tokenOk(): boolean {
        console.group('in tokenOk');
        try {
            const token = parseToken(this.getToken());
            console.log(token);
            if (token) {
                const now = new Date().valueOf() / 1000;
                if (token.exp > now) {
                    console.log('token.exp', token.exp);
                    console.log('now      ', now);
                    console.log('token.exp > now', token.exp > now);
                    return true;
                }
            }

            return false;
        }
        finally {
            console.groupEnd();
        }
    }
    isLogin(): boolean {
        console.log('this.tokenOk()', this.tokenOk());
        return this.tokenOk();
    }

    fetchOptions(option: Object | undefined = undefined): Object | undefined {
        if (!this.tokenOk()) {
            throw new Error('loginToken expired!');
        }
        let addOption = {};
        if (option) {
            addOption = option;
        }
        return Object.assign({}, { headers: { 'Authorization': 'Bearer ' + this.getToken() } }, addOption);

    }
}