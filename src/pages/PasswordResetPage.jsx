
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { auth } from '../config/config';
import { Link, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import '../SignInPage.css'; // Import custom CSS file for styling

export default function PasswordResetPage() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Password reset email sent. Please check your email to reset your password.');
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                alert('Failed to send password reset email. Please check your email and try again.');
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleResetPassword();
        }
    };

    return (
        <div className="signin-page-container justify-center">
            <div className="background-image"></div>
            <div className="signin-box">
                <Typography variant="h4" gutterBottom>
                    Reset Password
                </Typography>
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained88" onClick={handleResetPassword} fullWidth>
                    Reset Password
                </Button>
                <Link to="/signin">
                    <Button variant="contained" fullWidth>
                        <ArrowBackIcon />
                    </Button>
                </Link>

            </div>
        </div>
    );
}
