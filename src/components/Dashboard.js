import React,{Component} from 'react';
import ListModulo from './ListModulo.js';
import ListPedidos from './ListPedidos.js';
import NavBar from './NavBar.js';


class Dashboard extends Component{

    render(){
        return(
            <div className="wrapper">
                <ListModulo/>
                <div class="main-panel">
                    <NavBar/>
                    <ListPedidos/>
                </div>
            </div>
        )
    }
}


export default  Dashboard;