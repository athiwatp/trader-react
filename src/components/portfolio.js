import React, {Component} from "react";
import Stock from "./stock";
import Utils from '../utils';
import classnames from 'classnames';
import './portfolio.css';

class Portfolio extends Component {

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
            <div className="portfolio">
                <div className="wealth">
                    <em className="current">{Utils.currency(wealth.current)}</em>
                    <em className={wealthChangeClassNames}> {wealthChange.toLocaleString()}</em>
                </div>
                {
                    this.props.stocks.map((stock) => <Stock key={stock.id} stock={stock} {...this.props} />)
                }
            </div>
        )
    }

}

export default Portfolio;