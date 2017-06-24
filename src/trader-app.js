import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import request from "request";

import "./trader-app.css";

import AppBar from "./components/app-bar";
import Overlay from "./components/overlay";
import StockForm from "./components/stock-form";
import Portfolio from "./components/portfolio";

const STORAGE_KEY = 'traderState';
const GOOGLE_FINANCE = 'https://finance.google.com/finance/info?q=';
const JUNK_PREFIX = '//';

class TraderApp extends Component {

    constructor(props) {
        super(props);

        this.saveTransaction = this.saveTransaction.bind(this);
        this.syncFromStorage = this.syncFromStorage.bind(this);
        this.fetchMarketData = this.fetchMarketData.bind(this);
        this.updatePortfolio = this.updatePortfolio.bind(this);
        this.deleteStock = this.deleteStock.bind(this);
        this.showStockForm = this.showStockForm.bind(this);
        this.toggleStockForm = this.toggleStockForm.bind(this);
        this.closeStockForm = this.closeStockForm.bind(this);

        this.state = (this.syncFromStorage()) || {
                stocks: [],
                txn: {},
            };
        this.state.showForm = false;
    }

    componentWillMount() {
        this.fetchMarketData();
    }

    saveTransaction(txn) {
        let stocks = this.state.stocks;
        if (this.isValidTransaction(txn)) {
            this.closeStockForm();
            txn.id = txn.id || this.guid();
            stocks.push(txn);
            this.setState({
                stocks: stocks,
                txn: {}
            }, () => {
                this.syncToStorage(this.state);
                this.fetchMarketData();
            });
        }
    }

    toggleStockForm(e) {
        e.preventDefault();
        this.setState({
            showForm: !this.state.showForm
        });
    }

    showStockForm(e) {
        e.preventDefault();
        this.setState({
            showForm: true
        });
    }

    editStockForm = (stock) => {
        this.setState({
            showForm: true,
            formMode: 'edit',
            stockToEdit: stock
        })
    }

    closeStockForm() {
        this.setState({
            showForm: false
        });
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
        if (!!state) {
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

    isLocalhost() {
        return (window.location.hostname === 'localhost');
    }

    fetchMarketData() {
        let stocks = this.state.stocks;
        if (stocks.length > 0) {
            let quoteURL = GOOGLE_FINANCE + stocks.map((s) => `NSE:${s.symbol.toUpperCase()}`).join(',');
            let options = {
                url: quoteURL,
                headers: {
                    'Origin': 'https://finance.google.com'
                }
            };
            request(options, (error, response, body) => {
                if (error) {
                    console.error('Unable to fetch market data');
                    return;
                }
                if (body) {
                    body = body.substr(body.indexOf(JUNK_PREFIX) + JUNK_PREFIX.length);
                    body = body.trim();
                    this.updatePortfolio(JSON.parse(body));
                }
            });

        }
    }

    updatePortfolio(marketData) {
        if (marketData) {
            let symbols = marketData.reduce((memo, s) => {
                memo[s.t] = s;
                return memo;
            }, {});
            let stocks = this.state.stocks.map((s) => {
                let symbol = symbols[s.symbol];
                if (symbol) {
                    s['currentPrice'] = symbol.l;
                    s['change'] = symbol.c;
                    s['changePercent'] = symbol.cp;
                    return s;
                } else {
                    return {}
                }
            });
            this.setState({
                stocks: stocks
            });
            this.syncToStorage(this.state);
        }
    }

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // eslint-disable-next-line
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    render() {
        return (
            <Router>
                <div className="app">

                    <AppBar/>
                    <div className="content">
                        <Route exact path="/" render={() => <Portfolio
                            stocks={this.state.stocks}
                            onAddStock={this.showStockForm}
                            onEditStock={this.editStockForm}
                            onDeleteStock={this.deleteStock}
                        />}/>
                    </div>

                    <button className="add-stock" onClick={this.showStockForm}>
                        {this.state.showForm ? '-' : '+'}
                    </button>

                    <Overlay
                        title="Add Stock"
                        open={this.state.showForm}
                        onClose={this.closeStockForm}
                    >
                        <StockForm
                            mode={this.state.formMode}
                            stock={this.state.stockToEdit || {}}
                            onSave={this.saveTransaction}
                            onClose={this.closeStockForm}
                        />
                    </Overlay>
                </div>
            </Router>
        )
    }
}

export default TraderApp;