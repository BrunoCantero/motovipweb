/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{Component} from 'react';
import {Redirect}        from 'react-router-dom';

class NavBar extends Component{

    constructor(props){
        super(props);
        this.state={
            redirectLogin : false,
        }

    }

    onLogout(){
        this.setState({redirectLogin:true});
    }


    render(){
        if(this.state.redirectLogin){
            return (<Redirect to={'/login'}/>);
        }

        return(
            <nav className="navbar navbar-expand-lg " color-on-scroll="500">
                <div className="container-fluid">
                    <button href="" className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar burger-lines"></span>
                        <span className="navbar-toggler-bar burger-lines"></span>
                        <span className="navbar-toggler-bar burger-lines"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul className="nav navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="dropdown">
                                    <i className="nc-icon nc-palette"></i>
                                    <span className="d-lg-none">Dashboard</span>
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" style={{cursor: 'pointer'}}onClick={()=>this.onLogout()}>
                                    <span className="no-icon">SALIR</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}


export default NavBar;