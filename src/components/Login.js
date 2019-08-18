/* eslint-disable jsx-a11y/alt-text */
import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import Button from 'antd/es/button';

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            redirectDashboard:false
        }
    }

    onLogin(){
        this.setState({
            redirectDashboard:true
        })
    }

    

    render(){
        if(this.state.redirectDashboard){
            return <Redirect to={'/dashboard'}/>
        }
        return(
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="wrapper">
                        <form className="form-signin"  style={{marginTop:140,borderWidth: 1,borderColor: '#000'}}>       
                            <center>
                                <img src={require('../styles/img/logo.jpg')} style={{width:210,height:210,marginBottom:50, borderRadius: 200,}}/>
                            </center>
                            <input type="text" style={{marginBottom:20 ,  height:50 , borderRadius:100}} className="form-control" name="username" placeholder="Usuario.." value="" />
                            <input type="password"  className="form-control" name="password" placeholder="Password.." value="" style={{marginTop:10, borderRadius:100, height:50}}/>   
                            <button className="btn btn-lg btn-info btn-block" onClick={()=>this.onLogin()} type="button" style={{marginTop:30 , borderRadius: 100}}>Ingresar</button>   
                        </form>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        )    
    }
}


export default  Login;