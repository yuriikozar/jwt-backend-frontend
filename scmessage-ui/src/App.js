import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from "./components/users/Users";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./components/create-user/CreateUser";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/users/create-user" element={<CreateUser />} />
            </Routes>
        </Router>
    );
};

export default App;
