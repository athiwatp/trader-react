import React, {Component} from "react";
import './stock.css';

class Stock extends Component {


    render() {
        let stock = this.props.stock;

        return (
            <div className="stock">
                <p className="symbol cell">{stock.symbol}</p>
                <p className="current-price cell">{stock.currentPrice || stock.price}</p>
                <p className="price cell">{stock.price}</p>
                <p className="qty cell">{stock.qty}</p>
                <p className="date cell">{stock.date}</p>
            </div>
        )
    }
}

export default Stock;