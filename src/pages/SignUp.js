import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/Inputs/Input.js";
import "./LoginStyles.css";
import "./SignUpStyles.css";
import { SignUp } from "./Interface.js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function LoadSignPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  /* check authentication */
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [show, setShow] = useState(false);
  
  const navigate = useNavigate();
  const handleLogInClick = () => {
    navigate("/login");
  };
  const handleShow = () => setShow(true);
  const validateInputs = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError("First name cannot be empty.");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.trim()) {
      setLastNameError("Last name cannot be empty.");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email cannot be empty.");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("Password cannot be empty.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password is made up of more than six digits of numbers, letters, symbols');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password is made up of more than six digits of numbers, letters, symbols');
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const handleCreateAccountClick = () => {
    if (!isTermsChecked) {
      setShakeError(true);
      setTimeout(() => setShakeError(false), 900); // Remove the shake effect after the animation duration
      return;
    }
    if (validateInputs()) {
      // Proceed with account creation logic
      console.log("Account creation logic goes here.");
      SignUp(firstName, lastName, email, password).then(data => {
        if (data === 'SUCCESS') {
          console.log("SignUp success!");
          handleLogInClick();
        } else if (data === 'ALREADY EXIEST'){
          setErrorMessage("That email is taken. Try another.");
          handleShow();
          console.log("SignUp Fail!");
        } else {
          handleShow();
          setErrorMessage("That email format is invalid. Try another.");
        }
      })  
    }
  };

  return (
    <div className="container-all">
      <div className="container-left">{/* need: Add our logo here! */}</div>
      <div className="container-right">
        <form className="content">
          <div className="header">
            <h1 className="title loginTitle1">Connecting You to</h1>
            <h1 className="loginTitle2">What Matters Most</h1>
          </div>
          <SignUpForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            firstNameError={firstNameError}
            lastNameError={lastNameError}
            emailError={emailError}
            passwordError={passwordError}
            setFirstNameError={setFirstNameError}
            setLastNameError={setLastNameError}
            setEmailError={setEmailError}
            setPasswordError={setPasswordError}
          />
          <Authentication
            setIsTermsChecked={setIsTermsChecked}
            shakeError={shakeError}
          />
          <LogInButtons handleCreateAccountClick={handleCreateAccountClick} />
          <LogDialog 
          show = {show}
          setShow = {setShow}
          errorMessage= {errorMessage}/>
        </form>
      </div>
    </div>
  );
}

function SignUpForm({ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, firstNameError, lastNameError, emailError, passwordError, setFirstNameError, setLastNameError, setEmailError, setPasswordError}) {
  return (
    <div className="input">
      <InputForm
        inputTitle="First Name"
        value={firstName}
        onChange={(e) => {setFirstName(e.target.value); setFirstNameError('')}}
        error={firstNameError}  
      />
      <InputForm
        inputTitle="Last Name"
        value={lastName}
        onChange={(e) => {setLastName(e.target.value); setLastNameError('')}}
        error={lastNameError}
      />
      <InputForm
        inputTitle="Email"
        inputType="email"
        value={email}
        onChange={(e) => {setEmail(e.target.value); setEmailError('')}}
        error={emailError}
      />
      <InputForm
        inputTitle="Password"
        inputType="password"
        value={password}
        onChange={(e) => {setPassword(e.target.value); setPasswordError('')}}
        error={passwordError}
      />
      
    </div>
  );
}

function Authentication({ setIsTermsChecked, shakeError }) {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsTermsChecked(!isClicked);
  };

  return (
    <div className={`authentication-container ${shakeError ? "shake" : ""}`}>
      <div className="align-text-center">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isClicked}
          onChange={handleClick}
        />
        <span className="authentication-text">
          By creating an account, I agree to our Terms of Use and Privacy Policy
        </span>
      </div>
    </div>
  );
}

function LogInButtons({ handleCreateAccountClick }) {
  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/login");
  };

  return (
    <form className={`btns`}>
      <button
        type="button"
        className="btn btn-lighter-secondary rounded-5 login"
        onClick={handleCreateAccountClick}
      >
        Create an account
      </button>
      <div className="already-acc">
        <span>Already have an account?</span>
        <button
          type="button"
          className="btn-outline-secondary sign-up water-button"
          onClick={handleLogInClick}
        >
          Log in
        </button>
      </div>
    </form>
  );
}
function LogDialog({show, setShow, errorMessage}) {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {errorMessage} 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default LoadSignPage;
