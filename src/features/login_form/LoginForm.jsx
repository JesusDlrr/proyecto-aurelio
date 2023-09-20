import { auth } from '../../firebase';
import React, { useState, useTransition } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setUserInfo, printInfo } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import boxicons from 'boxicons';
import styles from "./login.module.css";


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
      <section className={styles.wrapper}>
        <p>WECOME BACK</p>
        <div className={styles.inputBox}>
          <input className={styles.input} type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          <box-icon className={styles.box} type='solid' name='user'></box-icon>
        </div>
        <br />
        <div className={styles.inputBox}>
          <input className={styles.input} type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
          <box-icon className={styles.box} name='lock-alt' type='solid' ></box-icon>
        </div>
        <br />
        <button type="button" className='btn btn-secondary' value="Log In" onClick={() => { logIn(email, password) }}>Login</button>

      </section>
    </>
  );

}