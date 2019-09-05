/* eslint-disable no-useless-constructor */
import React ,{Component} from 'react';
import { Modal,Button}   from 'react-bootstrap';
import Calendar from 'react-calendar';
import moment             from 'moment';
import TimeKeeper         from 'react-timekeeper';
import Lottie            from 'react-lottie';

moment.locale('es');

class ListPedidos extends Component{

    constructor(props){
        super(props);
        this.hiddenModalNuevoPedido = this.hiddenModalNuevoPedido.bind(this);
        this.timeChangeInicio = this.timeChangeInicio.bind(this);
        const apitoken = sessionStorage['apitoken'];
        const iduser   = sessionStorage['iduser'];
        this.state={
            showModalNuevoPedido:false,
            showFecha : false,
            date: new Date(),
            fechaSeleccionada:'',
            timeEntregaInicio:'',
            apiToken : apitoken,
            showHoraInicio:false,
            loading:false,
            showLoadingPedido:false,
            showFormPedidoNuevo:true,
            listadoCadetes:[],
            listadoPedidos:[],
            clienteName:'',
            startTimePedido:'',
            arrivalTimePedido:'',
            endTimePedido:'',
            addressPedido:'',
            amountPedido : 0,
            orderFeeMotovip: 0,
            orderFeeCadete:0,
            comisionCadete:0,
            comisionEmpresa:0,
            orderTitle: '',
            orderDescription:'',
            usuarioId:iduser,
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
            showModalNuevoPedido:true,
            showFormPedidoNuevo:true,
            showLoadingPedido:false
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

    getComisiones(){
        this.setState({
            comisionCadete:5,
            comisionEmpresa:3
        })
        /*fetch('http://localhost:8000/comisiones',{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'api_token': this.state.apiToken
            }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            
            //console.log(responseJson);
        })
        .catch((error)=>{
            console.log(error)
        })*/
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

    getPedidos(){
        this.setState({
            loading:true,
        })
        fetch('http://localhost:8000/pedidos',{
            method:'GET',
            headers:{
                'Content-type':'application/json',
                'api_token': this.state.apiToken
            }
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.setState({
                listadoPedidos:responseJson,
                loading:false
            })
        })
        .catch((error)=>{
            this.setState({
                loading:false,
            })
            console.log(error);
        })
    }

    sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
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

    cambiarCadete(event){
        let cadete_id = event.target.value;
        this.setState({
            cadeteId:cadete_id
        })
    }

    guardarCompra(){
        this.setState({
            showFormPedidoNuevo:false,
            showLoadingPedido:true
        })
        if(this.state.cadeteId === 0){
            alert("Debes seleccionar a un cadete");
            this.setState({
                showFormPedidoNuevo:true,
                showLoadingPedido:false
            })
        }
        else{
            
            fetch('http://localhost:8000/pedidos',{
                method:'POST',
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "api_token": this.state.apiToken
                },
                body:JSON.stringify({
                    'cliente_name':this.state.clienteName,
                    'start_time':this.state.timeEntregaInicio,
                    'arrival_time':'',
                    'end_time':'',
                    'adress':this.state.addressPedido,
                    'amount':this.state.amountPedido,
                    'order_fee_mv':this.state.orderFeeMotovip,
                    'order_fee_cadet':this.state.orderFeeCadete,
                    'order_title':this.state.orderTitle,
                    'order_description':this.state.orderDescription,
                    'user_id':this.state.usuarioId,
                    'cadete_id':this.state.cadeteId,
                    'cliente_id':this.state.clientePedidoId
                })
            })
            .then((response)=>response.json())
            .then((responseJson)=>{
                this.sleep(3000).then(() => {
                    // Do something after the sleep!
                    this.setState({
                        showFormPedidoNuevo:false,
                        showLoadingPedido:false
                    })
                    this.getPedidos();
                    this.hiddenModalNuevoPedido();
                })
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    calcularComisiones(){
        let comision_cadete = 10+5;
        let comision_empresa = 5+25;

        //alert(comision_cadete+" "+comision_empresa);
        this.setState({
            orderFeeCadete : comision_cadete,
            orderFeeMotovip :comision_empresa
        })
    }

    


    componentDidMount(){
        this.getCadetes();
        this.getPedidos();
        this.getClienteDefault();
        this.getComisiones();
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
                                {
                                    this.state.loading &&
                                        <div>
                                            <center>
                                                <Lottie options={loading} height={120} width={'9%'} />
                                            </center>
                                        </div>
                                }
                                <div class="card-body table-full-width table-responsive" id="printablediv">
                                    <table  className="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>Cliente</th>
                                                <th>Direccion</th>
                                                <th>Titulo</th>
                                                <th>Cadete</th>
                                                <th>Inicio</th>
                                                <th>Llegada</th>
                                                <th>Fin</th>
                                                <th><center>Total_compra</center></th>
                                                <th><center>Comision_cadete</center></th>
                                                <th>Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.listadoPedidos.map((pedidos,item)=>
                                                <tr key={item+1}>
                                                    <td><strong>{pedidos.cliente_name}</strong></td>
                                                    <td>{pedidos.adress.toLowerCase()}</td>
                                                    <td>{pedidos.order_title.toLowerCase()}</td>
                                                    <td>cadete</td>
                                                    <td>{pedidos.start_time}</td>
                                                    <td>
                                                        {pedidos.arrival_time === '' ?
                                                            <span>-</span>
                                                        :
                                                            <span>{pedidos.arrival_time}</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        {pedidos.end_time  === '' ?
                                                            <span>-</span>
                                                        :
                                                            <span>{pedidos.arrival_time}</span>
                                                        }
                                                    </td>
                                                    <td><center><strong style={{color:'green'}}>${pedidos.amount}</strong></center></td>
                                                    <td><center><strong style={{color:'red'}}>${pedidos.order_fee_cadet}</strong></center></td>
                                                    <td><center><Button bsStyle="primary"> VER</Button></center></td>
                                                </tr>
                                            )}
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
                            {
                                this.state.showLoadingPedido &&    
                                <div>
                                    <center><Lottie options={defaultLoading} height={150} width={'15%'} /></center>
                                    <center><h4 style={{color:'black'}}>Guardando..</h4></center>
                                </div> 
                            }
                            {
                                this.state.showFormPedidoNuevo &&
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
                                                <input type="text" name="addressPedido" class="form-control" placeholder="Direccion.." onChange={this.handleChange.bind(this)} value={this.state.addressPedido}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 pr-1">
                                            <div class="form-group">
                                                <label>Cadete</label>
                                                <select className="form-control" value={this.state.cadeteId} onChange={this.cambiarCadete.bind(this)}>
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
                                                <input type="number" name="amountPedido"  
                                                    class="form-control" placeholder="Monto total" 
                                                    onChange={this.handleChange.bind(this)}
                                                    value={this.state.amountPedido}
                                                    onKeyPress={event=>{
                                                        if(event.key === 'Enter'){
                                                            this.calcularComisiones()
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6 pl-1">
                                            <div class="form-group">
                                                <label>Titulo compra</label>
                                                <input type="text" name="orderTitle" class="form-control" placeholder="Pago de cuentas, retirar comida.." onChange={this.handleChange.bind(this)} value={this.state.orderTitle}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 pr-1">
                                            <div class="form-group">
                                                <label>Comision moto <strong>{this.state.comisionEmpresa}%</strong></label>
                                                <input type="number" name="orderFeeMotovip"  class="form-control" placeholder="Monto total" onChange={this.handleChange.bind(this)} value={this.state.orderFeeMotovip}/>
                                            </div>
                                        </div>
                                        <div class="col-md-6 pl-1">
                                            <div class="form-group">
                                                <label>Comision cadete <strong>{this.state.comisionCadete}%</strong></label>
                                                <input type="number" name="orderFeeCadete" class="form-control" placeholder="Pago de cuentas, retirar comida.." onChange={this.handleChange.bind(this)} value={this.state.orderFeeCadete}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Observaciones</label>
                                                <textarea class="form-control" name="orderDescription" onChange={this.handleChange.bind(this)}  style={{height:100}} placeholder="..">
                                                    {this.state.orderDescription}
                                                </textarea>   
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            }    
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