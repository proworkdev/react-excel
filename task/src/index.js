/****** import statements ********/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/****** App is the entry point to the react code ********/
import App from './App';

/****** importing  BrowserRouter from 'react-router-dom'; ********/
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, document.getElementById('root')
);