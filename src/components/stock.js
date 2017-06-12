import React, {Component} from "react";
import classnames from "classnames";
import "./stock.css";
import Utils from "../utils";

import RadialProgress from './radial-progress';

class Stock extends Component {

    constructor(props) {
        super(props);

        this.deleteStock = this.deleteStock.bind(this);

    }

    daysOld(date) {
        let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let parts = date.split('/'); // DD/MM/YYY format.
        let firstDate = new Date(parts[2], parts[1], parts[0]);
        let secondDate = new Date();
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    }

    deleteStock() {
        this.props.onDeleteStock(this.props.stock.id);
    }

    render() {
        let stock = this.props.stock;

        let cost = stock.qty * stock.price;
        let value = stock.qty * stock.currentPrice;
        let profit = value - cost;
        let daysOld = this.daysOld(stock.date);
        let profitPercent = Math.ceil((100 * profit) / cost);
        let changeInPrice = stock.currentPrice - stock.price;

        let priceChangeClassNames = classnames({
            'volatile-value': true,
            'price-change': true,
            down: stock.changePercent < 0,
            up: stock.changePercent >= 0
        });

        let changeInPriceClassNames = classnames({
            'volatile-value': true,
            'change-in-price': true,
            down: changeInPrice < 0,
            up: changeInPrice > 0
        });

        let profitChangeClassNames = classnames({
            'volatile-value': true,
            'profit-change': true,
            down: profit < 0,
            up: profit > 0
        });

        return (
            <div className="stock">
                <div className="investment line-items">
                    <p className="bought-price">
                        {Utils.currency(stock.price)}
                    </p>
                    <p className="cost">
                        {Utils.currency(cost)}
                    </p>
                    <p className="age">
                        {daysOld} days ago
                    </p>
                </div>
                <div className="details">
                    <RadialProgress className="profit-meter" value={profitPercent}/>
                    <div className="content">
                        <p className="symbol">
                            {stock.symbol}
                        </p>
                        <p className="market-price">
                            {Utils.currency(stock.currentPrice)}
                        </p>
                        <p className={priceChangeClassNames}>
                            {stock.change}
                        </p>
                    </div>
                </div>
                <div className="return line-items">
                    <p className={changeInPriceClassNames}>
                        {(stock.currentPrice - stock.price).toFixed(2)}
                    </p>
                    <p className="current-value">
                        {Utils.currency(value)}
                    </p>
                    <p className={profitChangeClassNames}>
                        {Utils.currency(profit)}
                    </p>
                </div>
                <ul className="actions">
                    <li onClick={this.deleteStock}>X</li>
                </ul>
            </div>
        )
    }
}

export default Stock;