import React, {Component} from "react";
import classnames from "classnames";
import "./stock.css";
import Utils from "../utils";

import RadialProgress from './radial-progress';

class Stock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deleted: false
        };
    }

    daysOld(date) {
        let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        let parts = date.split('/'); // DD/MM/YYY format.
        let firstDate = new Date(parts[2], parts[1], parts[0]);
        let secondDate = new Date();
        return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    }

    deleteStock = () => {
        this.setState({
            deleted: true
        }, () => {
            setTimeout(() => {
                this.props.onDeleteStock(this.props.stock.id);
            }, 600);
        });
    }

    editStock = () => {
        this.props.onEditStock(this.props.stock);
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


        let profitChangeClassNames = classnames({
            'volatile-value': true,
            'profit-change': true,
            down: profit < 0,
            up: profit > 0
        });

        let stockClassNames = classnames({
            stock: true,
            animated: true,
            zoomOut: this.state.deleted
        });

        return (
            <div className={stockClassNames} onClick={this.editStock}>
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
                    <p className={profitChangeClassNames}>
                        {profitPercent}%
                    </p>
                    <p className="current-value">
                        {Utils.currency(value)}
                    </p>
                    <p className={profitChangeClassNames}>
                        {Utils.currency(profit)}
                    </p>
                </div>
                <ul className="actions">
                    <li onClick={this.deleteStock}>✕</li>
                </ul>
            </div>
        )
    }
}

export default Stock;