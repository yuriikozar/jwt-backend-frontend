import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Users from "./components/users/Users";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./components/create-user/CreateUser";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/users/create-user" element={<CreateUser />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path="*" element={<Navigate to="/users" />}/>
            </Routes>
        </Router>
    );
};

export default App;
