/*Importes*/
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LogInForm } from './features/login_form/LoginForm';
import { SignUpForm } from './features/signup_form/SignUpForm';
import { Home } from './features/home/Home';
import { NavBar } from './features/nav_bar/Navbar';
import { Suggestions } from './features/suggestions/Suggestions';
import { Feed } from './features/feed/Feed';
import { Profile } from './features/profile/Profile';
import { Quick_Thought } from './features/quick_thought/Quick_thought';


function App() {
  return (
    <>
{/*       <div className="h-screen w-screen bg-gray-400 p-10 grid grid-cols-4 grid-rows-4 gap-3 m-auto">
        <div>
          <Profile />
        </div>
        <div>
          <Quick_Thought />
        </div>
        <div>
          <Feed />
        </div>
        <div>
          <Suggestions />
        </div>

      </div> */}
      {/*Navegacion por las rutas de la pagina*/}
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/login" Component={LogInForm} />
          <Route exact path="/signup" Component={SignUpForm} />
        </Routes>
      </Router>
      {/*Usuario Prueba*/}
      <p>Test account: a@gmail.com | a123456</p>

    </>
  )
}

export default App;