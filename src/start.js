import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import Register from './register';
import reducer from './reducers';
import Login from './login';
import Home from './home';
import LoggedInHome from './loggedInHome';
import AddNewItem from './addNewItem';
import Profile from './profile';
import App from './app';


const store = createStore(reducer, applyMiddleware(reduxPromise));

// store.subscribe(() => console.log(store.getState()));


if (location.pathname == '/home') {

    const router = (
        <Router history={hashHistory}>
            <Route path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
        </Router>
    );

    ReactDOM.render(router, document.querySelector('main'));

} else {

    const router = (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={LoggedInHome} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/newItem' component={AddNewItem} />
                </Route>
            </Router>
        </Provider>
    );

    ReactDOM.render(router, document.querySelector('main'));

}
