import React,{Component} from 'react';
import { Modal,Button}   from 'react-bootstrap';
import Lottie            from 'react-lottie';

class ListCadetes extends Component{

    constructor(props){
        super(props);
        this.hiddenModalCadete      = this.hiddenModalCadete.bind(this);
        this.verDetalleCadete       = this.verDetalleCadete.bind(this);
        this.hiddenModalNuevoCadete = this.hiddenModalNuevoCadete.bind(this);
        this.hiddenElminarCadete    = this.hiddenElminarCadete.bind(this);
        const apitoken               = sessionStorage['apitoken'];
        this.state={
            showModalCadete:false,
            showModalNuevoCadete:false,
            loadingGuardarCadete : false,
            showElminarUsuario:false,
            showFormNuevoCadete : true,
            showLoadingDelete:false,
            descriptionDeleteCadete :true,
            apiToken :apitoken,
            idCadete  : '',
            nameCadete : '',
            addressCadete : '',
            phoneNumberCadete : '',
            descriptionCadete : '',
            patenteCadete : '',
            dniCadete : '',
            listadoCadetes : [],
            listadoCadetesBuscados:[],
            buscarCadete:''
        }
    }


    verDetalleCadete(idcadete,name,adress,phone,description,patente,dni){
        this.setState({
            showModalCadete:true,
            showFormUpdateCadete:true,
            showLoadingCadeteUpdate:false,
            idCadete:idcadete,
            nameCadete:name,
            addressCadete:adress,
            phoneNumberCadete:phone,
            descriptionCadete:description,
            patenteCadete:patente,
            dniCadete:dni
        })
    }

    hiddenModalCadete(){
        this.setState({
            showModalCadete:false
        })
    }

    hiddenModalNuevoCadete(){
        this.setState({
            showModalNuevoCadete:false
        })
    }

    hiddenElminarCadete(){
        this.setState({
            showElminarUsuario:false
        })
    }

    getCadetes(){
        this.setState({
            loading:true,
            showListadoCadetes:false
        })
        fetch('http://localhost:8000/cadetes',{
            method:'GET',
            headers:{
                "Content-Type":"application/json; charset=utf-8",
                "api_token":this.state.apiToken
            }
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                listadoCadetes: data,
                listadoCadetesBuscados:data,
                loading:false,
                showListadoCadetes:true
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    eliminarCadete(){
        this.setState({
            showElminarUsuario:true,
            showLoadingDelete:false,
            descriptionDeleteCadete :true
        })
    }

    confirmarEliminarCadete(){
        if(this.state.idCadete !=''){
            this.setState({
                showLoadingDelete:true,
                descriptionDeleteCadete:false
            })
            fetch('http://localhost:8000/cadetes',{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'api_token':this.state.apiToken
                },
                body:JSON.stringify({
                    id : this.state.idCadete
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                this.sleep(4000).then(() => {
                    // Do something after the sleep!
                    this.getCadetes();
                    this.hiddenElminarCadete();
                    this.hiddenModalCadete();
                })
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    guardarNuevoCadete(){  
        //alert(this.state.nameCadete+" "+this.state.dniCadete+" "+this.state.addressCadete+" "+this.state.phoneNumberCadete+" "+this.state.descriptionCadete);
        if(this.state.nameCadete === ''){
            alert("DEBES COMPLETAR EL NOMBRE DEL CADETE");
        }else{
            this.setState({
                showLoadingCadeteNuevo:true,
                showFormNuevoCadete:false
            });
            fetch('http://localhost:8000/cadetes',{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "api_token":this.state.apiToken
                },
                body:JSON.stringify({
                    name           : this.state.nameCadete,
                    profile        : "user.jpg",
                    dni            : this.state.dniCadete,
                    vehicle_patent : this.state.patenteCadete,
                    adress         : this.state.addressCadete,
                    phone_number   : this.state.phoneNumberCadete,
                    description    : this.state.descriptionCadete
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                this.sleep(3000).then(() => {
                    // Do something after the sleep!
                    this.setState({
                        showLoadingCadeteNuevo:false,
                        showFormNuevoCadete:false
                    })
                    this.getCadetes();
                    this.hiddenModalNuevoCadete();
                })
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }


    updateCadete(){  
        if(this.state.nameCadete === ''){
            alert("DEBES COMPLETAR EL NOMBRE DEL CADETE");
        }else{
            this.setState({
                showLoadingCadeteUpdate:true,
                showFormUpdateCadete:false
            });
            fetch('http://localhost:8000/cadetes/'+this.state.idCadete,{
                method:"PUT",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "api_token":this.state.apiToken
                },
                body:JSON.stringify({
                    name           : this.state.nameCadete,
                    profile        : "user.jpg",
                    dni            : this.state.dniCadete,
                    vehicle_patent : this.state.patenteCadete,
                    adress         : this.state.addressCadete,
                    phone_number   : this.state.phoneNumberCadete,
                    description    : this.state.descriptionCadete
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                //console.log(responseJson);
                this.sleep(3000).then(() => {
                    // Do something after the sleep!
                    this.setState({
                        showLoadingCadeteUpdate:false,
                        showFormUpdateCadete:false
                    })
                    this.getCadetes();
                    this.hiddenModalCadete();
                })
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }


    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }


    modalNuevoCliente(){
        this.setState({
            showModalNuevoCadete:true,
            showLoadingCadeteNuevo:false,
            showFormNuevoCadete:true,
            nameCadete:'',
            addressCadete:'',
            phoneNumberCadete:'',
            descriptionCadete:'',
            dniCadete:'',
            patenteCadete:''
        })
    }

    getCadetesSearch(){
        const newData = this.state.listadoCadetesBuscados.filter((item)=>{
            const itemData = item.name.toUpperCase();
            const textData = this.state.buscarCadete.toUpperCase();
            return itemData.indexOf(textData)>-1;
        });

        this.setState({
            listadoCadetes:newData
        })
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    componentDidMount(){
        this.getCadetes();
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


        const deleteLoading = {
            loop: true,
            autoplay: true,
            animationData: require('../lottie/4779-delay-delete.json'),
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
                                        <label>Buscar cadetes</label>
                                        <input type="text" class="form-control" name="buscarCadete" placeholder="Apellido.."
                                        onKeyPress={event=>{
                                            this.getCadetesSearch()
                                            if(this.state.buscarCadete.length === 0 || this.state.buscarCadete.length<2){
                                                this.setState({
                                                    listadoClientes:this.state.listadoClientesBuscados
                                                })
                                            }
                                            
                                        }}
                                        value={this.state.buscarCadete}
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
                                        <label>Alta dsa</label><br/>
                                        <Button variant="btn btn-success"  onClick={()=>this.modalNuevoCliente()}> Nuevo sada</Button>
                                    </div>
                                </div>   
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div class="card strpied-tabled-with-hover">
                                {
                                    this.state.loading &&
                                    <center><center><Lottie options={loading} height={120} width={'9%'} /></center></center>
                                }
                                {this.state.showListadoCadetes &&
                                    <div class="card-body table-full-width table-responsive" id="printablediv">
                                        <table  className="table table-hover table-striped" >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Cadete</th>
                                                    <th>Patente</th>
                                                    <th>Direccion</th>
                                                    <th>Telefono</th>
                                                    <th>Detalle</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.listadoCadetes.map((cadetes,item)=>
                                                    <tr key={item+1}>
                                                        <td>{item+1}</td>
                                                        <td><strong>{cadetes.name.toUpperCase()}</strong></td>
                                                        <td>{cadetes.vehicle_patent}</td>
                                                        <td>{cadetes.adress}</td>
                                                        <td>{cadetes.phone_number}</td>
                                                        <td><center><Button bsStyle="primary" onClick={()=>this.verDetalleCadete(cadetes.id,cadetes.name,cadetes.adress,cadetes.phone_number,cadetes.description,cadetes.vehicle_patent,cadetes.dni)}> VER</Button></center></td>
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

                <Modal  show={this.state.showModalCadete} style={{marginTop:-210}} size="lg" onHide={this.hiddenModalCadete} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong>Mosdo s</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <center>
                            <img class="avatar border-gray" style={{height:80,borderRadius:40}} src="http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png" alt="..."/>
                        </center>
                        <center>
                            <h4 style={{marginTop:-4}}>{this.state.nameCadete}</h4>
                        </center>
                        <div className="card"> 
                            {this.state.showLoadingCadeteUpdate &&    
                                <div>
                                    <center><Lottie options={defaultLoading} height={150} width={'15%'} /></center>
                                    <center><h4 style={{color:'black'}}>Actualizando..</h4></center>
                                </div> 
                            }
                            {this.state.showFormUpdateCadete &&    
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Nombre completo</label>
                                                    <input type="text" name="nameCadete"  class="form-control" placeholder=".." onChange={this.handleChange.bind(this)} value={this.state.nameCadete}/>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pl-1">
                                                <div class="form-group">
                                                    <label>DNI</label>
                                                    <input type="text" name="dniCadete" class="form-control" placeholder="Dni.." onChange={this.handleChange.bind(this)} value={this.state.dniCadete}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Patente</label>
                                                    <input type="text" name="patenteCadete" class="form-control" placeholder="Patente moto.." onChange={this.handleChange.bind(this)} value={this.state.patenteCadete}/>
                                                </div>
                                                <div class="form-group">
                                                    <label>Direccion</label>
                                                    <input type="text" name="addressCadete" class="form-control" placeholder="Direccion.." onChange={this.handleChange.bind(this)} value={this.state.addressCadete}/>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pl-1">
                                                <div class="form-group">
                                                    <label>Telefono</label>
                                                    <input type="text" name="phoneNumberCadete" class="form-control" placeholder="Telefono.." onChange={this.handleChange.bind(this)} value={this.state.phoneNumberCadete}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Observaciones</label>
                                                    <textarea class="form-control" name="descriptionCadete" onChange={this.handleChange.bind(this)}  style={{height:100}} placeholder="..">
                                                        {this.state.descriptionCadete}
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
                        <Button onClick={()=>this.hiddenModalCadete()} variant="secondary" style={{marginTop:10}}>Salir</Button>
                        <Button onClick={()=>this.eliminarCadete()} variant="btn btn-danger" style={{marginTop:10}}>Eliminar cadete</Button>
                        <Button onClick={()=>this.updateCadete()} variant="btn btn-success" style={{marginTop:10}}>Guardar</Button>
                    </Modal.Footer>
                </Modal>   
                <Modal  show={this.state.showModalNuevoCadete} style={{marginTop:-210}} size="lg" onHide={this.hiddenModalNuevoCadete} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong>Nuevo </strong>
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
                                this.state.showLoadingCadeteNuevo &&    
                                <div>
                                    <center><Lottie options={defaultLoading} height={150} width={'15%'} /></center>
                                    <center><h4 style={{color:'black'}}>Guardando..</h4></center>
                                </div> 
                            }
                            {this.state.showFormNuevoCadete &&
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Nombre completo</label>
                                                    <input type="text" name="nameCadete"  class="form-control" placeholder=".." onChange={this.handleChange.bind(this)} value={this.state.nameCadete}/>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pl-1">
                                                <div class="form-group">
                                                    <label>DNI</label>
                                                    <input type="text" name="dniCadete" class="form-control" placeholder="Dni.." onChange={this.handleChange.bind(this)} value={this.state.dniCadete}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 pr-1">
                                                <div class="form-group">
                                                    <label>Patente</label>
                                                    <input type="text" name="patenteCadete" class="form-control" placeholder="Patente moto.." onChange={this.handleChange.bind(this)} value={this.state.patenteCadete}/>
                                                </div>
                                                <div class="form-group">
                                                    <label>Direccion</label>
                                                    <input type="text" name="addressCadete" class="form-control" placeholder="Direccion.." onChange={this.handleChange.bind(this)} value={this.state.addressCadete}/>
                                                </div>
                                            </div>
                                            <div class="col-md-6 pl-1">
                                                <div class="form-group">
                                                    <label>Telefono</label>
                                                    <input type="text" name="phoneNumberCadete" class="form-control" placeholder="Telefono.." onChange={this.handleChange.bind(this)} value={this.state.phoneNumberCadete}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Observaciones</label>
                                                    <textarea class="form-control" name="descriptionCadete" onChange={this.handleChange.bind(this)}  style={{height:100}} placeholder="..">
                                                        {this.state.descriptionCadete}
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
                        <Button onClick={()=>this.hiddenModalNuevoCadete()} variant="secondary"       style={{marginTop:10}}>Salir</Button>
                        <Button onClick={()=>this.guardarNuevoCadete()}     variant="btn btn-success" style={{marginTop:10}}>Guardar cadete</Button>
                    </Modal.Footer>
                </Modal>  
                <Modal show={this.state.showElminarUsuario} onHide={this.hiddenElminarCadete}>
                    <Modal.Header closeButton>
                        <Modal.Title>¿Estas seguro que deseas eliminar al cadete?</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            {
                                this.state.descriptionDeleteCadete && 
                                <div>Se borrara todos los datos de <strong>{this.state.nameCadete}</strong> </div> 
                            }
                            
                            {
                                this.state.showLoadingDelete &&    
                                <div>
                                    <center><Lottie options={deleteLoading} height={109} width={'24%'} /></center>
                                    <center><h4 style={{color:'black'}}>Eliminando..</h4></center>
                                </div> 
                            }
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>this.hiddenElminarCadete()}>
                            Salir
                        </Button>
                        <Button variant="danger" onClick={()=>this.confirmarEliminarCadete()}>
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>     
            </div>
        )
    }
}


export default ListCadetes;