/* eslint-disable jsx-a11y/alt-text */
import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import Button from 'antd/es/button';
import Lottie            from 'react-lottie';

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            redirectDashboard:false,
            username : '',
            password: '',
            showMensajeUsuario:false,
            loading:false,
            mensajeUsuario:''
        }
    }

    handleChange(e){
        this.setState({
            showMensajeUsuario : false,
            mensajeUsuario:''
        })
        this.setState({[e.target.name]:e.target.value});
    }

    onLogin(){
        this.setState({
            loading:true
        });
        if(this.state.username === ""){
            this.setState({
                loading:false,
                showMensajeUsuario:true,
                mensajeUsuario:'Debes ingresar el username'
            })
        }else if(this.state.password === ""){
            this.setState({
                loading:false,
                showMensajeUsuario:true,
                mensajeUsuario:'Debes ingresar el password'
            })
        }else{
            fetch("https://b1bb3698.ngrok.io/users/login",{
                method:"POST",
                headers:{
                    "Accept" : "application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username:this.state.username,
                    password:this.state.password
                }),
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                if(responseJson.status === 0){
                    this.setState({
                        loading:false,
                        showMensajeUsuario:true,
                        mensajeUsuario:'Usuario o password son invalidos,Intente nuevamente'
                    })
                }else{
                    //data user
                    const iduser    = responseJson.id;
                    const name      = responseJson.name;
                    const username  = responseJson.username;
                    const api_token = responseJson.api_token;
                    const rol_user  = responseJson.role.role;

                    //created sessionStorage
                    sessionStorage.setItem('iduser',iduser);
                    sessionStorage.setItem('username',username);
                    sessionStorage.setItem('apitoken',api_token);
                    sessionStorage.setItem('roluser',rol_user);

                    this.setState({
                        redirectDashboard:true
                    })
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }



    

    render(){
        const defaultLoading = {
            loop: true,
            autoplay: true,
            animationData: require('../lottie/loading_rainbow.json'),
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
        }

        if(this.state.redirectDashboard){
            return <Redirect to={'/dashboard'}/>
        }

        return(
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="wrapper">
                        <form className="form-signin"  style={{marginTop:120,borderWidth: 1,borderColor: '#000'}}>       
                            <center>
                                <h1>DATA</h1>
                            </center>
                            <input type="text"  className="form-control" name="username" placeholder="Usuario.." value={this.state.username}  
                                onChange={this.handleChange.bind(this)} style={{marginBottom:20 ,  height:50 , borderRadius:100}}/>
                            <input type="password"  className="form-control" name="password" placeholder="Password.." value={this.state.password} onChange={this.handleChange.bind(this)} style={{marginTop:10, borderRadius:100, height:50}}/> 
                            {this.state.showMensajeUsuario &&
                                <div className="alert alert-danger" role="alert" style={{marginTop:20}}> 
                                    <strong>MENSAJE</strong> {this.state.mensajeUsuario}
                                </div>   
                            }
                            {
                                this.state.loading &&
                                    <center><Lottie options={defaultLoading} height={70} width={'20%'} /></center>
                            }  
                             
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