import { auth } from '../../firebase';
import React, { useState, useTransition } from 'react';
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { setUserInfo, printInfo } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';


export const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const logIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Successful login");
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
        <p>WECOME BACK</p>
        <div>
        <input type="text" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}} />
        <br/>
        <input type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
        <br/>
        <input type="button" value="Log In" onClick={() => { logIn(email, password) }} />
        </div>
      </div>
    </>
  );
}