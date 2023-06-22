import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import * as UserApi from '../../api/UserApi';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
    table: {
        marginLeft: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    createButton: {
        marginBottom: theme.spacing(2),
    },
    editButton: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(2),
    },
}));

const Users = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const Auth = useAuth();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const user = Auth?.getUser(); // Get the current user from Auth context
            const response = await UserApi.getUsers(user); // Pass the user to the getUsers() function
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateUser = () => {
        navigate('/users/create-user');
    };

    const handleEditUser = (user) => {
        console.log(user);
    };

    return (
        <div className={'users-all'}>
            <h1>Users</h1>
            <Button
                variant="contained"
                color="primary"
                className={classes.createButton}
                onClick={handleCreateUser}
            >
                Create New User
            </Button>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.password}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.editButton}
                                    onClick={() => handleEditUser(user)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => UserApi.deleteUser(user.id).catch((orr) => console.log(orr))}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Users;
