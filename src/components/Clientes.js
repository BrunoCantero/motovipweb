import React ,{Component} from 'react';
import ListModulo  from './ListModulo.js';
import ListClientes  from './ListClientes.js';
import NavBar from './NavBar.js';

class Clientes extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="wrapper">
                <ListModulo/>
                <div class="main-panel">
                    <NavBar/>
                    <ListClientes/>
                </div>
            </div>
        )
    }
}


export default Clientes;