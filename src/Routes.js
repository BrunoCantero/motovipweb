import React  from 'react';
import { BrowserRouter, Switch,HashRouter ,Route } from 'react-router-dom';
import Login     from './components/Login.js';
import Dashboard from './components/Dashboard.js';


const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/"    component={Login}/>
            <Route path="/login"     component={Login}/>
            <Route path="/dashboard" component={Dashboard}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;