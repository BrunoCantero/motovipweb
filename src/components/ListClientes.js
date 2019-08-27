import React,{Component} from 'react';
import { Modal,Button}   from 'react-bootstrap';
import Lottie            from 'react-lottie';

class ListClientes extends Component{

    constructor(props){
        super(props);
        this.hiddenModalCliente      = this.hiddenModalCliente.bind(this);
        this.verDetalleCliente       = this.verDetalleCliente.bind(this);
        this.hiddenModalNuevoCliente = this.hiddenModalNuevoCliente.bind(this);
        const apitoken               = sessionStorage['apitoken'];
        this.state={
            showModalCliente:false,
            showModalNuevoCliente:false,
            loadingGuardarCliente : false,
            showFormNuevoCliente : true,
            apiToken :apitoken,
            nameCliente : '',
            addressCliente : '',
            phoneNumberCliente : '',
            descriptionCliente : '',
            listadoClientes : [],
            listadoClientesBuscados:[],
            buscarCliente:''
        }
    }


    verDetalleCliente(){
        this.setState({
            showModalCliente:true
        })
    }

    hiddenModalCliente(){
        this.setState({
            showModalCliente:false
        })
    }

    hiddenModalNuevoCliente(){
        this.setState({
            showModalNuevoCliente:false
        })
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    getClientes(){
        this.setState({
            loading:true,
            showListadoClientes:false
        })
        fetch('https://b1bb3698.ngrok.io/clientes',{
            method:'GET',
            headers:{
                "Content-Type":"application/json; charset=utf-8",
                "api_token":this.state.apiToken
            }
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                listadoClientes: data,
                listadoClientesBuscados:data,
                loading:false,
                showListadoClientes:true
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    eliminarCliente(){
        alert("Hola")
    }

    guardarNuevoCliente(){  
        this.setState({
            showLoadingClienteNuevo:true,
            showFormNuevoCliente:false
        })
        fetch('https://b1bb3698.ngrok.io/clientes',{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "api_token":this.state.apiToken
            },
            body:JSON.stringify({
                name          : this.state.nameCliente,
                adress        : this.state.addressCliente,
                phone_number  : this.state.phoneNumberCliente,
                description   :this.state.descriptionCliente
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.sleep(4000).then(() => {
                // Do something after the sleep!
                this.setState({
                    showLoadingClienteNuevo:false,
                    showFormNuevoCliente:false
                })
                this.getClientes();
                this.hiddenModalNuevoCliente();
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    modalNuevoCliente(){
        this.setState({
            showModalNuevoCliente:true,
            showLoadingClienteNuevo:false,
            showFormNuevoCliente:true,
            nameCliente:'',
            addressCliente:'',
            phoneNumberCliente:'',
            descriptionCliente:''
        })
    }

    getClientesSearch(){
        const newData = this.state.listadoClientesBuscados.filter((item)=>{
            const itemData = item.name.toUpperCase();
            const textData = this.state.buscarCliente.toUpperCase();
            return itemData.indexOf(textData)>-1;
        });

        this.setState({
            listadoClientes:newData
        })
    }

    

    componentDidMount(){
        this.getClientes();
    }

    render(){

        const defaultLoading = {
            loop: true,
            autoplay: true,
            animationData: require('../lottie/1918-loading-and-done.json'),
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
        }

        const loading = {
            loop: true,
            autoplay: true,
            animationData: require('../lottie/loading_rainbow.json'),
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice',
            },
        }
        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="row">  
                        <div class="col-md-8">
                            <div class="card">
                                <div class="col-md-12 pr-1">
                                    <div class="form-group">
                                        <label>Buscar cliente</label>
                                        <input type="text" class="form-control" name="buscarCliente" placeholder="Apellido.."
                                        onKeyPress={event=>{
                                            this.getClientesSearch()
                                            if(this.state.buscarCliente.length === 0 || this.state.buscarCliente.length<2){
                                                this.setState({
                                                    listadoClientes:this.state.listadoClientesBuscados
                                                })
                                            }
                                            
                                        }}
                                        value={this.state.buscarCliente}
                                        onChange={this.handleChange.bind(this)}
                                        
                                        />
                                    </div>
                                </div>    
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="col-md-12 pr-1">
                                    <div class="form-group">
                                        <label>Alta cliente</label><br/>
                                        <Button variant="btn btn-success"  onClick={()=>this.modalNuevoCliente()}> Nuevo cliente</Button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div class="card strpied-tabled-with-hover">
                                {
                                    this.state.loading &&
                                    <center><center><Lottie options={loading} height={70} width={'10%'} /></center></center>
                                }
                                {this.state.showListadoClientes &&
                                    <div class="card-body table-full-width table-responsive" id="printablediv">
                                        <table  className="table table-hover table-striped" >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Cliente</th>
                                                    <th>Alta</th>
                                                    <th>Direccion</th>
                                                    <th>Telefono</th>
                                                    <th>Detalle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.listadoClientes.map((clientes,item)=>
                                                    <tr key={item+1}>
                                                        <td>{item+1}</td>
                                                        <td><strong>{clientes.name}</strong></td>
                                                        <td>{clientes.created_at}</td>
                                                        <td>{clientes.adress}</td>
                                                        <td>{clientes.phone_number}</td>
                                                        <td><center><Button bsStyle="primary" onClick={()=>this.verDetalleCliente()}> VER</Button></center></td>
                                                    </tr>
                                                )}
                                            </tbody>        
                                        </table>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <Modal  show={this.state.showModalCliente} style={{marginTop:-210}} size="lg" onHide={this.hiddenModalCliente} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong>Cliente Motovip</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <center>
                            <img class="avatar border-gray" style={{height:50}} src="https://randomuser.me/api/portraits/women/87.jpg" alt="..."/>
                        </center>
                        <center>
                            <h4 style={{marginTop:-4}}>Nombre cliente</h4>
                        </center>
                        <div className="card"> 
                            <div className="card-body">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6 pr-1">
                                            <div class="form-group">
                                                <label>Apellido</label>
                                                <input type="text" class="form-control" placeholder="Company" value="Mike"/>
                                            </div>
                                        </div>
                                        <div class="col-md-6 pl-1">
                                            <div class="form-group">
                                                <label>Nombre</label>
                                                <input type="text" class="form-control" placeholder="Last Name" value="Andrew"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 pr-1">
                                            <div class="form-group">
                                                <label>Barrio</label>
                                                <select className="form-control">
                                                    <option value="1">La colonia</option>
                                                    <option value="2">Villa del rosario</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-6 pl-1">
                                            <div class="form-group">
                                                <label>Direccion</label>
                                                <input type="text" class="form-control" placeholder="Last Name" value="Ayacucho 4445"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Observaciones</label>
                                                <textarea class="form-control"  style={{height:100}} placeholder="..">
                                                </textarea>    
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>                      
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>this.hiddenModalCliente()} variant="secondary" style={{marginTop:10}}>Salir</Button>
                        <Button onClick={()=>this.eliminarCliente()} variant="btn btn-danger" style={{marginTop:10}}>Eliminar clisente</Button>
                        <Button onClick={()=>this.imprimirPedido()} variant="btn btn-success" style={{marginTop:10}}>Guardar</Button>
                    </Modal.Footer>
                </Modal>   
                <Modal  show={this.state.showModalNuevoCliente} style={{marginTop:-210}} size="lg" onHide={this.hiddenModalNuevoCliente} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong>Nuevo cliente</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <center>
                            <img class="avatar border-gray" style={{height:80,borderRadius:40}} src="http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png" alt="..."/>
                        </center>
                        <center>
                            <h4 style={{marginTop:-2,color:'gray'}}></h4>
                        </center>
                        <div className="card">
                            {
                                this.state.showLoadingClienteNuevo &&    
                                <div>
                                    <center><Lottie options={defaultLoading} height={150} width={'15%'} /></center>
                                    <center><h4 style={{color:'black'}}>Guardando..</h4></center>
                                </div> 
                            }
                            {this.state.showFormNuevoCliente &&
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Nombre completo</label>
                                                    <input type="text" name="nameCliente"  class="form-control" placeholder=".." onChange={this.handleChange.bind(this)} value={this.state.nameCliente}/>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pl-1">
                                                <div class="form-group">
                                                    <label>Telefono</label>
                                                    <input type="text" name="phoneNumberCliente" class="form-control" placeholder="Telefono.." onChange={this.handleChange.bind(this)} value={this.state.phoneNumberCliente}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Barrio</label>
                                                    <select className="form-control">
                                                        <option value="1">La colonia</option>
                                                        <option value="2">Villa del rosario</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pl-1">
                                                <div class="form-group">
                                                    <label>Direccion</label>
                                                    <input type="text" name="addressCliente" class="form-control" placeholder="Direccion.." onChange={this.handleChange.bind(this)} value={this.state.addressCliente}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Observaciones</label>
                                                    <textarea class="form-control" name="descriptionCliente" onChange={this.handleChange.bind(this)}  style={{height:100}} placeholder="..">
                                                        {this.state.descriptionCliente}
                                                    </textarea>    
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>   
                            }                   
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>this.hiddenModalNuevoCliente()} variant="secondary"       style={{marginTop:10}}>Salir</Button>
                        <Button onClick={()=>this.guardarNuevoCliente()}     variant="btn btn-success" style={{marginTop:10}}>Guardar cliente</Button>
                    </Modal.Footer>
                </Modal>       
            </div>
        )
    }
}


export default ListClientes;