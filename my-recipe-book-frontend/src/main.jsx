
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {AuthProvider} from './context/AuthContext.jsx';
import { BrowserRouter as Router } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './app.css';
import "./styles/style.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> 
      <AuthProvider> 
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);