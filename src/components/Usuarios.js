import React ,{Component} from 'react';
import ListModulo  from './ListModulo.js';
import NavBar from './NavBar.js';
import ListUsuarios from './ListUsuarios';

class Usuarios extends Component{

    render(){
        return(
            <div className="wrapper">
                <ListModulo/>
                <div class="main-panel">
                    <NavBar/>
                    <ListUsuarios/>
                </div>
            </div>
        )
    }
}

export default Usuarios;