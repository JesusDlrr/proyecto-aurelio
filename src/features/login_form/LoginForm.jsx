/*Importes*/
import {React, useState} from 'react';
import loginStyles from "./logIn.module.css";
import useLoginForm from './useLoginForm';


/*Constante LogInForm*/
export const LogInForm = () => {
  const {
    email, password,
    setEmail, setPassword, logIn
  } = useLoginForm();
  const [error, setError] = useState(false);
  //variables para la validacion de correos
  const validation = () => {
  var validator = require('validator');
  var mail = validator.isEmail(email);
  if(mail){
    setError(false)
  }else{
    setError(true)
  }
  return(mail)
}
  return (
    <>
    {/*Seccion para iniciar sesion*/}
      <section className={loginStyles.wrapper} >
        <p className={loginStyles.pText}>WELCOME BACK</p>
        <div className={loginStyles.inputBox}>
          <input className={loginStyles.input} id="email" type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
          {error?
          <label>Invalid email</label>:""}
          <box-icon className={loginStyles.box} type='solid' name='user'></box-icon>
        </div>
        <br />
        <div className={loginStyles.inputBox}>
          <input className={loginStyles.input} type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
          <box-icon className={loginStyles.box} name='lock-alt' type='solid' ></box-icon>
        </div>
        <br />
        <button type="button" className='btn btn-secondary' value="Log In" onClick={() => { if(validation())logIn(email, password)}}>Login</button>
        <div className={loginStyles.signup}>
            <h5><a href="/signup">No tienes una cuenta? SignUp</a></h5>
        </div>
      </section>
    </>
  );

}