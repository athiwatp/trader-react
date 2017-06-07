import React, {Component} from "react";
import "./stock.css";

class Stock extends Component {

    daysOld(date) {
        let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let parts = date.split('/'); // DD/MM/YYY format.
        let firstDate = new Date(parts[2], parts[1], parts[0]);
        let secondDate = new Date();
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    }

    render() {
        let stock = this.props.stock;

        let cost = stock.qty * stock.price;
        let value = stock.qty * stock.currentPrice;
        let profit = value - cost;
        let inLoss = (profit < 0);
        let daysOld = this.daysOld(stock.date);
        let profitPercent = Math.ceil((100 * profit) / cost);
        return (
            <div className="stock">
                <div className="investment">
                    <span className="symbol">{stock.symbol}</span>
                    <i className="separator"/>
                    <span
                        className="cost">{`${stock.qty} * ₹${stock.price} = ₹${(stock.qty * stock.price).toLocaleString()}`}</span>
                    <i className="separator"/>
                    <span className="age">{daysOld} days</span>
                </div>
                <div className={`return ${inLoss ? 'loss' : 'gain'}`}>
                    <span className="current-price">₹{stock.currentPrice}</span>
                    <i className="separator"/>
                    <span className="profit">₹{profit.toLocaleString()}</span>
                    <i className="separator"/>
                    <span className="profit-percent">{profitPercent}%</span>
                </div>
            </div>
        )
    }
}

export default Stock;