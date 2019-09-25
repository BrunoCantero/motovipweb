/* eslint-disable no-useless-constructor */
import React ,{Component} from 'react';
import { Modal,Button}    from 'react-bootstrap';
import Calendar           from 'react-calendar';
import moment             from 'moment';
import TimeKeeper         from 'react-timekeeper';
import Lottie             from 'react-lottie';
import Autosuggest        from 'react-autosuggest';
import api                from '../config/apiserver.js'


moment.locale('es');

const languages = [
    {
        name:'csss'
    },
    {
        name:'sdsdsd'
    },
    {
        name:'za'
    }
];


  // Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};
  

const getSuggestionValue = suggestion => suggestion.name+","+suggestion.id+","+suggestion.adress;
  
  // Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div class="alert alert-info" style={{ listStyleType: "none" }}>
        <span style={{ listStyleType: "none" }}>
        <b> Cliente: </b> {suggestion.name}</span>
    </div>
);


class ListPedidos extends Component{

    constructor(props){
        super(props);
        this.hiddenModalNuevoPedido = this.hiddenModalNuevoPedido.bind(this);
        this.timeChangeInicio = this.timeChangeInicio.bind(this);
        this.timeChangeLlegada = this.timeChangeLlegada.bind(this);
        this.timeChangeFin = this.timeChangeFin.bind(this);
        this.hiddenModalEditarPedido = this.hiddenModalEditarPedido.bind(this);
        const apitoken = sessionStorage['apitoken'];
        const iduser   = sessionStorage['iduser'];
        this.state={
            showModalNuevoPedido:false,
            showFecha : false,
            date: new Date(),
            fechaSeleccionada:'',
            fechaOrder:'',
            timeEntregaInicio:'',
            timeLlegadaPedido:'',
            timeFinPedido:'',
            nombreCadete:'',
            apiToken : apitoken,
            showHoraInicio:false,
            loading:false,
            showLoadingPedido:false,
            showFormPedidoNuevo:true,
            listadoCadetes:[],
            listadoCategoriaPedidos:[],
            listadoClientes:[],
            listadoPedidos:[],
            clienteName:'',
            startTimePedido:'',
            arrivalTimePedido:'',
            endTimePedido:'',
            addressPedido:'',
            amountPedido : '',
            idPedido: 0,
            orderFeeMotovip: 0,
            orderFeeCadete:0,
            comisionCadete:0,
            comisionEmpresa:0,
            lugarRetiroPedido : '',
            lugarEntregaPedido : '',
            orderTitle: 'Retiro pedido',
            orderDescription:'',
            usuarioId:iduser,
            cadeteId:0,
            categoriaPedidoId:0,
            clientePedidoId:0,
            value: '',
            suggestions: []
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
            showLoadingPedido:false,
            addressPedido:'',
            amountPedido:'',
            orderFeeCadete:0,
            orderDescription:'',
            lugarEntregaPedido:'',
            lugarRetiroPedido:''
        })
        this.getHorarioEntregaPedido();
    }

    mostrarCalendario(){
        this.setState({
            showFecha : !this.state.showFecha
        })
    }

    getCadetes(){
        fetch(api.server+'cadetes',{
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
            comisionCadete:75,
            comisionEmpresa:25
        })
    }

    getClienteDefault(){
        fetch(api.server+'clientes/1',{
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
        fetch(api.server+'pedidos',{
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

    timeChangeLlegada(newTime){
        this.setState({
           timeLlegadaPedido : newTime.formatted24 
        }) 
    }

    timeChangeFin(newTime){
        this.setState({
           timeFinPedido : newTime.formatted24 
        }) 
    }


    showHorario(opcion){
        if(opcion ===1){
            this.setState({
                showHoraInicio :!this.state.showHoraInicio,
            })
        }
        else if(opcion ===2){
            this.setState({
                showHoraLlegada :!this.state.showHoraLlegada,
            })
        }
        else if(opcion ===3){
            this.setState({
                showHoraFin :!this.state.showHoraFin,
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

    cambiarCategoriaPedido(event){
        let categoria_id = event.target.value;
        this.setState({
            categoriaPedidoId : categoria_id
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
        }else if(this.state.categoriaPedidoId === 0){
            alert("Debes seleccionar una categoria del pedido");
            this.setState({
                showFormPedidoNuevo:true,
                showLoadingPedido:false
            })
        }
        else{
            //alert(this.state.lugarEntregaPedido+" "+this.state.lugarRetiroPedido);
            fetch(api.server+'pedidos',{
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
                    'lugar_retiro':this.state.lugarRetiroPedido,
                    'lugar_entrega' :this.state.lugarEntregaPedido,
                    'user_id':this.state.usuarioId,
                    'cadete_id':this.state.cadeteId,
                    'cliente_id':this.state.clientePedidoId,
                    'categoria_pedido_id':this.state.categoriaPedidoId
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

    esEntero(numero){
        if (numero % 1 == 0) {
            return true
        } else {
            return false
        }
    }    

    calcularComisiones(){
        
        if(this.state.amountPedido>=0){
            let comision_cadete = this.state.amountPedido * 0.75;
            let comision_empresa = this.state.amountPedido * 0.25;
            this.setState({
                orderFeeCadete :comision_cadete.toFixed(2),
                orderFeeMotovip :comision_empresa.toFixed(2)
            });
        }
    }

    editarPedidoDetalle(idpedido,idcadete,idcliente,cliete_name,direccion,start_pedido,arrival_time,end_time,comision_empresa,comision_motomandado,order_title,order_description,fecha_order,total_compra,categoria_pedido_id,lugar_retiro,lugar_entrega){
        this.setState({
            showModalEditarPedido:true,
            showFormEditarPedido:true,
            showLoadingEditarPedido:false,
            showHoraLlegada:false,
            showHoraFin:false,
            idPedido:idpedido,
            timeEntregaInicio :start_pedido,
            timeLlegadaPedido:arrival_time,
            timeFinPedido : end_time,
            amountPedido:total_compra,
            clienteName:cliete_name,
            addressPedido:direccion,
            orderFeeMotovip:comision_empresa,
            orderFeeCadete:comision_motomandado,
            orderTitle:order_title,
            orderDescription:order_description,
            fechaOrder:fecha_order,
            clientePedidoId:idcliente,
            categoriaPedidoId:categoria_pedido_id,
            lugarRetiroPedido:lugar_retiro,
            lugarEntregaPedido:lugar_entrega
        })
        //Buscar cadete
        this.getCadeteProfile(idcadete);
    }

    

    getCadeteProfile(id){
        let cadete = this.state.listadoCadetes.filter(function(cadetes){

            return cadetes.id == id;

        });

        this.setState({
            nombreCadete:cadete[0].name,
            cadeteId:cadete[0].id
        })
    
    }

    hiddenModalEditarPedido(){
        this.setState({
            showModalEditarPedido:false
        })
    }

    updatePedido(){
        this.setState({
            showFormEditarPedido:false,
            showLoadingEditarPedido:true
        })
        fetch(api.server+'pedidos/'+this.state.idPedido,{
            method:"PUT",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "api_token":this.state.apiToken
            },
            body:JSON.stringify({
                'cliente_name':this.state.clienteName,
                'fecha_order':this.state.fechaOrder,
                'start_time':this.state.timeEntregaInicio,
                'arrival_time':this.state.timeLlegadaPedido,
                'end_time':this.state.timeFinPedido,
                'adress':this.state.addressPedido,
                'amount':this.state.amountPedido,
                'order_fee_mv':this.state.orderFeeMotovip,
                'order_fee_cadet':this.state.orderFeeCadete,
                'order_title':this.state.orderTitle,
                'order_description':this.state.orderDescription,
                'lugar_retiro':this.state.lugarRetiroPedido,
                'lugar_entrega' :this.state.lugarEntregaPedido,
                'user_id':this.state.usuarioId,
                'cadete_id':this.state.cadeteId,
                'cliente_id':this.state.clientePedidoId,
                'categoria_pedido_id':this.state.categoriaPedidoId
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
            this.sleep(3000).then(() => {
                // Do something after the sleep!
                this.setState({
                    showFormEditarPedido:false,
                    showLoadingEditarPedido:false
                })
                this.getPedidos();
                this.hiddenModalEditarPedido();
            })
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    
    getClientes(){
        fetch(api.server+'clientes',{
            method:'GET',
            headers:{
                "Content-Type":"application/json; charset=utf-8",
                "api_token":this.state.apiToken
            }
        })
        .then(response=>response.json())
        .then(data=>{
            //console.log(data);
            this.setState({
                listadoClientes:data
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    getCategoriasPedidos(){
        fetch(api.server+'pedidos/categorias',{
            method:'GET',
            headers:{
                'Content-Type':'application/json; charset=utf-8',
                'api_token':this.state.apiToken
            }
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                listadoCategoriaPedidos:data
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    //seccion autocompletable cliente

    onChange = (event, { newValue }) => {
        //console.log(newValue);
        let datos_cliente  = newValue.split(",");
        this.setState({
          value: datos_cliente[0],
          clienteName:datos_cliente[0],
          clientePedidoId:datos_cliente[1],
          addressPedido: datos_cliente[2]
        });
      };
    
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
    };
    
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };

    //fin seccion autocompletable cliente

    componentDidMount(){
        this.getCadetes();
        this.getPedidos();
        this.getCategoriasPedidos();
        this.getClienteDefault();
        this.getComisiones();
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

        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Buscar cliente...',
            value,
            onChange: this.onChange
        };

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
                                                <th>Categoria</th>
                                                <th>Estado</th>
                                                <th>Recepción</th>
                                                <th>Inicio</th>
                                                <th>Fin</th>
                                                <th><center>Total</center></th>
                                                <th><center>Comision_cadete</center></th>
                                                <th><center>Comision_motovip</center></th>
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
                                                    <td>{
                                                            pedidos.start_time  !== '' && pedidos.arrival_time === '' && pedidos.end_time === ''?
                                                            <strong style={{color:'red'}}>En espera</strong>
                                                        :
                                                            null
                                                        }
                                                        {
                                                            pedidos.start_time  !== '' && pedidos.arrival_time !== '' && pedidos.end_time === ''?
                                                            <strong style={{color:'blue'}}>En curso</strong>
                                                        :
                                                            null
                                                        }
                                                        {
                                                            pedidos.start_time  !== '' && pedidos.arrival_time !== '' && pedidos.end_time !== ''?
                                                            <strong style={{color:'green'}}>Finalizado</strong>
                                                        :
                                                            null
                                                        }
                                                    </td>
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
                                                            <span>{pedidos.end_time}</span>
                                                        }
                                                    </td>
                                                    <td><center><strong style={{color:'green'}}>${pedidos.amount}</strong></center></td>
                                                    <td><center><strong style={{color:'red'}}>${pedidos.order_fee_cadet}</strong></center></td>
                                                    <td><center><strong style={{color:'red'}}>${pedidos.order_fee_mv}</strong></center></td>
                                                    <td><center><Button bsStyle="primary" onClick={()=>this.editarPedidoDetalle(pedidos.id,pedidos.cadete_id,pedidos.cliente_id,pedidos.cliente_name,pedidos.adress,pedidos.start_time,pedidos.arrival_time,pedidos.end_time,pedidos.order_fee_mv,pedidos.order_fee_cadet,pedidos.order_title,pedidos.order_description,pedidos.fecha_order,pedidos.amount,pedidos.categoria_pedido_id,pedidos.lugar_retiro,pedidos.lugar_entrega)}> VER</Button></center></td>
                                                </tr>
                                            )}
                                        </tbody>        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal  show={this.state.showModalNuevoPedido} style={{marginTop:-250}}  size="lg" onHide={this.hiddenModalNuevoPedido} >
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
                                                <Autosuggest
                                                    class="form-control"
                                                    suggestions={this.state.listadoClientes}
                                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                                    getSuggestionValue={getSuggestionValue}
                                                    renderSuggestion={renderSuggestion}
                                                    inputProps={inputProps}
                                                />
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
                                                <label>Hora recepcion</label>
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
                                                <label>Total</label>
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
                                                <label>Categoria pedido</label>
                                                
                                                <select className="form-control" value={this.state.categoriaPedidoId} onChange={this.cambiarCategoriaPedido.bind(this)}>
                                                    <option value="0">Seleccionar categoria</option>
                                                    {this.state.listadoCategoriaPedidos.map((categorias,item)=>
                                                        <option key={item+1} value={categorias.id}>{categorias.categoria_pedido}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 pr-1">
                                            <div class="form-group">
                                                <label>Comision motovip <strong>{this.state.comisionEmpresa}%</strong></label>
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
                                    <div className="row">
                                        <div className="col-md-6 pr-1">
                                            <div class="form-group">
                                                <label>Lugar retiro</label>
                                                <input type="text" name="lugarRetiroPedido"  class="form-control" placeholder="Donde retira el pedido" onChange={this.handleChange.bind(this)} value={this.state.lugarRetiroPedido}/>
                                            </div>
                                        </div>
                                        <div class="col-md-6 pl-1">
                                            <div class="form-group">
                                                <label>Lugar entrega </label>
                                                <input type="text" name="lugarEntregaPedido" class="form-control" placeholder="Donde entrega el pedido" onChange={this.handleChange.bind(this)} value={this.state.lugarEntregaPedido}/>
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
                <Modal  show={this.state.showModalEditarPedido} style={{marginTop:-250}}  size="lg" onHide={this.hiddenModalEditarPedido} >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <strong>#PEDIDO {this.state.idPedido} {this.state.timeEntregaInicio}</strong>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <div className="card-body">
                            {
                                this.state.showLoadingEditarPedido &&    
                                <div>
                                    <center><Lottie options={defaultLoading} height={150} width={'15%'} /></center>
                                    <center><h4 style={{color:'black'}}>Guardando..</h4></center>
                                </div> 
                            }
                            {
                                this.state.showFormEditarPedido &&
                                <form>
                                    <div className="row">
                                        <div className="col-md-4 pr-1">
                                            <div class="form-group">
                                                <label style={{fontWeight:'bold',color:'gray'}}>Cliente</label>
                                                <input type="text" name="clienteName"  class="form-control" placeholder="Nombre cliente" onChange={this.handleChange.bind(this)} value={this.state.clienteName}/>
                                            </div>
                                        </div>
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label style={{fontWeight:'bold',color:'gray'}}>Direccion</label>
                                                <input type="text" name="addressPedido" class="form-control" placeholder="Direccion.." onChange={this.handleChange.bind(this)} value={this.state.addressPedido}/>
                                            </div>
                                        </div>
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label style={{fontWeight:'bold',color:'gray'}}>Hora recepcion</label>
                                                <input type="text" name="timeEntregaInicio" class="form-control" placeholder="Inicio.." onChange={this.handleChange.bind(this)} value={this.state.timeEntregaInicio}/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-4 pr-1">
                                            <div class="form-group">
                                                <label style={{fontWeight:'bold',color:'gray'}}>Cadete</label>
                                                <select className="form-control" value={this.state.cadeteId} onChange={this.cambiarCadete.bind(this)}>
                                                    {this.state.listadoCadetes.map((cadetes,item)=>
                                                        <option key={item+1} value={cadetes.id}>{cadetes.name}</option>  
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label style={{fontWeight:'bold',color:'gray'}}>Hora Inicio</label>
                                                <input type="text" name="timeLlegadaPedido" class="form-control" placeholder="inicio.." value={this.state.timeLlegadaPedido} onChange={this.handleChange.bind(this)} onClick={()=>this.showHorario(2)}/>
                                                {this.state.showHoraLlegada &&
                                                    <TimeKeeper
                                                        switchToMinuteOnHourSelect={true}
                                                        time={this.state.timeLlegadaPedido}
                                                        onChange={this.timeChangeLlegada}
                                                    />
                                                } 
                                            </div>
                                        </div>
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label style={{fontWeight:'bold',color:'gray'}}>Hora fin</label>
                                                <input type="text" name="timeLlegadaPedido" class="form-control" placeholder="Fin.." value={this.state.timeFinPedido} onChange={this.handleChange.bind(this)} onClick={()=>this.showHorario(3)}/>
                                                {this.state.showHoraFin &&
                                                    <TimeKeeper
                                                        switchToMinuteOnHourSelect={true}
                                                        time={this.state.timeFinPedido}
                                                        onChange={this.timeChangeFin}
                                                    />
                                                } 
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-4 pr-1">
                                            <div class="form-group">
                                                <label style={{fontWeight:'bold',color:'gray'}}>Total compra</label>
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
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label>Comision empresa</label>
                                                <input type="text" name="orderFeeMotovip" class="form-control" placeholder="Comision empresa.." onChange={this.handleChange.bind(this)} value={this.state.orderFeeMotovip}/>
                                            </div>
                                        </div>
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label>Comision cadete</label>
                                                <input type="text" name="orderFeeCadete" class="form-control" placeholder="Comision cadete.." onChange={this.handleChange.bind(this)} value={this.state.orderFeeCadete}/>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label>Categoria pedido</label>
                                                
                                                <select className="form-control" value={this.state.categoriaPedidoId} onChange={this.cambiarCategoriaPedido.bind(this)}>
                                                    <option value="0">Seleccionar categoria</option>
                                                    {this.state.listadoCategoriaPedidos.map((categorias,item)=>
                                                        <option key={item+1} value={categorias.id}>{categorias.categoria_pedido}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4 pr-1">
                                            <div class="form-group">
                                                <label>Lugar retiro</label>
                                                <input type="text" name="lugarRetiroPedido"  class="form-control" placeholder="Donde retira el pedido" onChange={this.handleChange.bind(this)} value={this.state.lugarRetiroPedido}/>
                                            </div>
                                        </div>
                                        <div class="col-md-4 pl-1">
                                            <div class="form-group">
                                                <label>Lugar entrega </label>
                                                <input type="text" name="lugarEntregaPedido" class="form-control" placeholder="Donde entrega el pedido" onChange={this.handleChange.bind(this)} value={this.state.lugarEntregaPedido}/>
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
                        <Button onClick={()=>this.hiddenModalEditarPedido()} variant="secondary" style={{marginTop:10}}>Salir</Button>
                        <Button onClick={()=>this.updatePedido()} variant="btn btn-success" style={{marginTop:10}}>Actualizar pedido</Button>
                    </Modal.Footer>
                </Modal>  
            </div>
                
        )
    }
}

export default ListPedidos;