import React,{Component} from 'react';
import Routes from './Routes.js';
import '~/node_modules/bootstrap/dist/bootstrap.css';
import './assets/css/bootstrap.min.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import './assets/css/animate.min.css';
import './assets/css/light-bootstrap-dashboard.css';


class App extends Component{
  
  componentDidMount(){
    document.tile = "Motovip";
  }

  render(){
    return(
      <Routes/>
    );
  }
}

export default App;
