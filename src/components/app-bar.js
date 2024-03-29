import React, {Component} from "react";
import Logo from './logo';
import {Link} from "react-router-dom";
import {STOCK_MODE} from '../data/constants';

import "./app-bar.css";

class AppBar extends Component {
    render() {
        let toggleElm = null;
        if (this.props.stockMode === STOCK_MODE.DETAIL) {
            toggleElm = (<button onClick={this.props.onToggleStockMode}>
                <span className="icon-compress"/><i>Short</i>
            </button>);
        } else {
            toggleElm = (<button onClick={this.props.onToggleStockMode}>
                <span className="icon-expand"/><i>Detail</i>
            </button>);
        }
        return (
            <header className="app-bar">
                <h1 className="app-title column">
                    <Logo onClick={this.props.onReload}/>
                </h1>
                <ul className="portfolio-actions column">
                    <li>
                        <button onClick={this.props.onReload}><span className="icon-refresh"/><i>refresh</i> </button>
                    </li>
                    <li>
                        {toggleElm}
                    </li>
                    <li>
                        <button onClick={this.props.onAddStock}><span className="icon-plus-circle"/><i>Add</i>
                        </button>
                    </li>
                </ul>
            </header>
        )
    }
}

export default AppBar;