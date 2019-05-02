import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Main from './pages/Main';
import Box from './pages/Box';
import AllBoxes from './pages/AllBoxes';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/box/:id" exact component={Box} />
            <Route path="/boxes" component={AllBoxes} />
        </Switch>
    </BrowserRouter>
);  

export default Routes;