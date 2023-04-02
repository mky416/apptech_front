import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Button } from 'react-bootstrap';
import Main from './pages/users/app/Main';
import AppPage from './pages/users/app/AppPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/AppPage' element={<AppPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
