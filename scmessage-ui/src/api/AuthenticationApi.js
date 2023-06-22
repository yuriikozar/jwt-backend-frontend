import axios from 'axios';
import { parseJwt } from './Helpers';

export const authApi = {
    authenticate,
    signup,
};

function authenticate(username, password) {
    return instance.post('/auth/authenticate', { username, password }, {
        headers: { 'Content-type': 'application/json' }
    });
}

function signup(user) {
    return instance.post('/auth/signup', user, {
        headers: { 'Content-type': 'application/json' }
    });
}
//
// function getUsers(user, username) {
//     const url = username ? `/api/users/${username}` : '/api/users'
//     return instance.get(url, {
//         headers: {'Authorization': bearerAuth(user)}
//     })
// }
//
// function deleteUser(user, username) {
//     return instance.delete(`/api/users/${username}`, {
//         headers: {'Authorization': bearerAuth(user)}
//     })
// }
//
// function getOrders(user, text) {
//     const url = text ? `/api/orders?text=${text}` : '/api/orders'
//     return instance.get(url, {
//         headers: {'Authorization': bearerAuth(user)}
//     })
// }
//
// function deleteOrder(user, orderId) {
//     return instance.delete(`/api/orders/${orderId}`, {
//         headers: {'Authorization': bearerAuth(user)}
//     })
// }
//
// function createOrder(user, order) {
//     return instance.post('/api/orders', order, {
//         headers: {
//             'Content-type': 'application/json',
//             'Authorization': bearerAuth(user)
//         }
//     })
// }
//
// function getUserMe(user) {
//     return instance.get('/api/users/me', {
//         headers: {'Authorization': bearerAuth(user)}
//     })
// }

// -- Axios

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        config.headers['Authorization'] = bearerAuth(user);
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

// -- Helper functions

export function bearerAuth(user) {
    return `Bearer ${user.accessToken}`;
}