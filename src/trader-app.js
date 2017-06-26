import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";

import "./trader-app.css";

import AppBar from "./components/app-bar";
import Overlay from "./components/overlay";
import StockForm from "./components/stock-form";
import Portfolio from "./components/portfolio";
import {EMPTY_STOCK, STOCK_MODE} from "./data/constants";

const STORAGE_KEY = 'traderState';
const GOOGLE_FINANCE = 'https://finance.google.com/finance/info?q=';
const JUNK_PREFIX = '//';

class TraderApp extends Component {

    constructor(props) {
        super(props);
        this.state = Object.assign({
            stocks: [],
            stockToEdit: EMPTY_STOCK,
            stockMode: STOCK_MODE.DETAIL
        }, this.syncFromStorage(), {
            showForm: false
        });

    }

    componentWillMount() {
        this.fetchMarketData();
    }

    saveTransaction = (txn) => {
        let stocks = this.state.stocks;
        if (this.isValidTransaction(txn)) {
            this.closeStockForm();
            if (!txn.id) {
                txn.id = this.guid();
                stocks.push(txn);
            } else {
                stocks = stocks.map((stock) => {
                    if (stock.id === txn.id) {
                        return txn;
                    }
                    return stock;
                });
            }
            this.setState({
                stocks: stocks,
            }, () => {
                this.syncToStorage(this.state);
                this.fetchMarketData();
            });
        }
    }

    toggleStockForm = (e) => {
        e.preventDefault();
        this.setState({
            showForm: !this.state.showForm
        });
    }


    addStockForm = () => {
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

    closeStockForm = () => {
        this.setState({
            showForm: false
        });
    }

    deleteStock = (id) => {
        let stocks = this.state.stocks.filter((s) => s.id !== id);
        this.setState({
            stocks: stocks
        }, () => {
            this.syncToStorage(this.state);
        });

    }

    toggleStockMode = () => {
        let mode = this.state.stockMode;
        if (mode === STOCK_MODE.SUMMARY) {
            mode = STOCK_MODE.DETAIL;
        } else {
            mode = STOCK_MODE.SUMMARY;
        }
        this.setState({
            stockMode: mode
        }, () => {
            this.syncToStorage(this.state);
        });
    }

    syncToStorage = (state) => {
        state = state || this.state;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    syncFromStorage = () => {
        return JSON.parse(localStorage.getItem('traderState'));
    }

    isValidTransaction(txn) {
        return txn.symbol.length > 0
            && txn.price > 0
            && txn.quantity > 0
            && txn.date.length > 0;
    }

    isLocalhost() {
        return (window.location.hostname === 'localhost');
    }

    fetchMarketData = () => {
        let stocks = this.state.stocks;
        if (stocks.length > 0) {
            let quoteURL = GOOGLE_FINANCE + stocks.map((s) => `NSE:${s.symbol.toUpperCase()}`).join(',');

            fetch(quoteURL, {
                mode: this.isLocalhost() ? '' : 'no-cors'
            }).then((response) => response.text()).then((body) => {
                if (body) {
                    body = body.substr(body.indexOf(JUNK_PREFIX) + JUNK_PREFIX.length);
                    body = body.trim();
                    this.updatePortfolio(JSON.parse(body));
                }
            }).catch((err) => {
                alert('Unable to get market data! Try again later');
                console.error(err);
            });
        }
    }

    updatePortfolio = (marketData) => {
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
                            stockMode={this.state.stockMode}
                            onAddStock={this.addStockForm}
                            onEditStock={this.editStockForm}
                            onDeleteStock={this.deleteStock}
                            onToggleStockMode={this.toggleStockMode}
                        />}/>
                    </div>

                    <button className="add-stock" onClick={this.addStockForm}>+</button>

                    <Overlay
                        title={this.state.formMode === 'edit' ? 'Edit Stock' : 'Add Stock'}
                        open={this.state.showForm}
                        onClose={this.closeStockForm}
                    >
                        <StockForm
                            mode={this.state.formMode}
                            stock={this.state.stockToEdit}
                            onSave={this.saveTransaction}
                        />
                    </Overlay>
                </div>
            </Router>
        )
    }
}

export default TraderApp;