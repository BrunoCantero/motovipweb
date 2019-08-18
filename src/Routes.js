import React  from 'react';
import { BrowserRouter, Switch,HashRouter ,Route } from 'react-router-dom';
import Login     from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Cadetes from './components/Cadetes.js';
import Clientes from './components/Clientes';

const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/"    component={Login}/>
            <Route path="/login"     component={Login}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/cadetes"   component={Cadetes}/>
            <Route path="/clientes"  component={Clientes}/>
        </Switch>
    </BrowserRouter>
)

export default Routes;