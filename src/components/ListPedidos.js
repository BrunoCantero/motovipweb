/* eslint-disable no-useless-constructor */
import React ,{Component} from 'react';
import { Modal,Button}   from 'react-bootstrap';
import Calendar from 'react-calendar';
import moment             from 'moment';
import TimeKeeper         from 'react-timekeeper';
import { thisExpression } from '@babel/types';

moment.locale('es');

class ListPedidos extends Component{

    constructor(props){
        super(props);
        this.hiddenModalNuevoPedido = this.hiddenModalNuevoPedido.bind(this);
        this.timeChangeInicio = this.timeChangeInicio.bind(this);
        const apitoken = sessionStorage['apitoken'];
        this.state={
            showModalNuevoPedido:false,
            showFecha : false,
            date: new Date(),
            fechaSeleccionada:'',
            timeEntregaInicio:'',
            apiToken : apitoken,
            showHoraInicio:false,
            listadoCadetes:[],
            clienteName:'',
            startTimePedido:'',
            arrivalTimePedido:'',
            endTimePedido:'',
            addressPedido:'',
            amountPedido : '',
            orderFeeMotovip: 0,
            orderFeeCadete:0,
            orderDescription:'',
            usuarioId:0,
            cadeteId:0,
            clientePedidoId:0
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
        this.getHorarioEntregaPedido();
    }

    mostrarCalendario(){
        this.setState({
            showFecha : !this.state.showFecha
        })
    }

    getCadetes(){
        fetch('http://localhost:8000/cadetes',{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'api_token': this.state.apiToken
            }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                listadoCadetes:responseJson
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    getClienteDefault(){
        fetch('http://localhost:8000/clientes/1',{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'api_token': this.state.apiToken
            }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                clienteName:responseJson.name,
                clientePedidoId: responseJson.id
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    onChangeFechaSeleccionada (date){
        var fecha_seleccionada = moment(date).format('YYYY-MM-DD');
        this.setState({ fechaSeleccionada:fecha_seleccionada,showFecha:false })
    }

    getHorarioEntregaPedido(){
        this.setState({
            timeEntregaInicio :moment().format("HH:mm")
        })
        
    }


    timeChangeInicio(newTime){
        this.setState({
           timeEntregaInicio : newTime.formatted24 
        }) 
    }

    showHorario(opcion){
        if(opcion ===1){
            this.setState({
                showHoraInicio :!this.state.showHoraInicio,
            })
        }
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }


    componentDidMount(){
        this.getCadetes();
        this.getClienteDefault();
    }
   
    
    render(){
        return(
           <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div class="form-group" style={{marginBottom:10}}>
                                <input type="text" class="form-control" name="fecha" onClick={()=>this.mostrarCalendario()} value={this.state.fechaSeleccionada} placeholder="Fecha.." style={{width:180}} />
                                {this.state.showFecha &&
                                    <Calendar
                                        onChange={this.onChangeFechaSeleccionada.bind(this)}
                                        value={this.state.date}
                                    />
                                } 
                            </div>   
                        </div>
                        <div className="col-md-2">
                            <div class="form-group">
                                <input type="text" class="form-control" name="fecha"   placeholder="Clientes.." style={{width:160}} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <select class="form-control" name="fecha" style={{width:160,marginLeft:10}}>
                                    <option>Elegir</option>
                                </select>
                                
                            </div>
                        </div> 
                        <div className="col-md-3">
                        <Button variant="btn btn-info" style={{float:'right'}} onClick={()=>this.modalNuevoPedido()}> Nuevo pedido</Button>
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
                                                <th>Fin</th>
                                                <th>Total_compra</th>
                                                <th>Comision_cadete</th>
                                                <th>Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Cliente Daasaddsds</td>
                                                <td>Direccion asdsads s4 55454</td>
                                                <td>Terminado</td>
                                                <td>Gonzalez Carlos</td>
                                                <td>18:30:45</td>
                                                <td>18:45:45</td>
                                                <td><center>$455</center></td>
                                                <td><center>$445</center></td>
                                                <td><center><Button bsStyle="primary"> VER</Button></center></td>
                                            </tr>
                                        </tbody>        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal  show={this.state.showModalNuevoPedido} style={{marginTop:-150}}  size="lg" onHide={this.hiddenModalNuevoPedido} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong>Nuevo pedido</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6 pr-1">
                                        <div class="form-group">
                                            <label>Cliente</label>
                                            <input type="text" name="clienteName"  class="form-control" placeholder="Nombre cliente" onChange={this.handleChange.bind(this)} value={this.state.clienteName}/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 pl-1">
                                        <div class="form-group">
                                            <label>Direccion</label>
                                            <input type="number" name="addressPedido" class="form-control" placeholder="Direccion.." onChange={this.handleChange.bind(this)} value={this.state.addressPedido}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pr-1">
                                        <div class="form-group">
                                            <label>Cadete</label>
                                            <select className="form-control">
                                                <option value="0">Elegir</option>
                                                {this.state.listadoCadetes.map((cadetes,item)=>
                                                    <option key={item+1} value={cadetes.id}>{cadetes.name}</option>  
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 pl-1">
                                        <div class="form-group">
                                            <label>Hora inicio</label>
                                            <input type="text" name="timeEntregaInicio" class="form-control" placeholder="Hora.." value={this.state.timeEntregaInicio} onChange={this.handleChange.bind(this)} onClick={()=>this.showHorario(1)}/>
                                            {this.state.showHoraInicio &&
                                                <TimeKeeper
                                                    switchToMinuteOnHourSelect={true}
                                                    time={this.state.timeEntregaInicio}
                                                    onChange={this.timeChangeInicio}
                                                />
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 pr-1">
                                        <div class="form-group">
                                            <label>Total compra</label>
                                            <input type="number" name="nameCliente"  class="form-control" placeholder="Monto total" onChange={this.handleChange.bind(this)} value={this.state.nameCliente}/>
                                        </div>
                                    </div>
                                    <div class="col-md-6 pl-1">
                                        <div class="form-group">
                                            <label>Descripcion compra</label>
                                            <input type="text" name="phoneNumberCliente" class="form-control" placeholder="Descripcion compra.." onChange={this.handleChange.bind(this)} value={this.state.phoneNumberCliente}/>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=>this.hiddenModalNuevoPedido()} variant="secondary" style={{marginTop:10}}>Salir</Button>
                        <Button onClick={()=>this.guardarCompra()} variant="btn btn-success" style={{marginTop:10}}>Guardar pedido</Button>
                    </Modal.Footer>
                </Modal>  
            </div>
                
        )
    }
}

export default ListPedidos;