/*Importes*/
import { auth } from '../../firebase';
import React, { useState, useTransition } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setUserInfo, printInfo } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import styles from './signup.module.css'

/*Constante SignUpForm*/
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
    {/*Seccion para el registro de los usuarios*/}
    <section className={styles.wrapper}>
      <p>SIGN UP</p>
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
      <button type="button" className='btn btn-secondary' value="Create account" onClick={() => { signUp(email, password) }}>Login</button>

    </section>
  </>
  );
}