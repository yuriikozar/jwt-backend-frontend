import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Your Logo
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/users" className="navbar-link">
                            Users
                        </Link>
                    </li>
                    {/* Add more menu items as needed */}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
