import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  < Context >
    <App />
  </Context >
);