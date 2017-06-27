import React, {Component} from "react";
import {Link} from "react-router-dom";
import {STOCK_MODE} from '../data/constants';

import "./app-bar.css";

class AppBar extends Component {
    render() {
        let toggleElm = null;
        if (this.props.stockMode === STOCK_MODE.DETAIL) {
            toggleElm = (<button onClick={this.props.onToggleStockMode}>
                <span className="icon-adjust"/><i>Short</i>
            </button>);
        } else {
            toggleElm = (<button onClick={this.props.onToggleStockMode}>
                <span className="icon-circle"/><i>Detail</i>
            </button>);
        }
        return (
            <header className="app-bar">
                <h1 className="app-title column">
                    <Link to="/">Trader</Link>
                </h1>
                <ul className="portfolio-actions column">
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