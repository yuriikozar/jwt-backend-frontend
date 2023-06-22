import React, { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../../api/AuthenticationApi';
import { parseJwt } from '../../api/Helpers';
import './Signup.css';

const Signup = () => {
    const Auth = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const checkAuthentication = () => {
            if (Auth && Auth.userIsAuthenticated) {
                const loggedIn = Auth.userIsAuthenticated();
                setIsLoggedIn(loggedIn);
            }
        };
        checkAuthentication();
    }, [Auth]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!(username && password && name && email)) {
            setIsError(true);
            setErrorMessage('Please, provide all fields!');
            return;
        }

        const user = { username, password, name, email };
        authApi
            .signup(user)
            .then((response) => {
                const { accessToken } = response.data;
                const data = parseJwt(accessToken);
                const user = { data, accessToken };

                if (Auth && Auth.userLogin) {
                    Auth.userLogin(user);
                }

                setUsername('');
                setPassword('');
                setName('');
                setEmail('');
                setIsLoggedIn(true);
                setIsError(false);
                setErrorMessage('');
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    let errorMessage = 'Invalid fields';
                    if (errorData.status === 409) {
                        errorMessage = errorData.message;
                    } else if (errorData.status === 400) {
                        errorMessage = errorData.errors[0].defaultMessage;
                    }
                    setIsError(true);
                    setErrorMessage(errorMessage);
                }
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    } else {
        return (
            <div className="signup-container">
                <Grid container justifyContent="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Typography variant="h5" component="h2" align="center">
                            Signup
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={username}
                                onChange={handleInputChange}
                                className="signup-input"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleInputChange}
                                className="signup-input"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                                className="signup-input"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={email}
                                onChange={handleInputChange}
                                className="signup-input"
                                required
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                className="signup-button"
                            >
                                Signup
                            </Button>
                        </form>
                        <Typography variant="body2" align="center">
                            Already have an account?{' '}
                            <NavLink to="/login" className="signup-link">
                                Login
                            </NavLink>
                        </Typography>
                        {isError && (
                            <Typography variant="body2" color="error" align="center">
                                {errorMessage}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </div>
        );
    }
};

export default Signup;
