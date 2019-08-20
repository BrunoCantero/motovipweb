/* eslint-disable no-useless-constructor */
import React ,{Component} from 'react';
import { Modal,Button}   from 'react-bootstrap';

class ListPedidos extends Component{

    constructor(props){
        super(props);
    }

    
    render(){
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
                                                <th>Fecha</th>
                                                <th>Tipo</th>
                                                <th>Total</th>
                                                <th>Detalle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><strong>Alexis quiñonez</strong></td>
                                                <td>19/05/2018 18:30:00</td>
                                                <td>2hs</td>
                                                <td>$120</td>
                                                <td><center><Button bsStyle="primary"> VER</Button></center></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td><strong>Gonzalez marcos</strong></td>
                                                <td>19/05/2018 18:30:00</td>
                                                <td>2hs</td>
                                                <td>$120</td>
                                                <td><center><Button bsStyle="primary"> VER</Button></center></td>
                                            </tr>
                                            <tr>
                                                <td>1</td>
                                                <td><strong>Bruno cantero</strong></td>
                                                <td>19/05/2018 18:30:00</td>
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

export default ListPedidos;