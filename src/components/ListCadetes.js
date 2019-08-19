import React,{Component} from 'react';
import { Modal,Button}   from 'react-bootstrap';

class ListCadetes extends Component{


    render(){
        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-md-8">
                            <div class="card">
                                <div class="col-md-12 pr-1">
                                    <div class="form-group">
                                        <label>Buscar cadetes</label>
                                        <input type="text" class="form-control" placeholder="Apellido.." value=""/>
                                    </div>
                                </div>    
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="col-md-12 pr-1">
                                    <div class="form-group">
                                        <label>Alta cadete</label><br/>
                                        <Button variant="btn btn-info"  onClick={()=>this.modalNuevoCliente()}> Nuevo cadete</Button>
                                    </div>
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
                                                <th>Barrio</th>
                                                <th>Direccion</th>
                                                <th>Telefono</th>
                                                <th>Alta</th>
                                                <th>Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><strong>Alexis quiñonez</strong></td>
                                                <td>19/05/2018 18:30:00</td>
                                                <td>2hs</td>
                                                <td>2hs</td>
                                                <td>$120</td>
                                                <td><center><Button bsStyle="primary"> VER</Button></center></td>
                                            </tr> 
                                        </tbody>        
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ListCadetes;