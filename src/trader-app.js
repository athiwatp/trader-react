import React, {Component} from "react";
import "./trader-app.css";

import TransactionForm from "./components/transaction-form";
import Portfolio from "./components/portfolio";

const STORAGE_KEY = 'traderState';

class TraderApp extends Component {

    constructor(props) {
        super(props);

        this.state = (this.syncFromStorage()) || {
                stocks: []
            };

        this.saveTransaction = this.saveTransaction.bind(this);
        this.syncFromStorage = this.syncFromStorage.bind(this);
    }

    componentWillMount() {

    }

    saveTransaction(txn) {
        let stocks = this.state.stocks;
        if (this.isValidTransaction(txn)) {
            txn.id = txn.id || this.guid();
            stocks.push(txn);
            this.setState(stocks);
            this.syncToStorage(this.state);
        }
    }

    syncToStorage(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    syncFromStorage() {
        return JSON.parse(localStorage.getItem('traderState'));
    }

    isValidTransaction(txn) {
        return txn.symbol.length > 0
            && txn.price > 0
            && txn.qty > 0
            && txn.date.length > 0;
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