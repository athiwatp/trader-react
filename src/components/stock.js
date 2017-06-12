import React, {Component} from "react";
import classnames from "classnames";
import "./stock.css";

let CURRENCY = '₹';
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

    currency(value) {
        return (CURRENCY + value.toLocaleString());
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

        let priceChangeClassNames = classnames({
            'volatile-value': true,
            'price-change': true,
            down: stock.changePercent < 0,
            up: stock.changePercent >= 0
        });

        let profitClassNames = classnames({
            'volatile-value': true,
            profit: true,
            down: profit < 0,
            up: profit > 0
        });
        return (
            <div className="stock">
                <div className="investment">
                    <p className="cost">
                        {this.currency(cost)}
                    </p>
                    <p className="age">
                        {daysOld} days
                    </p>
                </div>
                <div className="details">
                    <svg className="radial-progress" width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12"/>
                        <circle cx="60" cy="60" r="54" fill="none" stroke="#f77a52" strokeWidth="12"
                                strokeDasharray="339.292" strokeDashoffset="135.717"/>
                    </svg>
                    <div className="content">
                        <p className="symbol">
                            {stock.symbol}
                        </p>
                        <p className="market-price">
                            {this.currency(stock.currentPrice)}
                        </p>
                        <p className={priceChangeClassNames}>
                            {stock.change}
                        </p>
                    </div>
                </div>
                <div className="return">
                    <p className="worth">
                        {this.currency(value)}
                    </p>
                </div>
            </div>
        )
    }
}

export default Stock;