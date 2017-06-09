import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import Routes from './route.js';
import './index.css';

ReactDOM.render(
    <Routes path="/"/>,
    document.getElementById('root')
);
