import React,{Component} from 'react';
import { Modal,Button}   from 'react-bootstrap';

class ListClientes extends Component{

    constructor(props){
        super(props);
        this.hiddenModalCliente = this.hiddenModalCliente.bind(this);
        this.verDetalleCliente  = this.verDetalleCliente.bind(this);
        this.state={
            showModalCliente:false
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

    render(){
        //destructured props and states
        const { showModalCliente } = this.state;

        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div class="card strpied-tabled-with-hover">
                                <div class="card-body table-full-width table-responsive" id="printablediv">
                                    <table  className="table table-hover table-striped" >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Cliente</th>
                                                <th>Barrio</th>
                                                <th>Direccion</th>
                                                <th>Alta</th>
                                                <th>Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><strong>Alexis quiñonez</strong></td>
                                                <td>Villa del rosario</td>
                                                <td>Ayacucho 4445</td>
                                                <td>19/07/2019 18:30hs</td>
                                                <td><center><Button bsStyle="primary" onClick={()=>this.verDetalleCliente()}> VER</Button></center></td>
                                            </tr> 
                                        </tbody>        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal  show={showModalCliente} style={{marginTop:-120}} size="lg" onHide={this.hiddenModalCliente} >
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
                        <Button onClick={()=>this.imprimirPedido()} variant="btn btn-success" style={{marginTop:10}}>Guardar</Button>
                    </Modal.Footer>
                </Modal>         
            </div>
        )
    }
}


export default ListClientes;