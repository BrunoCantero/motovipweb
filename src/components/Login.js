import React,{Component} from 'react';


class Login extends Component{

    render(){
        return(
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="wrapper">
                        <form className="form-signin"  style={{marginTop:140,borderWidth: 1,borderColor: '#000'}}>       
                            
                            <input type="text" className="form-control" name="username" placeholder="Usuario.."/>
                            <input type="password" className="form-control" name="password" placeholder="Password.."  value=""  style={{marginTop:10}}/>  
                            <button className="btn btn-lg btn-danger btn-block" onClick={()=>this.onLogin()} type="button" style={{marginTop:30}}>Ingresar</button>   
                        </form>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        )
    }
}


export default  Login;