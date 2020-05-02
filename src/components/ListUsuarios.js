import React,{Component} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class ListUsuarios extends Component{

    render(){
        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="row">  
                        <div className="col-md-12">
                            <Tabs defaultActiveKey="Usuarios" transition={false} id="noanim-tab-example">
                                <Tab eventKey="Usuarios" title="Usuarios">
                                    <div class="card strpied-tabled-with-hover">
                                        <div class="card-body table-full-width table-responsive">
                                            <table  className="table table-hover table-striped" >
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Username</th>
                                                        <th>Password</th>
                                                        <th>fecha</th>
                                                        <th><center>Editar</center></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="Cadetes" title="Cadetes">
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListUsuarios;