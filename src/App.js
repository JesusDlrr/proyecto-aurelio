import React, { useState } from 'react';
import './App.css';
import { LogInForm } from './features/login_form/LoginForm';
import { SignUpForm } from './features/signup_form/SignUpForm';

function App() {
  return (
    <>
      <p>Test account: a@gmail.com | a123456</p>
      <LogInForm/>
    </>
  );
}

export default App;
