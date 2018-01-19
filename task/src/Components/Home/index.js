/****** import statements ********/
import Home from './home';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';

/******** rendering Home into the DOM *******/
ReactDOM.render(<Home data={eneteries} />, document.getElementById('spreadsheet'));