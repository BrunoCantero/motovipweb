/* eslint-disable no-useless-constructor */
import React ,{Component} from 'react';
import { Modal,Button}   from 'react-bootstrap';
import Calendar from 'react-calendar';
import moment             from 'moment';

moment.locale('es');

class ListPedidos extends Component{

    constructor(props){
        super(props);
        this.hiddenModalNuevoPedido = this.hiddenModalNuevoPedido.bind(this);
        this.state={
            showModalNuevoPedido:false,
            showFecha : false,
            date: new Date(),
            fechaSeleccionada:''
        }
    }


    hiddenModalNuevoPedido(){
        this.setState({
            showModalNuevoPedido:false
        })
    }

    modalNuevoPedido(){
        this.setState({
            showModalNuevoPedido:true
        })
    }

    mostrarCalendario(){
        alert("aasd")
        this.setState({
            showFecha : !this.state.showFecha
        })
    }

    onChangeFechaSeleccionada (date){
        var fecha_seleccionada = moment(date).format('YYYY-MM-DD');
        this.setState({ fechaSeleccionada:fecha_seleccionada,showFecha:false })
    }

   
    
    render(){
        return(
           <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div class="form-group" style={{marginBottom:10}}>
                                <input type="text" class="form-control" name="fecha" onClick={()=>this.mostrarCalendario()} value={this.state.fechaSeleccionada} placeholder="Fecha.." style={{width:280}} />
                                {this.state.showFecha &&
                                    <Calendar
                                        onChange={this.onChangeFechaSeleccionada.bind(this)}
                                        value={this.state.date}
                                    />
                                } 
                            </div>   
                            
                        </div>
                        <div className="col-md-4">
                            <div class="form-group">
                                <input type="text" class="form-control" name="fecha"   placeholder="Clientes.." style={{width:280}} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <select class="form-control" name="fecha" style={{float:'left',width:260}}>
                                    <option>Elegir</option>
                                </select>
                                <Button variant="btn btn-info" style={{float:'right'}} onClick={()=>this.modalNuevoPedido()}> Nuevo pedido</Button>
                            </div>
                        </div>    
                        <div className="col-md-12">
                            <div class="card strpied-tabled-with-hover">
                                <div class="card-body table-full-width table-responsive" id="printablediv">
                                    <table  className="table table-hover table-striped" >
                                        <thead>
                                            <tr>
                                                <th>Cliente</th>
                                                <th>Direccion</th>
                                                <th>Estado</th>
                                                <th>Cadete</th>
                                                <th>Inicio</th>
                                                <th>Llegada</th>
                                                <th>Fin</th>
                                                <th>Total_compra</th>
                                                <th>Comision_empresa</th>
                                                <th>Comision_cadete</th>
                                                <th>Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Cliente Daasaddsds</td>
                                                <td>Direccion</td>
                                                <td>Estado</td>
                                                <td>Cadete</td>
                                                <td>Inicio</td>
                                                <td>Llegada</td>
                                                <td>Fin</td>
                                                <td>Total_compra</td>
                                                <td>$445</td>
                                                <td>$44545445</td>
                                                <td><center><Button bsStyle="primary"> VER</Button></center></td>
                                            </tr>
                                        </tbody>        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal  show={this.state.showModalNuevoPedido}  size="lg" onHide={this.hiddenModalNuevoPedido} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong>Nuevo pedido</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        sadsdadasd
                    </Modal.Body>
                </Modal>  
            </div>
                
        )
    }
}

export default ListPedidos;