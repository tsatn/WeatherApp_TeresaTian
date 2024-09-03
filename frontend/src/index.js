import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'; // Ensure the case matches your file name
import './index.css';    // Ensure this file exists in the src directory

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
