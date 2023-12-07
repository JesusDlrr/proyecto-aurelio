/*Importes*/
import React, { useState, useTransition } from "react";
import signUpStyles from "./signup.module.css";
import useSignUpForm from "./useSignUpForm";
import { Spinner } from "@material-tailwind/react";
const validator = require("validator");

/*Constante SignUpForm*/
export const SignUpForm = () => {
  const {
    name,
    email,
    password,
    setEmail,
    setPassword,
    setName,
    signUp,
    status,
    loading,
  } = useSignUpForm();

  const [email_error, setEmailError] = useState(null);
  const [password_error, setPasswordError] = useState(null);
  const [name_error, setNameError] = useState(null);

  //variables para la validacion de correos
  const validation_email = () => {
    if (email === "") {
      setEmailError("Required field");
      return;
    }

    var mail = validator.isEmail(email);
    if (!mail) {
      setEmailError("Invalid field");
      return;
    }
    setEmailError(null);
  };

  const validation_password = () => {
    if (password === "") {
      setPasswordError("Required field");
      return;
    }
    if (password < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }
    setPasswordError(null);
  };

  const validation_name = () => {
    if (name === "") {
      setNameError("Required field");
      return;
    }
    setNameError(null);
  };

  return (
    <>
      {/*Seccion para el registro de los usuarios*/}
      <div className={signUpStyles.background}>
        <div className="bg-slate-800 border border-slate-600 rounded p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative">
          <h1 className="text-white text-4xl font-bold text-center">Sign up</h1>
          <form action="">
            <div className="relative my-4">
              <input
                id="name"
                type="email"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:text-white focus:border-green-800 peer placeholder:text-slate-800"
                placeholder="Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {name_error !== null ? (
                <label className="text-red-700">{name_error}</label>
              ) : (
                ""
              )}
            </div>
            <div className="relative my-4">
              <input
                id="email"
                type="text"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:text-white focus:border-green-800 peer placeholder:text-slate-800"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {email_error !== null ? (
                <label className="text-red-700">{email_error}</label>
              ) : (
                ""
              )}
            </div>
            <div className="relative my-4">
              <input
                type="password"
                className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:text-white focus:border-green-600 peer placeholder:text-slate-800"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {password_error !== null ? (
                <label className="text-red-800">{password_error}</label>
              ) : (
                ""
              )}
            </div>
          </form>
          <button
            type="button"
            className="middle none center rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full mb-4 text-[18px] mt-6 rounded bg-green-400 py-2 hover:bg-green-500 transition-colors duration-300 text-black"
            disabled={loading}
            value="Log In"
            onClick={() => {
              validation_email();
              validation_password();
              validation_name();

              if (
                email_error === null &&
                password_error === null &&
                name_error === null
              ) {
                signUp(email, password, name);
              }
            }}
          >
            <div className="flex items-center justify-center">
              {loading === true ? (
                <div>
                  <Spinner className="h-6 w-6" />
                </div>
              ) : (
                "Create account"
              )}
            </div>
          </button>
          {/*{status === "auth/invalid-login-credentials" ? (
            <label className="text-red-800 flex items-center justify-center">
              Invalid credentials
            </label>
          ) : (
            ""
          )}*/}
          <h5>
            <a
              className="text-decoration: underline hover:text-white"
              href="/login"
            >
              Already have an account? Log in
            </a>
          </h5>
        </div>
      </div>
    </>
  );
};
