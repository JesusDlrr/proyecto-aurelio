import React, { useState } from 'react';
// import { Counter } from './features/counter/Counter';
// import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import './App.css';
import { LoginForm } from './features/login_form/LoginForm';

// function xd()
// {
//   const auth = getAuth(app);
//   onAuthStateChanged(auth, user => {
//     if(user != null)
//     {
//       console.log(user);
//       return(<p>{user.uid}</p>);
//     }else{
//       console.log("Not logged in")
//       return(<p>Not logged in</p>)
//     }
//   });

// }

function App() {
  return (
    <>
      <LoginForm/>
    </>
  );
}

export default App;
