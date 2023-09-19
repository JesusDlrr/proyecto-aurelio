import { auth } from '../../firebase';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
}

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <p>{email}</p>
        <p>{password}</p>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="button" value="Log in" onClick={() => { signUp(email, password) }} />
      </div>
    </>
  );
}