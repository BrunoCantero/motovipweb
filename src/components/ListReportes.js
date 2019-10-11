import React ,{Component} from 'react';
import { Modal,Button,Row,Col,Nav}    from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'

class ListReportes extends Component{

    constructor(props){
        super(props);
    }

    buscarReporteCadetes(){
        alert("ssaassa")
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
                                                        <input type="text" class="form-control" name="buscarCadete" placeholder="fecha.."
                                                        
                                                        />
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="card">
                                                <div class="col-md-11 pr-1">
                                                    <div class="form-group">
                                                        <label>Fecha hasta</label>
                                                        <input type="text" class="form-control" name="buscarCadete" placeholder="fecha.."/>
                                                    </div>
                                                </div>    
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="card">
                                                <div class="col-md-11 pr-1">
                                                    <div class="form-group">
                                                        <label>Cadete</label>
                                                        <select class="form-control" >
                                                            <option value="0">Elegir</option>
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
                                        <div className="col-md-12">
                                            <div class="card strpied-tabled-with-hover">
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
                                                                
                                                        </tbody>        
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
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