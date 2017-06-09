/**
 * Created by swallow on 2017/5/20.
 */
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Detail from './Detail/Detail';
import Index from './Index/Index';
const Routes = (props) => (
    <Router {...props}>
        <div>
        <Route exact path="/" component={Index} />
        <Route path="/Detail/:name/:singer/:musicFileUrl" component={Detail} />
        </div>
    </Router>
);

export default Routes;

