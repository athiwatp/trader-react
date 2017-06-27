import React, {Component} from "react";
import classnames from "classnames";
import "./stock.css";
import "./stock-summary.css";
import "./stock-detail.css";
import Utils from "../utils";
import {STOCK_MODE} from "../data/constants";
import RadialProgress from "./radial-progress";

class StockSummary extends Component {
    render() {
        let data = this.props.data;
        let {stock} = data;
        return (
            <div className="stock-summary">
                <div className="symbol column">{stock.symbol}</div>
                <div className="price column">
                    <p className="current">{Utils.currency(stock.currentPrice)}</p>
                    <em className={data.priceChangeClassNames}>{stock.change}</em>
                </div>
                <div className="profit column">
                    <p className="current">{Utils.currency(data.value)}</p>
                    <em className={data.profitChangeClassNames}>{Utils.currency(data.profit)}</em>
                </div>
            </div>
        )
    }
}

class StockDetail extends Component {
    render() {
        let data = this.props.data;
        let stock = data.stock;

        return (
            <div className="stock-detail">
                <div className="investment column">
                    <ul className="line-items">
                        <li>
                            <p className="bought-price">
                                {Utils.currency(stock.price)}
                            </p>
                        </li>
                        <li>
                            <p className="cost">
                                {Utils.currency(data.cost)}
                            </p>
                        </li>
                        <li>
                            <p className="age">
                                {data.daysOld} days ago
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="details column">
                    <RadialProgress className="profit-meter" value={data.profitPercent}/>
                    <div className="content">
                        <p className="symbol">
                            {stock.symbol}
                        </p>
                        <p className="market-price">
                            {Utils.currency(stock.currentPrice)}
                        </p>
                        <p className={data.priceChangeClassNames}>
                            {stock.change}
                        </p>
                    </div>
                </div>
                <div className="return column">
                    <ul className="line-items">
                        <li>
                            <p className={data.profitChangeClassNames}>
                                {data.profitPercent}%
                            </p>
                        </li>
                        <li>
                            <p className="current-value">
                                {Utils.currency(data.value)}
                            </p>
                        </li>
                        <li>
                            <p className={data.profitChangeClassNames}>
                                {Utils.currency(data.profit)}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

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

        let cost = stock.quantity * stock.price;
        let value = stock.quantity * stock.currentPrice;
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

        let data = {
            stock,
            cost,
            value,
            profit,
            daysOld,
            profitPercent,
            profitChangeClassNames,
            priceChangeClassNames
        };

        let stockClassNames = classnames({
            stock: true,
            animated: true,
            zoomOut: this.state.deleted
        });


        return (
            <div className={stockClassNames} onClick={this.editStock}>
                {
                    this.props.stockMode === STOCK_MODE.DETAIL ? <StockDetail data={data}/> :
                        <StockSummary data={data}/>
                }
                <ul className="actions">
                    <li onClick={this.deleteStock}>✕</li>
                </ul>
            </div>
        )
    }
}

export default Stock;