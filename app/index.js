import 'babel-polyfill';
import React, {Component} from 'react';
import { render } from 'react-dom';
import { App, Play, Join, Room } from './components';
import { Router, Route, Link, browserHistory } from 'react-router'

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

render(
	(
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<Route path="play" component={Play}/>
					<Route path="join/:id" component={Join}/>
					<Route path="room" component={Room}/>
				</Route>
			</Router>
		</Provider>
	),
	document.getElementById('root')
);
