import React from 'react';


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-center">
        <div className="container-fluid">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/user">User Info</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/logout">Logout</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/password_generator">Password Generator</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/stored_credentials">Stored Credentials</a>
                </li>

            </ul>
        </div>
        </nav>
    );
};

export default NavBar;

