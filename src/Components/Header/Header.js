import React from 'react';
import {Link} from "react-router-dom";
import './Header.scss';

const Header = () => {
    return (
        <header>
            <div>
                <div>
                    <Link to="/">Home</Link>
                </div>
            </div>
            <div className="routes">
                <Link to="/tasks">Tasks</Link>
            </div>
        </header>
    )
}

export default Header;