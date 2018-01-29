import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { logger } from 'redux-logger';
import {BrowserRouter, Route } from 'react-router-dom';
import thunk  from 'redux-thunk';
import  decode  from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';

import { loginAction } from './actions/authentication';

import 'semantic-ui-css/semantic.min.css';

import RouterHub from './RouterHub';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if(localStorage.subredditToken){
    const records = decode(localStorage.subredditToken);
    const user ={ token: localStorage.subredditToken, 
                email: records.email, 
                confirmed: records.confirmed};
    store.dispatch(loginAction(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={RouterHub} />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
