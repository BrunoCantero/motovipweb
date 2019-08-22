import React,{Component} from 'react';
import ListModulo from './ListModulo.js';
import ListPedidos from './ListPedidos.js';
import NavBar from './NavBar.js';
import {Redirect} from 'react-router-dom';


class Dashboard extends Component{

    constructor(props){
        super(props);
        this.state={
            redirectLogin:false
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
                    <ListPedidos/>
                </div>
            </div>
        )
    }
}


export default  Dashboard;