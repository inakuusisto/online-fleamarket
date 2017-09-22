import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import Register from './register';
import Login from './login';


const router = (
    <Router history={hashHistory}>
        <Route path='/' component={Welcome}>
        <Route path='/login' component={Login} />
        <IndexRoute component={Register} />
        </Route>
    </Router>
);

ReactDOM.render(router, document.querySelector('main'));
