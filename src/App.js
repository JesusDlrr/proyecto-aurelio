/*Importes*/
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { LogInForm } from './features/login_form/LoginForm';
import { SignUpForm } from './features/signup_form/SignUpForm';
import { Home } from './features/home/Home';

function App() {
  return (
    <>
    {/*Navegacion por las rutas de la pagina*/}
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <Router>
      <Routes>
        <Route exact path="/" Component={LogInForm}/>
        <Route exact path="/login" Component={Home}/>
        <Route exact path="/signup" Component={SignUpForm}/>
      </Routes>
    </Router>
    {/*Usuario Prueba*/}
    <p>Test account: a@gmail.com | a123456</p>
    </>
  )
}

export default App;