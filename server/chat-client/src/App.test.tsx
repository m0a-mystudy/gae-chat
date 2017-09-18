import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import rootReducer, { initStateRecord } from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { epicMiddleware } from './epics';
import { composeWithDevTools } from 'redux-devtools-extension';

const initState = new initStateRecord();
const store = createStore(rootReducer, initState, composeWithDevTools(
  applyMiddleware(epicMiddleware),
));

let Index = () => <Provider store={store}><App /></Provider>;
it('renders without crashing', () => {
  
  const div = document.createElement('div');
  ReactDOM.render(<Index />, div);

});
