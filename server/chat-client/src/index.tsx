import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import rootReducer, { initStateRecord } from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { epicMiddleware } from './epics';
import { composeWithDevTools } from 'redux-devtools-extension';

const initState = new initStateRecord();
const store = createStore(rootReducer, initState, composeWithDevTools(
  applyMiddleware(epicMiddleware),
));

ReactDOM.render(
  <Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
