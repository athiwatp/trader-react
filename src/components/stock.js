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
        let inLoss = (profit < 0);
        let daysOld = this.daysOld(stock.date);
        let profitPercent = Math.ceil((100 * profit) / cost);

        let changeClassNames = classnames({
            change: true,
            down: stock.changePercent < 0,
            up: stock.changePercent >= 0
        });

        let profitClassNames = classnames({
            profit: true,
            down: profit < 0,
            up: profit > 0
        });
        return (
            <div className="stock">
                <div className="investment">
                    <h2 className="symbol">{stock.symbol} <em className="quantity">(<i>{stock.qty}</i> / {this.currency(cost)})</em></h2>
                    <p className={profitClassNames}>{this.currency(value)} (<em>%{profitPercent}</em>)</p>
                </div>
                <div className="market">
                    <p className="price">{this.currency(stock.currentPrice)}</p>
                    <p className={changeClassNames}>{this.currency(stock.change)}</p>
                </div>
                <div className="return">
                </div>
            </div>
        )
    }
}

export default Stock;