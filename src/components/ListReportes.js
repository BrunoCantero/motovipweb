import React ,{Component} from 'react';
import { Modal,Button,Row,Col,Nav}    from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import TabContainer      from 'react-bootstrap/TabContainer'
import api               from '../config/apiserver.js';
import Calendar          from 'react-calendar';
import moment             from 'moment';
import loadingGif         from '../styles/img/loading.gif'

class ListReportes extends Component{

    constructor(props){
        super(props);
        const apitoken = sessionStorage['apitoken'];
        this.state= {
            listadoCadetes:[],
            listadoReporteCadete:[],
            apiToken:apitoken,
            showFechaDesdeCadete:false,
            showFechaHastaCadete : false,
            fechaSeleccionadaDesdeCadete:'',
            fechaSeleccionadaHastaCadete:'',
            showListadoReporteCadete:false,
            showLoadingGif:false,
            dateDesdeCadete : new Date,
            dateHastaCadete : new Date,
            cadeteIdSelected:0,
            totalGananciaCadete:0
        }
    }

    getCadetes(){
        this.setState({
            showListadoCadetes:false
        })
        fetch(api.server+'cadetes',{
            method:'GET',
            headers:{
                "Content-Type":"application/json; charset=utf-8",
                "api_token":this.state.apiToken
            }
        })
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                listadoCadetes: data
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    onChangeFechaSeleccionadaDesdeCadete (date){
        var fecha_seleccionada = moment(date).format('YYYY-MM-DD');
        this.setState({ 
            fechaSeleccionadaDesdeCadete:fecha_seleccionada,
            showFechaDesdeCadete:false })
    }

    onChangeFechaSeleccionadaHastaCadete (date){
        var fecha_seleccionada = moment(date).format('YYYY-MM-DD');
        this.setState({ 
            fechaSeleccionadaHastaCadete:fecha_seleccionada,
            showFechaHastaCadete:false });
    }

    mostrarFechaDesdeCadete(){
        this.setState({
            showFechaDesdeCadete:!this.state.showFechaDesdeCadete
        })
    }

    mostrarFechaHastaCadete(){
        this.setState({
            showFechaHastaCadete :!this.state.showFechaHastaCadete
        })
    }

    seleccionCadete(event){
        let cadete_id =  event.target.value;
        this.setState({
            cadeteIdSelected:cadete_id
        })
    }
    
    buscarReporteCadetes(){
        this.setState({
            showLoadingGif:true
        })
        if(this.state.cadeteIdSelected === 0){
            alert("Por favor debes seleccionar un cadete");
            this.setState({
                showLoadingGif:false
            })
        }
        else if(this.state.fechaSeleccionadaDesdeCadete === ''){
            alert("Debes seleccionar una fecha desde");
            this.setState({
                showLoadingGif:false
            })
        }
        else if(this.state.fechaSeleccionadaHastaCadete === ''){
            alert("Debes seleccionar una fecha hasta");
            this.setState({
                showLoadingGif:false
            })
        }else{
            
            //alert(this.state.cadeteIdSelected+" "+this.state.fechaSeleccionadaHastaCadete+" "+this.state.fechaSeleccionadaDesdeCadete);
            let url_api = api.server+'reportes/cadetes/'+this.state.cadeteIdSelected+'/'+this.state.fechaSeleccionadaDesdeCadete+'/'+this.state.fechaSeleccionadaHastaCadete;
            fetch(url_api,{
                method:'GET',
                headers:{
                    "Content-Type":"application/json; charset=utf-8",
                    "api_token":this.state.apiToken
                }
            })
            .then(response=>response.json())
            .then(data=>{
                this.setState({
                    listadoReporteCadete:data,
                    showLoadingGif:false,
                    showListadoReporteCadete:true
                })
                //console.log(data.length);
                this.calcularGananciaCadete();
            })
            .catch((error)=>{
                this.setState({
                    showLoadingGif:false,
                    showListadoReporteCadete:false
                })
                console.log(error.length);
            })
        }
    }

    calcularGananciaCadete(){
        let total=0;
        for(let i=0;i<this.state.listadoReporteCadete.length;i++){
            total += this.state.listadoReporteCadete[i].order_fee_cadet;
        }
        this.setState({
            totalGananciaCadete:total
        })
    }

    componentDidMount(){
        this.getCadetes();
    }

    render(){
        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="row">  
                        <div className="col-md-12">
                            <Tabs defaultActiveKey="Cadetes" transition={false} id="noanim-tab-example">
                                <Tab eventKey="Cadetes" title="Cadetes">
                                    <div className="row" style={{marginTop:10}}>
                                        <div class="col-md-3">
                                            <div class="card">
                                                <div class="col-md-11 pr-1">
                                                    <div class="form-group">
                                                        <label>Fecha desde</label>
                                                        <input type="text" class="form-control" onClick={()=>this.mostrarFechaDesdeCadete()} name="fechaDesdeCadete" value={this.state.fechaSeleccionadaDesdeCadete} placeholder="fecha.."/>
                                                        {this.state.showFechaDesdeCadete &&
                                                            <Calendar
                                                                onChange={this.onChangeFechaSeleccionadaDesdeCadete.bind(this)}
                                                                value={this.state.dateDesdeCadete}
                                                            />
                                                        }
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="card">
                                                <div class="col-md-11 pr-1">
                                                    <div class="form-group">
                                                        <label>Fecha hasta</label>
                                                        <input type="text" class="form-control" onClick={()=>this.mostrarFechaHastaCadete()} name="fechaHastaCadete" value={this.state.fechaSeleccionadaHastaCadete} placeholder="fecha.."/>
                                                        {this.state.showFechaHastaCadete &&
                                                            <Calendar
                                                                onChange={this.onChangeFechaSeleccionadaHastaCadete.bind(this)}
                                                                value={this.state.dateHastaCadete}
                                                            />
                                                        }
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="card">
                                                <div class="col-md-11 pr-1">
                                                    <div class="form-group">
                                                        <label>Cadete</label>
                                                        <select class="form-control" value={this.state.cadeteIdSelected} onChange={this.seleccionCadete.bind(this)}>
                                                            <option value="0">Elegir</option>
                                                            {this.state.listadoCadetes.map((cadetes,item)=>
                                                                <option key={item+1} value={cadetes.id}>{cadetes.name}</option>  
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="col-md-11 pr-1" style={{marginTop:20}}>
                                                <div class="form-group">
                                                    <Button variant="btn btn-info"  onClick={()=>this.buscarReporteCadetes()}> Buscar reporte</Button>
                                                </div>
                                            </div>    
                                        </div>
                                        {this.state.showLoadingGif &&
                                            <div className="col-md-12">
                                                <center><img src={loadingGif} style={{width:60,height:60}}/></center>
                                            </div>
                                        }
                                        {
                                        this.state.showListadoReporteCadete &&
                                            <div className="col-md-12">
                                                <div className="row">
                                                <div className="col-md-4">
                                                    <h4>Ganancia cadete </h4>
                                                </div>
                                                <div className="col-md-4">
                                                    <h4></h4>
                                                </div>
                                                <div className="col-md-4">
                                                    <h4 style={{color:'green'}}> TOTAL: ${this.state.totalGananciaCadete} </h4>
                                                </div>   
                                                </div> 
                                                <div class="card strpied-tabled-with-hover">
                                                    <div class="card-body table-full-width table-responsive" id="printablediv">
                                                        <table  className="table table-hover table-striped" >
                                                            <thead>
                                                                <tr>
                                                                    <th>#</th>
                                                                    <th>Cliente</th>
                                                                    <th>Direccion</th>
                                                                    <th>fecha</th>
                                                                    <th><center>Total_pedido</center></th>
                                                                    <th><center>Comision cadete</center></th>
                                                                    <th><center>Comision motovip</center></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                             {this.state.listadoReporteCadete.map((pedido,item)=>
                                                                <tr key={item+1}>
                                                                    <td>{pedido.id}</td>
                                                                    <td><strong>{pedido.cliente_name}</strong></td>
                                                                    <td>{pedido.adress}</td>
                                                                    <td>{pedido.fecha_order}</td>
                                                                    <td><center><strong style={{color:'green'}}>${pedido.amount}</strong></center></td>
                                                                    <td><center><strong style={{color:'red'}}>${pedido.order_fee_cadet}</strong></center></td>
                                                                    <td><center><strong style={{color:'red'}}>${pedido.order_fee_mv}</strong></center></td>
                                                                </tr>  
                                                              )}       
                                                            </tbody>        
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Clientes">
                                    <h1>Clientes</h1>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}


export default ListReportes;