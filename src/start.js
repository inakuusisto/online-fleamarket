import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Register from'./register';


const router = (
    <Router history={hashHistory}>
        <Route path='/' component={Welcome}>
        </Route>
    </Router>
)

ReactDOM.render(router, document.querySelector('main'));
