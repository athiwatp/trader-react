import React, {Component} from "react";
import "./trader-app.css";

import TransactionForm from "./components/transaction-form";
import Portfolio from "./components/portfolio";

class TraderApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stocks: []
        };

        this.saveTransaction = this.saveTransaction.bind(this);
    }

    saveTransaction(txn) {
        let stocks = this.state.stocks;
        stocks.push(txn);
        this.setState(stocks);
    }

    isValidTransaction(txn) {

    }

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    render() {
        return (
            <div className="app">
                <h1>Trader App</h1>
                <hr/>
                <TransactionForm txn={''} onSave={this.saveTransaction}/>
                <Portfolio stocks={this.state.stocks}/>
            </div>
        )
    }
}

export default TraderApp;