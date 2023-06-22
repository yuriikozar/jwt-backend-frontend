import React, { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { Button, Grid, TextField, Typography, Container, Box, Link } from '@mui/material';
import { parseJwt } from '../../api/Helpers';
import { authApi } from '../../api/AuthenticationApi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const Auth = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);

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
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!(username && password)) {
            setIsError(true);
            return;
        }

        authApi
            .authenticate(username, password)
            .then((response) => {
                const { accessToken } = response.data;
                const data = parseJwt(accessToken);
                const user = { data, accessToken };

                if (Auth && Auth.userLogin) {
                    Auth.userLogin(user);
                }

                setUsername('');
                setPassword('');
                setIsLoggedIn(true);
                setIsError(false);
            })
            .catch((error) => {
                console.log(error);
                setIsError(true);
            });
    };

    if (isLoggedIn) {
        return <Navigate to={'/'} />;
    } else {
        return (
            <Container maxWidth="xs">
                <Box mt={5}>
                    <Typography variant="h4" component="h1" align="center">
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Username"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                    </form>
                    <Typography variant="body1" align="center" mt={2}>
                        Don't have an account?{' '}
                        <Link component={NavLink} to="/signup" color="primary">
                            Sign Up
                        </Link>
                    </Typography>
                    {isError && (
                        <Typography variant="body1" color="error" align="center" mt={2}>
                            The username or password provided is incorrect!
                        </Typography>
                    )}
                </Box>
            </Container>
        );
    }
};

export default Login;
