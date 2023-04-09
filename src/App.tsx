import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './pages/users/app/Main';
import AppPage from './pages/users/app/AppPage';
import Router from './components/Router';

function App() {
  return (
      <BrowserRouter>
          <Router/>
      </BrowserRouter>
  );
}

export default App;
