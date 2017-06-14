import React, {Component} from "react";
import Stock from "./stock";
import Utils from "../utils";
import classnames from "classnames";
import "./portfolio.css";

class EmptyPortfolio extends Component {
    render() {
        return (
            <div className="empty-portfolio">
                Add stocks to your portfolio
                <a href="#" onClick={this.props.onAddStock}>+</a>
            </div>
        )
    }
}

class StockPortfolio extends Component {

    render() {
        let wealth = this.props.stocks.reduce((memo, s) => {
            memo.invested += (s.qty * s.price);
            memo.current += (s.qty * s.currentPrice);
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
                    <p className="current">
                        {Utils.currency(wealth.current)}
                    </p>
                    <p className={wealthChangeClassNames}>
                        {wealthChange.toLocaleString()}
                    </p>
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