import React ,{Component} from  'react';
import {NavLink} from 'react-router-dom';

class ListModulos extends Component{
    constructor(props){
        super(props);
        this.state = {
            perfil     : 'admin',
        }
    }

    render(){
        return(
            <div className="sidebar" style={{backgroundColor:'#000'}}>
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <a href="http://www.gogole.com" className="simple-text">
                        <img src={require('../styles/img/motovip2.png')} />
                        </a>
                    </div>
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink  exac to='/dashboard' className="nav-link" activeStyle={{ color: 'gray',backgroundColor:'#fff',fontWeight:'bold' }}>
                                <i className="nc-icon nc-notes"></i>
                                <p>PEDIDOS</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  exac to='/clientes' className="nav-link" activeStyle={{ color: 'gray',backgroundColor:'#fff',fontWeight:'bold' }}>
                                <i className="nc-icon nc-circle-09"></i>
                                <p>CLIENTES</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  exac to='/cadetes' className="nav-link" activeStyle={{ color: 'gray',backgroundColor:'#fff',fontWeight:'bold' }}>
                                <i className="nc-icon nc-badge"></i>
                                <p>CADETES</p>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  exac to='/reportes' className="nav-link" activeStyle={{ color: 'gray',backgroundColor:'#fff',fontWeight:'bold' }}>
                                <i className="nc-icon nc-bullet-list-67"></i>
                                <p>REPORTES</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ListModulos;