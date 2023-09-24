/*Importes*/
import React, { useState, useTransition } from 'react';
import signUpStyles from './signUp.module.css'
import useSignUpForm from './useSignUpForm';

/*Constante SignUpForm*/
export const SignUpForm = () => {
  const {
    email, password,
    setEmail, setPassword, signUp
  } = useSignUpForm();

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
    {/*Seccion para el registro de los usuarios*/}
    <section className={signUpStyles.wrapper}>
      <p>SIGN UP</p>
      <div className={signUpStyles.inputBox}>
        <input className={signUpStyles.input} type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
        {error?
          <label>Invalid email</label>:""}
        <box-icon className={signUpStyles.box} type='solid' name='user'></box-icon>
      </div>
      <br />
      <div className={signUpStyles.inputBox}>
        <input className={signUpStyles.input} type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
        <box-icon className={signUpStyles.box} name='lock-alt' type='solid' ></box-icon>
      </div>
      <br />
      <button type="button" className='btn btn-secondary' value="Create account" onClick={() => { if(validation())signUp(email, password) }}>Login</button>

    </section>
  </>
  );
}