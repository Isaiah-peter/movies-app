import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/main.scss'

process.env.CI = false 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

