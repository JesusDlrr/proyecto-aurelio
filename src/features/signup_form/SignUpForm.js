import { auth } from '../../firebase';
import React, { useState, useTransition } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUserInfo, printInfo } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';


export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const signUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setUserInfo({
          uid: userCredential.user.uid,
          name: userCredential.user.displayName,
          email: userCredential.user.email
        }));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  return (
    <>
      <div>
        <p>CREATE ACCOUNT</p>
        <div>
        <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
        <br/>
        <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
        <br/>
        <input type="button" value="Create account" onClick={() => { signUp(email, password) }} />
        </div>
      </div>
    </>
  );
}