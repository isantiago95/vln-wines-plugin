import React from 'react';
import ReactDom from 'react-dom';
import './assets/styles.css';
import Admin from './views/Admin/Admin.jsx';
import Stack from './views/Admin/Stack.jsx';

document.addEventListener('DOMContentLoaded', function () {
  let element = document.getElementById('vln-wines-directory-admin');
  if (typeof element !== 'undefined' && element !== null) {
    ReactDom.render(<Admin />, element);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let element = document.getElementById('ms-devs-portfolio-stack');
  if (typeof element !== 'undefined' && element !== null) {
    ReactDom.render(<Stack />, element);
  }
});
