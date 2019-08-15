import React,{Component} from 'react';
import Routes from './Routes.js';
import './styles/css/bootstrap.min.css';
import './styles/css/bootstrap.min.css';
import './styles/css/demo.css';
import './styles/css/light-bootstrap-dashboard.css';
import './styles/css/textEffect.css';



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
