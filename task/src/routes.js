import React, { Component } from 'react';
import home from './Components/Home/home';
import {Route} from 'react-router-dom';

class Routes extends Component {
  render() {
  	return(
  		<Route exact={true} path="/" component={home}/>
  		)
  }
}
export default Routes;
