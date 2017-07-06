import React, {Component} from "react";
import AutoSuggest from "react-autosuggest";
import "./stock-form.css";
import "./auto-suggest.css";
import InlineSelect from "./inline-select";
import {ACTIONS, EMPTY_STOCK, EXCHANGES} from "../data/constants";
import NSE_SYMBOLS from "../data/nse-symbols";

class StockForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            closing: false,
            stock: Object.assign({}, EMPTY_STOCK, props.stock),
            nseSuggestions: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            stock: Object.assign({}, nextProps.stock)
        });
    }

    saveForm = (e) => {
        e.preventDefault();
        let txn = Object.assign({}, this.state.stock);
        this.clearForm();
        this.props.onSave(txn);
    }

    cancelForm = (e) => {
        e.preventDefault();
        this.props.onClose();
    }

    clearForm = () => {
        this.setState({
            stock: EMPTY_STOCK
        })
    }

    ddmmyy = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!

        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    }

    fillToday = () => {
        let stock = this.state.stock;
        stock.date = this.ddmmyy();
        this.setState({
            stock
        });
    }

    handleInputChange = (e) => {
        let stock = {};
        stock[e.target.id] = e.target.value;
        this.setState({
            stock: Object.assign({}, this.state.stock, stock)
        });
    }

    handleActionSelect = (selected) => {
        this.setState({
            stock: Object.assign({}, this.state.stock, {
                action: selected
            })
        })
    }

    handleExchangeSelect = (selected) => {
        this.setState({
            stock: Object.assign({}, this.state.stock, {
                exchange: selected
            })
        })
    }

    getNSESuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLen = inputValue.length;

        return inputLen === 0 ? [] : NSE_SYMBOLS.filter((sym) => {
            return (sym.symbol.toLowerCase().slice(0, inputLen) === inputValue
            || sym.security.toLowerCase().slice(0, inputLen) === inputValue)
        }).slice(0, 3);
    }

    getNSESuggestionValue = (suggestion) => suggestion.symbol

    renderSuggestion = (suggestion) => (
        <div className="symbol-suggestion"><strong>{suggestion.symbol}</strong><em>{suggestion.security}</em></div>
    )

    onSuggestionsFetchRequested = ({value}) => {
        this.setState({
            nseSuggestions: this.getNSESuggestions(value)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            nseSuggestions: []
        })
    }

    onSuggestionSelected = (e, {suggestionValue, method}) => {
        e.preventDefault();
        let stock = this.state.stock;
        stock.symbol = suggestionValue;
        this.setState({
            stock
        });
    }

    render() {
        let stock = this.state.stock;
        let symbolProps = {
            id: "symbol",
            type: "text",
            value: stock.symbol,
            onChange: this.handleInputChange,
            placeholder: "Symbol",
            className: "symbol",
            required: 'required'
        };
        return (
            <div className="stock-form">
                <form onSubmit={this.saveForm}>
                    <ul className="fields">
                        <li className="field">
                            <InlineSelect
                                label="Action"
                                options={[{
                                    text: ACTIONS.BUY,
                                    value: ACTIONS.BUY
                                }, {
                                    text: ACTIONS.SELL,
                                    value: ACTIONS.SELL
                                }]}
                                selected={stock.action}
                                onSelect={this.handleActionSelect.bind(this)}
                            />
                        </li>
                        <li className="field">
                            <InlineSelect
                                label="Exchange"
                                options={
                                    Object.keys(EXCHANGES).map((e) => ({
                                        text: EXCHANGES[e],
                                        value: EXCHANGES[e]
                                    }))
                                }
                                selected={stock.exchange}
                                onSelect={this.handleExchangeSelect}
                            />
                        </li>
                        <li className="field">
                            <div className="input-field">
                                <AutoSuggest
                                    class={'symbols-suggest'}
                                    suggestions={this.state.nseSuggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    onSuggestionSelected={this.onSuggestionSelected}
                                    getSuggestionValue={this.getNSESuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    inputProps={symbolProps}
                                />
                            </div>
                        </li>
                        <li className="field">
                            <div className="input-field">
                                <input
                                    id="price"
                                    type="tel"
                                    value={stock.price}
                                    onChange={this.handleInputChange}
                                    placeholder="Price"
                                    className="price"
                                    pattern="^\d{0,8}(\.\d{1,4})?$"
                                    required='required'
                                />
                            </div>
                        </li>
                        <li className="field">
                            <div className="input-field">
                                <input
                                    id="quantity"
                                    type="tel"
                                    value={stock.quantity}
                                    onChange={this.handleInputChange}
                                    placeholder="Quantity"
                                    className="quantity"
                                    pattern="^\d{0,8}$"
                                    required='required'
                                />
                            </div>
                        </li>
                        <li className="field">
                            <div className="input-field stock-date">
                                <input
                                    id="date"
                                    type="text"
                                    value={stock.date}
                                    onChange={this.handleInputChange}
                                    placeholder="DD/MM/YYYY"
                                    className="date"
                                    pattern="\d{1,2}/\d{1,2}/\d{4}"
                                    required='required'
                                />
                                <span className="icon-calendar-plus-o today" onClick={this.fillToday}/>
                            </div>
                        </li>
                    </ul>
                    <div className="cta-buttons">
                        <button className="secondary" onClick={this.cancelForm}>Cancel</button>
                        <button className="primary" type="submit">{this.props.mode === 'edit' ? 'Save' : 'Add'}</button>
                    </div>
                </form>
            </div>
        );
    }
}


export default StockForm;