import React ,{Component} from 'react';
import ListModulo  from './ListModulo.js';
import ListClientes  from './ListClientes.js';
import NavBar from './NavBar.js';
import {Redirect} from 'react-router-dom';

class Clientes extends Component{

    constructor(props){
        super(props);
        this.state={
            redirectLogin : false
        }
    }

    componentDidMount(){
        if(!sessionStorage.getItem('apitoken')){
            this.setState({redirectLogin:true});
            alert("Hola, Debes iniciar session");
        }
    }

    render(){

        if(this.state.redirectLogin){
            return <Redirect to={'/login'}/>
        }

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