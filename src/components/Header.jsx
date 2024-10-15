import { AppBar, Toolbar, Typography, Button, IconButton, Switch } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage';
import { auth, adminAccountId } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../redux/themeSlice';

export default function Header() {
  const [value, setValue] = useLocalStorage('user', null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!value);
  const navigate = useNavigate();
  const userUid = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [isDarkMode, setIsDarkMode] = useState(darkMode);


  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }

  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        window.location.reload();
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = () => {
    navigate('/signin');
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: darkMode ? '#333' : '#d9e9fa',
     }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          {/* <MenuIcon /> */}
        </IconButton>
        {/* Add Icon using a regular img tag */}
        <img
          src="https://icons.veryicon.com/png/o/object/warning-icon/global-health-risk.png"
          alt="WeCare Icon"
          style={{ height: '45px', marginRight: '6px' }}
        />     

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <span style={{ color: '#a138b6', fontWeight: 'bold' }}>We</span>
          <span style={{ color: '#d90228', fontWeight: 'bold' }}>Care</span>
          
        <Switch
          color="default"
          checked={darkMode}
          onChange={handleDarkModeToggle}
        />
        </Typography>


        {/*Potential changes for header nav bar*/}
        <Button onClick={() => navigate('/')} color="secondary" sx={{ position: 'relative', fontWeight: 'bold' }}>Home</Button>

        {isLoggedIn && userUid.uid === adminAccountId && (
          <Button onClick={() => navigate('/createdoctor')} color="secondary" sx={{ position: 'relative', fontWeight: 'bold', backgroundColor: '#53e3ed' }}>CREATE NEW DOCTOR</Button>
        )}
        {isLoggedIn ? (
          <>
            <Button onClick={() => navigate('/alldoctors')} color="secondary" sx={{ position: 'relative', fontWeight: 'bold' }}>Book An Appointment</Button>
            <Button onClick={() => navigate('/myappoitment')} color="secondary" sx={{ position: 'relative', fontWeight: 'bold' }}>My Appointment</Button>
            <Button color="secondary" onClick={handleLogout} sx={{ position: 'relative', fontWeight: 'bold' }}>Logout🚪🚶
            </Button>
          </>
        ) : (
          <Button color="secondary" onClick={handleLogin} sx={{ position: 'relative', fontWeight: 'bold' }} >🚪🚶Login</Button>
        )}

      </Toolbar>

      {/* Add separator on hover effect for the buttons */}
      <style>
        {`
          Button:hover::before {
            content: "";
            position: absolute;
            top: 50%;
            right: -5px;
            width: 1px;
            height: 80%;
            background-color: #1976d2;
            transform: translateY(-50%);
          }

          Button:hover::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(255, 255, 255, 0.4); /* Increased contrast with 40% opacity */
            pointer-events: none; /* Prevent the pseudo-element from capturing mouse events */
            z-index: -1; /* Place the highlight pseudo-element below the button text */
            border-radius: inherit; /* Inherit the button's border radius */
          }
        `}
      </style>
    </AppBar>

  )
}
