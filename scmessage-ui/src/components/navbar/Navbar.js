import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { userIsAuthenticated, userLogout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        userLogout();
        navigate('/'); // Redirect to a different route after logging out
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Security & Safety
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/users" className="navbar-link">
                            Users
                        </Link>
                    </li>
                    {!userIsAuthenticated() && (
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-link">
                                Login
                            </Link>
                        </li>
                    )}
                    {userIsAuthenticated() && (
                        <li className="navbar-item">
                            <span className="logout-link" onClick={handleLogout}>
                                Logout
                            </span>
                        </li>
                    )}
                    {/* Add more menu items as needed */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
