import React ,{Component} from 'react';
import ListModulo  from './ListModulo.js';
import ListReportes from './ListReportes';
import NavBar from './NavBar.js';
import {Redirect} from 'react-router-dom';



class Reportes extends Component{

    render(){
        return(
            <div className="wrapper">
                <ListModulo/>
                <div class="main-panel">
                    <NavBar/>
                    <ListReportes/>
                </div>
            </div>
        )
    }
}

export default Reportes;