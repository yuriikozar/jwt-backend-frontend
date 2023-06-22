import React, { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setUser(JSON.parse(storedUser));
    }, []);

    const getUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    };

    const userIsAuthenticated = () => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            return false;
        }
        const user = JSON.parse(storedUser);

        // if user token has expired, log out the user
        if (Date.now() > user.data.exp * 1000) {
            userLogout();
            return false;
        }
        return true;
    };

    const userLogin = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    const userLogout = () => {
        localStorage.removeItem('user');
        setUser(null); // Set user state to null
    };

    const authContextValue = {
        user,
        getUser,
        userIsAuthenticated,
        userLogin,
        userLogout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}
