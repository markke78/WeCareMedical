import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth, firestore } from '../config/config';
import { addDoc, collection } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../SignInPage.css'; // Import the same custom CSS file for styling

const validatePhoneNumber = (phoneNumber) => {
  // Change the regex pattern based on your desired phone number format
  const canadianPhoneRegex = /^(\+?1[-. ]?)?(\()?\d{3}(\))?[-. ]?\d{3}[-. ]?\d{4}$/;
  return canadianPhoneRegex.test(phoneNumber);
};

const displayAlertFailedEmail = () => {
  alert('Registration failed, make sure the email is valid and not used before');
};

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const navigate = useNavigate();

  const displayAlertSucceed = () => {
    alert('Account successfully registered!');
    navigate('/signin');
  }; 


  const handleRegister = () => {
    setErrorEmail(false);
    setErrorPassword(false);
    setErrorPhone(false);
    setIsRegisterClicked(true);

    if(email !== confirmEmail || email === '' || confirmEmail === ''){
      setErrorEmail(true);
      return;
    }

    if (password !== confirmPassword || password === '' || confirmPassword === '') {
      setErrorPassword(true);
      return;
    }
    if (!validatePhoneNumber(userPhone) || userPhone === '') {
      setErrorPhone(true);
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      email,
      password,
      userPhone
    ).then((userCredential) => {
      const user = userCredential.user;
      console.log(user, 'user info');

      sendEmailVerification(user).then(() => {
        // Verification email sent. You can add any further actions here.
        console.log('Email verification sent.');
      }).catch((error) => {
        console.log(error);
      });

      // Store user data in the Firestore Database
      const usersCollection = collection(firestore, 'users');

      addDoc(usersCollection, {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        userPhoneNumber: userPhone,

      });
      displayAlertSucceed();
    })
      .catch((error) => {
        console.log(error);
        displayAlertFailedEmail();

      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <div className="signin-page-container justify-center"> {/* Use the same class name */}
      <div className="signin-box"> {/* Use the same class name */}
        <Typography variant="h4" gutterBottom>
          Join WeCare today
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          ⬇️⬇️⬇️
        </Typography>
        <TextField
          label="Email"
          value={email}
          helperText="Please enter your email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          error={isRegisterClicked && errorEmail} // Set error when the "Register" button is clicked and the email is empty
          fullWidth
          margin="normal" // Add margin between the input fields
        />

        <TextField
          label="Confirm-Email"
          value={confirmEmail}
          helperText="Please confirm your email"
          onChange={(e) => setConfirmEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          error={isRegisterClicked && errorEmail} // Set error when the "Register" button is clicked and the email is empty
          fullWidth
          margin="normal" // Add margin between the input fields
        />

        <TextField
          label="Password"
          type="password"
          helperText="Please enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          error={isRegisterClicked && errorPassword}
          fullWidth
          margin="normal"
        />        
        <TextField
          label="Confirm-Password"
          type="password"
          helperText="Please confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfrimPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          error={isRegisterClicked && errorPassword}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          type="text"
          helperText="Please enter your phone number"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          onKeyDown={handleKeyDown}
          error={isRegisterClicked && errorPhone}
          fullWidth
          margin="normal"
        />
        <Button variant="contained88" onClick={handleRegister}>
          Register
        </Button>
        <Link to="/signin" className="arrowBack-link">
          <Button variant="contained">
            <ArrowBackIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
}

