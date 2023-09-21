/*Importes*/
import React from 'react';
import boxicons from 'boxicons';
import styles from "./login.module.css";
import useLoginForm from './useLoginForm';

/*Constante LogInForm*/
export const LogInForm = () => {
  const {
    email, password,
    setEmail, setPassword, logIn, 
  } = useLoginForm();

  return (
    <>
    {/*Seccion para iniciar sesion*/}
      <section className={styles.wrapper}>
        <p className={styles.pText}>WECOME BACK</p>
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

        <div className={styles.signup}>
            <h5>No tienes una cuenta? <a href="/signup">SignUp</a></h5>
        </div>
      </section>
    </>
  );

}