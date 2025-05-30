// index.js (eller motsvarande startfil)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importera DIN anpassade SCSS-fil
import "./styles/style.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);