import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Listing from './Listing';
import logo from './Lilly-Logo.png';
import './index.css';

const routing = (
  <div>
      <header>
        <div>
          <img src={logo} alt="logo" width="15%"></img>
        </div>
        <div className="sub-header">
          React Application for Simple Github Login for Elli Lilly Demo
        </div>
      </header>
  
  <Router>
    <div>
      <Route exact path="/" component={App} />  
      <Route path="/listings" component={Listing} />
    </div>  
  </Router>
  </div>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);
