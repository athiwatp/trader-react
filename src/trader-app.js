import React, {Component} from "react";
import "./trader-app.css";

import TransactionForm from "./components/transaction-form";
import Portfolio from "./components/portfolio";

const STORAGE_KEY = 'traderState';
const GOOGLE_FINANCE = 'https://finance.google.com/finance/info?q=';

class TraderApp extends Component {

    constructor(props) {
        super(props);

        this.saveTransaction = this.saveTransaction.bind(this);
        this.syncFromStorage = this.syncFromStorage.bind(this);
        this.fetchMarketData = this.fetchMarketData.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
        this.deleteStock = this.deleteStock.bind(this);

        this.state = (this.syncFromStorage()) || {
                stocks: [],
                txn: {}
            };
    }

    componentWillMount() {
        this.fetchMarketData();
    }

    saveTransaction(txn) {
        let stocks = this.state.stocks;
        if (this.isValidTransaction(txn)) {
            txn.id = txn.id || this.guid();
            stocks.push(txn);
            this.setState({
                stocks: stocks,
                txn: {}
            });
            this.syncToStorage(this.state);
            this.fetchMarketData();
        }
    }

    deleteStock(id) {
        let stocks = this.state.stocks.filter((s) => s.id !== id);
        this.setState({
            stocks: stocks
        }, () => {
            this.syncToStorage(this.state);
        });

    }

    syncToStorage(state) {
        if(!!state) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
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

    fetchMarketData() {
        let stocks = this.state.stocks;
        if (stocks.length > 0) {
            let quoteURL = GOOGLE_FINANCE + stocks.map((s) => `NSE:${s.symbol.toUpperCase()}`).join(',');
            fetch(quoteURL).then((resp) => {
                return resp.text();
            }).then((text) => {
                this.updatePortfolio(JSON.parse(text.substr(4)));
            });
        }
    }

    updatePortfolio(marketData) {
        if (marketData) {
            let cp = marketData.reduce((memo, s) => {
                memo[s.t] = s.l;
                return memo;
            }, {});
            let stocks = this.state.stocks.map((s) => {
                s['currentPrice'] = cp[s.symbol];
                return s;
            });
            this.setState({
                stocks: stocks
            });
            this.syncToStorage(this.state);
        }
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
                <TransactionForm txn={this.state.txn} onSave={this.saveTransaction}/>
                <Portfolio
                    stocks={this.state.stocks}
                    onDeleteStock={this.deleteStock}
                />
            </div>
        )
    }
}

export default TraderApp;