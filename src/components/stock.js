import React, {Component} from "react";
import "./stock.css";

class Stock extends Component {


    render() {
        let stock = this.props.stock;

        let cost = stock.qty * stock.price;
        let value = stock.qty * stock.currentPrice;
        let profit = value - cost;
        let inLoss = (profit < 0);
        return (
            <div className="stock">
                <div className="investment">
                    <span className="symbol">{stock.symbol}</span>
                    <i className="separator"/>
                    <span className="cost">{`${stock.qty} * ₹${stock.price} = ₹${(stock.qty * stock.price).toLocaleString()}`}</span>
                    <i className="separator"/>
                    <span className="age">0 days</span>
                </div>
                <div className={`return ${inLoss ? 'loss' : 'gain'}`}>
                    <span className="current-price">₹{stock.currentPrice}</span>
                    <i className="separator"/>
                    <span className="profit">₹{profit.toLocaleString()}</span>
                    <i className="separator"/>
                    <span className="value">₹{value.toLocaleString()}</span>
                </div>
            </div>
        )
    }
}

export default Stock;