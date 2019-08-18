import React ,{Component} from 'react';
import ListModulo  from './ListModulo.js';
import ListCadetes from './ListCadetes';
import NavBar from './NavBar.js';

class Cadetes extends Component{
    render(){
        return(
            <div className="wrapper">
                <ListModulo/>
                <div class="main-panel">
                    <NavBar/>
                    <ListCadetes/>
                </div>
            </div>
        )
    }
}


export default Cadetes;