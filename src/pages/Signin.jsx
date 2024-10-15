import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, firestore, adminAccountId } from '../config/config';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate, Link } from 'react-router-dom';
import '../SignInPage.css'; // Import custom CSS file for styling
import { addDoc, collection } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { ShowLoader } from '../redux/loaderSlice';


export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [value, updateValue] = useLocalStorage('user', null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailPasswordLogin = async () => {
    try {
      dispatch(ShowLoader(true));
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.emailVerified) {
        await updateValue(userCredential.user);
        if (userCredential.user.uid === adminAccountId){
          navigate('/createdoctor');
          dispatch(ShowLoader(false));
          return;
        }
        navigate('/');
        dispatch(ShowLoader(false));
      } else {
        alert('Please verify your email before logging in.');
        auth.signOut();
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      console.log(error, 'Invalid email or password');
      alert('Invalid email or password!');
      dispatch(ShowLoader(false));
    }
  };


  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response.user, 'user info');
      await updateValue(response.user);

      const usersCollectionGoogle = collection(firestore, 'users');

      addDoc(usersCollectionGoogle, {
        userId: response.user.uid,
        email: response.user.email,
        name: response.user.displayName,
      })
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const response = await signInWithPopup(auth, facebookProvider);
      console.log(response.user, 'user info');
      await updateValue(response.user);

      const usersCollectionFacebook = collection(firestore, 'users');

      addDoc(usersCollectionFacebook, {
        userId: response.user.uid,
        email: response.user.email,
        name: response.user.displayName,
      })

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleEmailPasswordLogin();
    }
  };


  return (
    <>
      <div className="signin-page-container justify-center ">
        <div className="background-image"></div>
        <div className="signin-box">
          <Typography variant="h4" gutterBottom>
            Sign in to WeCare
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            🏥⛑️💪
          </Typography>

          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            fullWidth
            margin="normal"
          />

          <Button variant="contained88" onClick={handleEmailPasswordLogin} fullWidth>
            Next
          </Button>

          <Link to="/resetpassword" style={{
            textDecoration: 'underline', color: 'blue', fontFamily: 'Sans-serif', fontSize: '15px'
          }}>
            Forget password?
          </Link>

          <Button
            variant="contained"
            onClick={handleGoogleLogin}
            className="google-btn"
            fullWidth
            style={{ margin: '10px 0' }} // Add margin to create consistent spacing
          >
            <GoogleIcon />
            Sign in With Google
          </Button>

          <Button
            variant="contained"
            onClick={handleFacebookLogin}
            className="facebook-btn" //Here is the button for facebook login
            fullWidth
            style={{ margin: '10px 0' }} // Add margin to create consistent spacing
          >
            <FacebookIcon />
            Sign in With Facebook
          </Button>

          <Link to="/register">
            <Button variant="contained" fullWidth>
              No account? Sign up
            </Button>
          </Link>

          <Link to="/">
            <Button variant="contained" fullWidth>
              Home
            </Button>
          </Link>

        </div>
      </div>

    </>

  );
}