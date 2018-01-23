import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { logger } from 'redux-logger';
import {BrowserRouter } from 'react-router-dom';
import thunk  from 'redux-thunk';

import 'semantic-ui-css/semantic.min.css';


import RouterHub from './RouterHub';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <RouterHub />
        </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
