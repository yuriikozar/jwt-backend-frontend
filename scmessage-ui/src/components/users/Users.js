import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useAuth } from '../context/AuthContext';
import * as UserApi from '../../api/UserApi';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '40px auto',
        maxWidth: 'calc(100% - 4cm)', // Adjusted maxWidth
        padding: '0 2cm', // Adjusted padding
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '16px',
    },
    createButton: {
        marginBottom: '16px',
    },
    table: {
        marginBottom: '16px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '100%', // Make the table wider
    },
    editButton: {
        marginLeft: '16px',
        marginRight: '8px',
    },
    deleteButton: {
        marginRight: '8px',
    },
    wrapText: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
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
            const user = Auth?.getUser();
            const response = await UserApi.getUsers(user);
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
        <div className={classes.container}>
            <div className={classes.headerContainer}>
                <h1 className={classes.header}>Users</h1>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.createButton}
                    onClick={handleCreateUser}
                >
                    Create New User
                </Button>
            </div>
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
                                {/* Edit Button */}
                                {/* <Button
          variant="contained"
          color="primary"
          className={classes.editButton}
          onClick={() => handleEditUser(user)}
        >
          Edit
        </Button> */}

                                {/* Delete Button */}
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.deleteButton}
                                    onClick={() => UserApi.deleteUser(user.id).catch((error) => console.log(error))}
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
