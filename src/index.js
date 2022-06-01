import React from 'react';
import ReactDom from 'react-dom';
import Admin from './views/Admin.jsx';

document.addEventListener('DOMContentLoaded', function () {
  let element = document.getElementById('ms-devs-portfolio-app');
  if (typeof element !== 'undefined' && element !== null) {
    ReactDom.render(<Admin />, element);
  }
});
