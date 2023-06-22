import axios from 'axios';
import { bearerAuth } from "./AuthenticationApi";

const API_URL = process.env.REACT_APP_API_URL;

const instance = axios.create({
    baseURL: API_URL
});

instance.interceptors.request.use(
    function (config) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            config.headers.Authorization = bearerAuth(user);
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const getUsers = async () => {
    try {
        const response = await instance.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (user) => {
    try {
        const response = await instance.post('/users', user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const updateUser = async (userId, updatedUser) => {
    try {
        const response = await instance.put(`/users/${userId}`, updatedUser);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await instance.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
