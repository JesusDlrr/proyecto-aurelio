/*Importes*/
import { React, useState } from "react";
import useLoginForm from "./useLoginForm";
import { Spinner } from "@material-tailwind/react";
const validator = require("validator");

/*Constante LogInForm*/
export const LogInForm = () => {
  const { email, password, setEmail, setPassword, logIn, status, loading } =
    useLoginForm();
  const [email_error, setEmailError] = useState(null);
  const [password_error, setPasswordError] = useState(null);
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
  return (
    <>
      {/*Seccion para iniciar sesion*/}
      <div className="bg-[url('/assets/imagenesDeFondo/fondoNubes.png')] bg-center bg-cover  h-screen w-screen lg:p-32 lg:pl-32 md:px-32 md:py-11">
        <div className="bg-slate-800 border w-full h-full lg:w-96 lg:h-auto border-slate-600 rounded-none lg:rounded md:rounded p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-40 relative">
          <h1 className=" text-white text-4xl font-bold text-center">
            Welcome Back
          </h1>
          <form action="">
            <div className="relative my-6">
              <input
                id="email"
                type="email"
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:text-white focus:border-green-800 peer placeholder:text-white"
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
            <div className="relative my-6">
              <input
                type="password"
                className="block w-full py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-green-400 focus:outline-none focus:ring-0 focus:text-white focus:border-green-600 peer placeholder:text-white"
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
            disabled={loading}
            className="middle none center my-6 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-full mb-4 text-[18px] mt-6 bg-green-400 hover:bg-green-500 duration-300"
            value="Log In"
            onClick={() => {
              validation_email();
              validation_password();

              if (email_error === null && password_error === null) {
                logIn(email, password);
              }
            }}
          >
            <div className="flex items-center justify-center">
              {loading === true ? (
                <div>
                  <Spinner className="h-6 w-6" />
                </div>
              ) : (
                "Login"
              )}
            </div>
          </button>

          {status === "auth/invalid-login-credentials" ? (
            <label className="text-red-800 flex items-center justify-center">
              Invalid credentials
            </label>
          ) : (
            ""
          )}
          <h5 className="text-center">
            <a
              className="text-white text-decoration: underline hover:text-purple-400 "
              href="/signup"
            >
              Don't have an account? Sign up!
            </a>
          </h5>
        </div>
      </div>
    </>
  );
};
