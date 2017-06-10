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
            negative: stock.changePercent < 0,
            positive: stock.changePercent >= 0
        });
        return (
            <div className="stock">
                <div className="investment">
                    <h2 className="symbol">{stock.symbol}</h2>
                </div>
                <div className="market">
                    <p className="price">{CURRENCY + stock.currentPrice}</p>
                    <p className={changeClassNames}>{CURRENCY + stock.change} <em>(% {stock.changePercent})</em></p>
                </div>
                <div className="return">
                </div>
            </div>
        )
    }
}

export default Stock;