import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import InputForm from '../components/Inputs/Input.js';
import '../components/ButtonStyle.css';
import './ButtonStyles.css';
import './LoginStyles.css';
import { Login, GetUserInfor } from "./Interface.js";

function LoadLogInPage() {
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInputs = () => {
    let isValid = true;
  
    if (!email.trim()) {
      setEmailError('Email cannot be empty.');
      isValid = false;
    } else {
      setEmailError('');
    }
  
    if (!password) {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    } else {
      setPasswordError('');
    }
  
    return isValid;
  };

  return (
    <div className="container-all">

      <div className="container-left">
        {/* img */}
      </div>

      <div className="container-right">
        <form className="content">
          <div className="title-header">
            <h1 className="loginTitle1">Connecting You to</h1>
            <h1 className="loginTitle2">What Matters Most</h1>
            
          </div>
          
          <LogInForm 
            email = {email}
            setUserEmail = {setUserEmail}
            password = {password}
            setUserPassword = {setUserPassword}
            setLoginStatus = {setLoginStatus}
            emailError={emailError}
            passwordError={passwordError}
            setEmailError={setEmailError}
            setPasswordError={setPasswordError}
            validateInputs = {validateInputs}
          />
          <Buttons 
            validateInputs={validateInputs}
            user_email = {email}
            user_password = {password}
            loginStatus = {loginStatus}
            setLoginStatus = {setLoginStatus}
            setEmailError={setEmailError}
            setPasswordError={setPasswordError}
          />
          

        </form>
      </div>
    </div>
);

}

function LogInForm({validateInputs, user_email, setUserEmail, user_password, setUserPassword, setLoginStatus, emailError, passwordError, setEmailError, setPasswordError}) {
  const navigate = useNavigate();


  const handleLoginClick = (user_email, user_password) => {
    if (validateInputs()) {
      Login(user_email, user_password).then(data => {
        if (data === true) {
          GetUserInfor();
          navigate('/dashboard');
        } else {
          setLoginStatus(false);
          //setErrorMessage('Please ensure Email or Password is correct and retry again!');
          setEmailError('Please ensure Email or Password is correct and retry again!');
          setPasswordError('ALL_RED');
        }
      })
    }
  };
  return (
    <div className="input">
      <InputForm 
      inputTitle="Email Address" 
      inputType="email" 
      value = {user_email}
      onChange={e => {setUserEmail(e.target.value); setEmailError(''); setPasswordError('')}}
      error={emailError}
      handleLoginClick={handleLoginClick}
      user_email
      />
      <InputForm inputTitle="Password" 
      inputType="password" 
      value = {user_password}
      onChange={e => {setUserPassword(e.target.value); setPasswordError(''); setEmailError('');}}
      error={passwordError}
      handleLoginClick = {handleLoginClick}
      />
    </div>
  );
}

function Buttons({validateInputs, user_email, user_password, loginStatus, setLoginStatus, setEmailError, setPasswordError}) {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    if (validateInputs()) {
      Login(user_email, user_password).then(data => {
        if (data === true) {
          GetUserInfor();
          navigate('/dashboard');
        } else {
          setLoginStatus(false);
          //setErrorMessage('Please ensure Email or Password is correct and retry again!');
          setEmailError('Please ensure Email or Password is correct and retry again!');
          setPasswordError('ALL_RED');
        }
      })
    }
  };

  const handleForgotClick = () => {
    navigate("/forgot");
  };

  return (
    <div className="btns">
      <button type="button" className="rounded-5 btn login" onClick={handleLoginClick} onSubmit={handleLoginClick}>Log in</button>
      <button type="button" className="rounded-5 btn forgot-pass" onClick={handleForgotClick} >Forgot password?</button>
      <div className="new-acc">
        <span>Don't have an account?</span>
        <button type="button" className="btn-outline-secondary sign-up water-button" onClick={handleSignUpClick}>Sign up</button>
      </div>
    </div>
  );
}



export default LoadLogInPage;
