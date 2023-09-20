/*Importes*/
import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { LogInForm } from './features/login_form/LoginForm';
import { SignUpForm } from './features/signup_form/SignUpForm';

function App() {
  return (
    <>
    {/*Navegacion por las rutas de la pagina*/}
    <Router>
      <Routes>
        <Route exact path="/login" Component={LogInForm}/>
        <Route exact path="/signup" Component={SignUpForm}/>
      </Routes>
    </Router>
    {/*Usuario Prueba*/}
      <p>Test account: a@gmail.com | a123456</p>
    </>
  );
}

export default App;
