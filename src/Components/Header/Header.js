import React from 'react';
import {Link} from "react-router-dom";
import './Header.scss';

import {Navbar} from "react-bootstrap";

const Header = () => {
    return (
        <header>
            <Navbar bg="light" variant="light" sticky="top">
                <Navbar.Brand>
                    <Link to="/">Home</Link>
                </Navbar.Brand>
            </Navbar>
            <div className="routes">
                <Link to="/tasks">Tasks</Link>
            </div>
        </header>
    )
}

export default Header;