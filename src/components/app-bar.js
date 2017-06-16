import React, {Component} from "react";
import {Link} from 'react-router-dom';

import './app-bar.css';

class AppBar extends Component {
    render() {
        return (
            <header className="app-bar">
                <h1 className="app-title">
                    <Link to="/">Trader</Link>
                </h1>
            </header>
        )
    }
}

export default AppBar;