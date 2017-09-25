import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import { Router, Route, IndexRoute, Link, hashHistory, browserHistory } from 'react-router';
import Register from './register';
import Login from './login';
import Home from './home';
import LoggedInHome from './loggedInHome';


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
        <Router history={browserHistory}>
            <Route path='/' component={LoggedInHome} />
        </Router>
    );

    ReactDOM.render(router, document.querySelector('main'));

}
