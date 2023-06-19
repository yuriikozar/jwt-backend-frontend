import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import * as UserApi from '../../api/UserApi';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    input: {
        width: '100%',
        padding: theme.spacing(1),
    },
    buttonGroup: {
        display: 'flex',
        gap: theme.spacing(2),
    },
}));

const CreateUser = () => {
    const classes = useStyles();

    const [userData, setUserData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };

    const handleCreateUser = async () => {
        try {
            // Perform the user creation logic here
            await UserApi.createUser(userData);
            setShowSuccessMessage(true);
            // Redirect back to the Users page or any other desired page
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handleSnackbarClose = () => {
        setShowSuccessMessage(false);
    };

    return (
        <div className={classes.container}>
            <h1>Create User</h1>
            <form className={classes.form}>
                <input
                    className={classes.input}
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                />
                <input
                    className={classes.input}
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                />
                <input
                    className={classes.input}
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                />
                <input
                    className={classes.input}
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                />
                <input
                    className={classes.input}
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
            </form>
            <div className={classes.buttonGroup}>
                <Button variant="contained" color="primary" onClick={handleCreateUser}>
                    Create User
                </Button>
                <Link to="/users">
                    <Button variant="contained">Go Back</Button>
                </Link>
            </div>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Success. The user has been created successfully."
            />
        </div>
    );
};

export default CreateUser;
