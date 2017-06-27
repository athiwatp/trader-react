import React, {Component} from "react";

import WealthMeter from "./wealth-meter";
import Stock from "./stock";
import Utils from "../utils";
import classnames from "classnames";
import "./portfolio.css";

class EmptyPortfolio extends Component {
    render() {
        return (
            <div className="empty-portfolio">
                Add stocks to your portfolio
                <button onClick={this.props.onAddStock}> Add Stock</button>
            </div>
        )
    }
}

class StockPortfolio extends Component {

    render() {
        let wealth = this.props.stocks.reduce((memo, s) => {
            memo.invested += (s.quantity * s.price);
            memo.current += (s.quantity * s.currentPrice);
            return memo;
        }, {invested: 0, current: 0});

        let wealthChange = wealth.current - wealth.invested;
        let wealthChangeClassNames = classnames({
            'wealth-change': true,
            'volatile-value': true,
            up: wealthChange > 0,
            down: wealthChange < 0
        });

        return (
            <div className="stock-portfolio">
                <div className="wealth">
                    <WealthMeter wealth={wealth} stocks={this.props.stocks}/>
                    <div className="wealth-info">
                        <p className="current">
                            {Utils.currency(wealth.current)}
                        </p>
                        <p className={wealthChangeClassNames}>
                            {wealthChange.toLocaleString()}
                        </p>
                    </div>
                    <ul className="portfolio-actions">
                        <li>
                            <button onClick={this.props.onToggleStockMode}>toggle</button>
                        </li>
                        <li>
                            <button onClick={this.props.onAddStock}>Add</button>
                        </li>
                    </ul>
                </div>
                {
                    this.props.stocks.map((stock) => <Stock key={stock.id} stock={stock} {...this.props} />)
                }
            </div>
        )
    }
}

class Portfolio extends Component {

    render() {

        let elm = null;
        if (this.props.stocks.length > 0) {
            elm = <StockPortfolio {...this.props} />
        } else {
            elm = <EmptyPortfolio {...this.props}/>
        }


        return (
            <div className="portfolio">
                {elm}
            </div>
        )
    }

}

export default Portfolio;