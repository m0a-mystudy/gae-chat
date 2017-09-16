import * as api from 'gae-chat-client-api';
import { Record, Map } from 'immutable';

type AccountDict = Map<string, api.Account>;

interface AccountsInterface {
    dict: AccountDict;
}
const AccountsRecord = Record(<AccountsInterface> {
    dict: Map<string, api.Account>(),
});

export default class Accounts extends AccountsRecord implements AccountsInterface {
    dict: AccountDict;
    setAccounts(accounts: api.Account[]): Accounts {
        console.group('setAccounts');
        let next = <Accounts> this;
        for (let a of accounts) {
            next = <Accounts> next.updateIn(['dict'], (dict: AccountDict) => {
                return dict.set(`${a.googleUserID}`, a);
            });
        }
        console.log(next);
        console.groupEnd();
        return next;
    }
    getAccount(accountID: number): api.Account | undefined {
        return this.dict.get(`${accountID}`);
    }
}