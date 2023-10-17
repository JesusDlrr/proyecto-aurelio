/*Importes*/
import { React, useState } from 'react';
import loginStyles from "./login.module.css";
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
    if (mail) {
      setError(false)
    } else {
      setError(true)
    }
    return (mail)
  }
  return (
    <>
      {/*Seccion para iniciar sesion*/}
      <div className={loginStyles.background}>
        <div className='bg-slate-800 border border-slate-600 rounded p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-40 relative'>
          <h1 className='text-white text-4xl font-bold text-center'>WELCOME BACK</h1>
          <form action="">
            <div className='relative my-4'>
              <input id="email" type="text" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:text-white focus:border-green-800 peer placeholder:text-slate-800' placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
              {error ?
                <label className='text-red-600'>Invalid email</label> : ""}
            </div>
            <div className='relative my-4'>
              <input type="password" className='block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:text-white focus:border-green-600 peer placeholder:text-slate-800' placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            </div>
          </form>
          <button type="button" className='w-full mb-4 text-[18px] mt-6 rounded bg-green-400 py-2 hover:bg-green-500 transition-colors duration-300' value="Log In" onClick={() => { if (validation()) logIn(email, password) }}>Login</button>
          <h5><a className='text-decoration: underline hover:text-white' href="/signup">No tienes una cuenta? SignUp</a></h5>
        </div>
      </div>
    </>
  );

}
